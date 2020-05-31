const mongoose = require('mongoose');
const Joi = require('joi');
const {Schema} = mongoose;

const messageSchema = new Schema({
  user: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Message = mongoose.model('messages', messageSchema);
function messageValidation(message) {
  const schema = {
    user: Joi.string().required(),
    text: Joi.string().required(),
  };
  return Joi.validate(message, schema);
}
module.exports = {
  Message,
  messageValidation,
};
