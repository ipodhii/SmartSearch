const mongoose = require('mongoose');
const Joi = require('joi');
const {Schema} = mongoose;

const deviceSchema = new Schema({
  fcmToken: {
    required: true,
    type: String,
  },
  user: {
    required: true,
    type: String,
  },
});
const Device = mongoose.model('devices', deviceSchema);
function deviceValidation(device) {
  const schema = {
    fcmToken: Joi.string().required(),
    user: Joi.string().required(),
  };
  return Joi.validate(device, schema);
}
module.exports = {
  Device,
  deviceValidation,
};
