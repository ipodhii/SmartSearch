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
});
const Setting = mongoose.model('Setting', settingSchema);
function settingValidation(settings) {
  const schema = {
    notification: Joi.string().required(),
    user: Joi.string().required(),
  };
  return Joi.validate(settings, schema);
}
module.exports = {
  Setting,
  settingValidation,
};
