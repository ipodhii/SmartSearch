const {Setting, settingValidation} = require('../model/Setting');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const SettingView = require('../views/SettingView');
const _ = require('lodash');

class SettingCtrl {
  async updateSetting(req, res) {
    logger.log('info', 'post /api/setting');
    const error = settingValidation(req.body);
    if (error) {
      logger.log('error', error.details[0].message);
      return res.sendStatus(constants.HTTP_STATUS.SOURCE_NOT_FOUND);
    }
    let setting = await Setting.findOne({user: req.body.user});
    Setting.update(
      {_id: setting.id},
      {
        $set: {
          notification: setting.notification,
        },
      },
    );
    setting = new SettingView(setting);
    return res.send(constants.HTTP_STATUS.OK).send();
  }
  async getSetting(req,res){
    logger.log('info', 'get /api/setting');
    let settings=await Setting.findOne({user: req.body.user});
    if(!settings){
      
    }
  }
}

module.exports = SettingCtrl;
