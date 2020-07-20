const mongoose = require('mongoose');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const Joi = require('joi');
const {Schema} = mongoose;

const Advice = mongoose.model(
  'advices',
  new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    type: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(phone) {
          phone = phone.replace('-', '');
          logger.log('info', phone);
          return phone.length === constants.PHONE_SIZE;
        },
        message: 'Invalid phone size.',
      },
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    placeName: {
      type: String,
      required: true,
      min: 10,
    },
    placeId: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    rating: {
      type: String,
      required: true,
      max: 1,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }),
);
function adviceValidation(customer) {
  const schema = {
    user: Joi.required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    placeId: Joi.string().required(),
    placeName: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    type: Joi.required(),
  };
  return Joi.validate(customer, schema);
}
module.exports = {
  Advice,
  adviceValidation,
};
