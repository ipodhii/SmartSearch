const bcrypt = require('bcrypt');
const {User, userValidation} = require('../model/User');
const {Advice} = require('../model/Advice');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const _ = require('lodash');
const UserView = require('../views/UserView');
const AdviceView = require('../views/AdviceView');

class UserCtrl {
  async addUser(req, res) {
    logger.log('info', '/api/register');
    const {error} = userValidation(req.body);
    console.log('dfhsdjkghdskd', error, req.body);
    if (error) {
      logger.log('error', error.details[0].message);
      return res
        .status(constants.HTTP_STATUS.SOURCE_NOT_FOUND)
        .send(error.details[0].message);
    }
    let isDuplicate = await User.find({email: req.body.email});
    if (isDuplicate.length > 0) {
      return res
        .status(constants.HTTP_STATUS.SOURCE_NOT_FOUND)
        .send('Duplicate user.');
    }

    const salt = await bcrypt.genSalt(constants.SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const hashConfirmPassword = await bcrypt.hash(
      req.body.confirmPassword,
      salt,
    );

    let user = new User({
      phone: req.body.phone,
      email: req.body.email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      userContactsMember: req.body.userContactsMember,
    });
    try {
      user = await user.save();
      res.status(constants.HTTP_STATUS.OK).send(user);
    } catch (err) {
      logger.log('error', err);
      return res.status(constants.HTTP_STATUS.ERROR).send(err);
    }
  }
  async getUser(req, res) {
    logger.log('info', '/api/user:email');
    if (!req.query || !req.query.email) {
      return res.sendStatus(constants.HTTP_STATUS.BAD_REQUEST);
    }
    let user = await User.findOne({email: req.query.email});
    console.log('printHeader', user, req.query, req.query.email);
    user = new UserView(user);
    res.send(user);
  }
  async login(req, res) {
    logger.log('info', '/api/login');
    let user = await User.findOne({email: req.body.email});
    if (!user) {
      return res
        .status(constants.HTTP_STATUS.ERROR)
        .send('Email doesnt exist.');
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(constants.HTTP_STATUS.ERROR).send('Invalid password.');
    }
    const token = jwt.sign({_id: user._id}, constants.TOKEN_SECRET, {
      expiresIn: constants.EXPIRIATION_TIME,
    });
    user = new UserView(user);
    console.log('printUser', user);
    console.log('herererer', token);
    return res
      .header('Authorization', token)
      .status(constants.HTTP_STATUS.OK)
      .send(user);
  }
  async sendMail(req, res) {
    let transport = nodemailer.createTransport(constants.SMTP);

    let {email} = req.query;
    var message = {
      from: 'ipodhii@gmail.com', // Sender address
      to: email, // List of recipients
      subject: 'Test sending amit', // Subject line
      text: 'Have the most fun you can in a car. Get your Tesla today!', // Plain text body
    };
    transport.sendMail(message, function(err, info) {
      if (err) {
        res.status(constants.HTTP_STATUS.ERROR).send();
      } else {
        console.log('finished successfuly');
        res.status(constants.HTTP_STATUS.OK).send();
      }
    });
  }
  async getAdvicesFromContacts(req, res) {
    logger.log('info', '/api/advice');
    let {type, city, country, rating} = req.body;
    let allPromises = [];
    let user = await User.findOne({email: req.body.email});
    let userContactsMember = JSON.parse(user.userContactsMember);

    userContactsMember.map(member => {
      console.log('peintmmm', member);
      return allPromises.push(
        new Promise(function(resolve, reject) {
          resolve(
            Advice.find({phone: member.phone}).or([
              {type},
              {city},
              {country},
              {rating},
            ]),
          );
        }),
      );
    });

    try {
      return await Promise.all(allPromises).then(advices => {
        console.log('printcheck', advices);
        let advicesView = [];
        for (let advice of advices) {
          if(advice!={}){
            advicesView.push(new AdviceView(advice));
          }
        }
        return res.status(constants.HTTP_STATUS.OK).send(advicesView);
      });
    } catch (e) {
      return res.send(constants.HTTP_STATUS.BAD_REQUEST);
    }
  }
}
module.exports = UserCtrl;
