const mongoose = require('mongoose');
const Joi = require('joi');
const {Schema} = mongoose;

const settingSchema = new Schema({
  notification: {
    required: true,
    type: String,
  },
  user: {
    required: true,
    type: String,
  },
  notifiyMembers: {
    type: String,
  },
});
const Setting = mongoose.model('settings', settingSchema);
function settingValidation(settings) {
  console.log('printSettings', settings);
  const schema = {
    notification: Joi.string().required(),
    user: Joi.string().required(),
    notifiyMembers: Joi.string(),
  };
  return Joi.validate(settings, schema);
}
module.exports = {
  Setting,
  settingValidation,
};
