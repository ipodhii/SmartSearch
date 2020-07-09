const bcrypt = require('bcrypt');
const {User, userValidation} = require('../model/User');
const {Advice} = require('../model/Advice');
const {Device} = require('../model/Device');

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const _ = require('lodash');
const UserView = require('../views/UserView');
const AdviceView = require('../views/AdviceView');
const UserQuery = require('../utils/UserQuery');
const DeviceCtrl = require('../controllers/deviceCtrl');
const deviceCtrl = new DeviceCtrl();

function buildUserQuery({type, city, country, rating}) {
  let userQuery = new UserQuery();
  let querys = userQuery
    .setType(type)
    .setCity(city)
    .setCountry(country)
    .setRating(rating)
    .build();
  let keys = Object.keys(querys);
  return keys ? [querys] : [];
}
class UserCtrl {
  async addUser(req, res) {
    logger.log('info', '/api/register');
    const {error} = userValidation(
      _.pick(req.body, [
        'phone',
        'email',
        'password',
        'confirmPassword',
        'userContactsMember',
      ]),
    );
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
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      userContactsMember: req.body.userContactsMember,
    });
    try {
      user = await user.save();
      deviceCtrl.createDevice(user.phone, req.body.fcmToken);
      logger.log('info', user);
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
  async updateUser(req, res) {
    logger.log('info', '/api/user:email');
    let user = await User.findOne({_id: req.body.id});
    try {
      user.userContactsMember = req.body.userContactsMember;
      user = await user.save();
      user = new UserView(user);
      res.send(user);
    } catch (err) {
      logger.log('error', err);
      return res.status(constants.HTTP_STATUS.ERROR).send(err);
    }
  }
  async login(req, res) {
    logger.log('info', '/api/login');
    let {email, password, fcmToken} = req.body;
    let user = await User.findOne({email: email});
    if (!user) {
      return res
        .status(constants.HTTP_STATUS.ERROR)
        .send('Email doesnt exist.');
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(constants.HTTP_STATUS.ERROR).send('Invalid password.');
    }
    const token = jwt.sign({_id: user._id}, constants.TOKEN_SECRET, {
      expiresIn: constants.EXPIRIATION_TIME,
    });
    try {
      deviceCtrl.updateDevice(user.phone, fcmToken);
      user = new UserView(user);
      return res
        .header('Authorization', token)
        .status(constants.HTTP_STATUS.OK)
        .send(user);
    } catch (err) {
      logger.log('error', err);
      return res.status(constants.HTTP_STATUS.ERROR).send(err);
    }
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
  async getSpecificUsers(usersPhones) {
    try {
      let users = await User.find({phone: {$in: usersPhones}});
      let usersView = [];
      for (let user of users) {
        usersView.push(new UserView(user));
      }
      console.log('printUserrrrsss12', usersView);
      return usersView;
    } catch (err) {
      console.log('printErrorgetSpecificUsers', err);
      throw new Error();
    }
  }
  async setPasswordMail(req, res) {
    let transport = nodemailer.createTransport(constants.SMTP);
    let email = req.body.email;
    //find user by mail
    let user = await User.findOne({email});
    console.log('printUser', user);
    if (!user) {
      return res
        .status(constants.HTTP_STATUS.ERROR)
        .send('Email doesnt exist.');
    }
    //generate new password, hash it and update user object
    let newPassword = constants.TMP_PASSWORD;
    const salt = await bcrypt.genSalt(constants.SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    const hashConfirmPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    user.confirmPassword = hashConfirmPassword;
    console.log('printnewuser', user);
    //save changes and send mail to user

    try {
      user = await user.save();
      let message = {
        from: constants.FROM_MAIL, // Sender address
        to: email, // List of recipients
        subject: constants.SUBJECT_MAIL, // Subject line
        text: `Hi ${email}, your password was reset, the new password is: ${newPassword}. Please, change it for you convenience.`,
      };
      transport.sendMail(message, function(err, info) {
        if (err) {
          console.log('errmail', err);
          res.status(constants.HTTP_STATUS.ERROR).send();
        } else {
          console.log('finished successfuly');
          res.status(constants.HTTP_STATUS.OK).send();
        }
      });
    } catch (err) {
      console.log('error total', user);
      return res.status(constants.HTTP_STATUS.ERROR).send(err);
    }
  }

  async getAdvicesFromContacts(req, res) {
    logger.log('info', '/api/useradvices');
    let allPromises = [];
    let user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.send(constants.HTTP_STATUS.BAD_REQUEST);
    }
    let userContactsMember = JSON.parse(user.userContactsMember);
    let querys = buildUserQuery(req.body);
    console.log('hehhehehee2', querys);
    userContactsMember = userContactsMember.sort(
      (memberA, memberB) => memberB.priority - memberA.priority,
    );
    userContactsMember.map(member => {
      console.log('peintmmm', member);
      return allPromises.push(
        new Promise(function(resolve, reject) {
          resolve(
            Advice.find()
              .populate('user')
              .or(querys)
              .and([{phone: member.phone}]),
          );
        }),
      );
    });

    try {
      return await Promise.all(allPromises).then(advices => {
        let advicesView = [];
        var dicionaryAdvices = new Dictionary();
        let placeId;
        for (let advicesPerPerson of advices) {
          for (let advice of advicesPerPerson) {
            if (advice != {}) {
              placeId = advice.placeId;
              dicionaryAdvices.set(placeId, new AdviceView(advice));
            }
          }
        }

        console.log('advicesssssssss1', JSON.stringify(dicionaryAdvices));

        return res
          .status(constants.HTTP_STATUS.OK)
          .send(dicionaryAdvices.items);
      });
    } catch (e) {
      console.log('printerrrr', e);
      return res.send(constants.HTTP_STATUS.BAD_REQUEST);
    }
  }
}
function addAdviceToRes(advice, placeId, advicesView) {
  if (!placeId) {
    advicesView.push(new AdviceView(advice));
  } else {
    if (!Array.isArray(advicesView[placeId])) {
      advicesView[placeId] = [];
    }
    advicesView[placeId].push(new AdviceView(advice));
  }
}

class Dictionary {
  constructor() {
    this.items = {};
  }
  has(key) {
    return key in this.items;
  }
  set(key, value) {
    if (!Array.isArray(this.items[key])) {
      this.items[key] = [];
    }
    this.items[key].push(value);
  }
  delete(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  }
}
module.exports = UserCtrl;
