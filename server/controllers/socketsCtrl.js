const constants = require('../utils/constants');
const logger = require('../config/logger');
const _ = require('lodash');
const {Message, messageValidation} = require('../model/Message');
const MessageView = require('../views/MessageView');

class SocketsCtrl {
  async getAllMessages(req, res) {
    try {
      const messages = await Message.find();
      let messagesViews = [];
      for (let message of messages) {
        messagesViews.push(new MessageView(message));
      }
      return res.status(constants.HTTP_STATUS.OK).send(messagesViews);
    } catch (err) {
      return res.status(constants.HTTP_STATUS.BAD_REQUEST).send(err);
    }
  }
  async removeAll(req, res) {
    await Message.remove({});
  }
  async getAllMessagesSocket() {
    try {
      const messages = await Message.find({});
      let messagesViews = [];
      for (let message of messages) {
        messagesViews.push(new MessageView(message));
      }
      return messagesViews;
    } catch (err) {
      return;
    }
  }
  async saveMessageFromSocket(messageSocket, io) {
    const {error} = messageValidation(messageSocket);
    if (error) {
      io.emit('failed', {});
    }
    let message = new Message(messageSocket);
    try {
      message = await message.save();
      let messageView = new MessageView(message);
      io.emit('message', {messageView});
    } catch (err) {
      io.emit('failed', {});
    }
  }
  async sendMessage(req, res) {
    const {error} = messageValidation(req.body);
    if (error) {
      //  logger.log('error', error.details[0].message);
      return res
        .status(constants.HTTP_STATUS.SOURCE_NOT_FOUND)
        .send(error.details[0].message);
    }

    let message = new Message(_.pick(req.body, ['user', 'text']));
    try {
      //   let io = req.app.get('socketio');
      message = await message.save();
      let messageView = new MessageView(message);

      //   io.emit('message', 'test');

      return res.status(constants.HTTP_STATUS.OK).send(messageView);
    } catch (err) {
      //    console.log('errr', err);
      res.status(constants.HTTP_STATUS.BAD_REQUEST).send(err);
    }
  }
}

module.exports = SocketsCtrl;
