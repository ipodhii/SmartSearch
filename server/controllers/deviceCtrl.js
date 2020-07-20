const {Setting, settingValidation} = require('../model/Setting');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const {Device} = require('../model/Device');

const _ = require('lodash');

class DeviceCtrl {
  async createDevice(user, fcmToken) {
    try {
      let device = new Device({user, fcmToken});
      await device.save();
    } catch (err) {
      console.log('failedToCreateDevice', err);
      throw new Error('failedToCreateDevice');
    }
  }
  async updateDevice(user, fcmToken) {
    try {
      let device = await Device.findOne({user});
      device.fcmToken = fcmToken;
      await device.save();
    } catch (err) {
      console.log('failedToUpdateDevice', err);
      throw new Error('failedToUpdateDevice');
    }
  }
}

module.exports = DeviceCtrl;
