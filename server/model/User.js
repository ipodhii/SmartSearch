const mongoose = require('mongoose');
const constants = require('../utils/constants');
const Joi = require('joi');
const {Schema} = mongoose;

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
    min: 10,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  userContactsMember: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAutToken = function() {
  return jwt.sign({_id: this._id}, constants.TOKEN_SECRET, {
    expiresIn: constants.EXPIRIATION_TIME,
  });
};
const User = mongoose.model('users', userSchema);

function userValidation(user) {
  console.log('dvfsfdsgfdfsgdf');
  const schema = {
    email: Joi.string(),
    phone: Joi.string().min(10),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirmPassword: Joi.string().required(),
    userContactsMember: Joi.string().required(),
  };
  return Joi.validate(user, schema);
}
module.exports = {
  User,
  userValidation,
};
