const {Setting, settingValidation} = require('../model/Setting');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const SettingView = require('../views/SettingView');
const _ = require('lodash');

class SettingCtrl {
  async updateSetting(req, res) {
    logger.log('info', 'put /api/setting');
    let {notification, notifiyMembers} = req.body;
    const {error} = settingValidation(req.body);
    if (error) {
      logger.log('error', error.details[0].message);
      return res
        .status(constants.HTTP_STATUS.SOURCE_NOT_FOUND)
        .send(error.details[0].message);
    }
    let setting = await Setting.findOne({user: req.body.user});
    if (!setting) {
      return res.sendStatus(constants.HTTP_STATUS.BAD_REQUEST);
    }
    console.log('printSettingBeforeUpdate', setting);
    setting = await Setting.update(
      {_id: setting.id},
      {
        $set: {
          notification,
          notifiyMembers,
        },
      },
    );
    console.log('printSettingAfterUpdate', setting);
    setting = new SettingView(setting);
    return res.sendStatus(constants.HTTP_STATUS.OK);
  }
  async createSetting(req, res) {
    logger.log('info', 'post /api/setting');
    const {error} = settingValidation(req.body);
    if (error) {
      logger.log('error', error.details[0].message);
      return res.sendStatus(constants.HTTP_STATUS.SOURCE_NOT_FOUND);
    }
    let setting = new Setting(
      _.pick(req.body, ['user', 'notification', 'notifiyMembers']),
    );
    try {
      setting = await setting.save();
      setting = new SettingView(setting);
      return res.status(constants.HTTP_STATUS.OK).send(setting);
    } catch (err) {
      return res.status(constants.HTTP_STATUS.ERROR).send(err);
    }
  }
  async getSetting(req, res) {
    logger.log('info', 'get /api/setting');
    console.log('printSetting', req.query.user);
    try {
      let setting = await Setting.findOne({user: req.query.user});
      if (!setting) {
        return res
          .status(constants.HTTP_STATUS.ERROR)
          .send('Setting doesnt exist.');
      }
      setting = new SettingView(setting);
      return res.status(constants.HTTP_STATUS.OK).send(setting);
    } catch (err) {
      return res.status(constants.HTTP_STATUS.ERROR);
    }
  }
  async getAllSettings(user) {
    try {
      let settings = await Setting.find({user: {$ne: user}}),
        settingsView = [];
      if (!settings) {
        throw new Error();
      }
      for (let setting of settings) {
        settingsView.push(new SettingView(setting));
      }
      return settingsView;
    } catch (err) {
      throw new Error();
    }
  }
}

module.exports = SettingCtrl;
