const {Advice, adviceValidation} = require('../model/Advice');
const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const _ = require('lodash');


class AdviceCtrl {
  async addAdvice(req, res) {
    logger.log('info', '/api/advice');
    const {error} = adviceValidation(req.body);
    if (error) {
      logger.log('error', error.details[0].message);
      return res
        .status(constants.HTTP_STATUS.SOURCE_NOT_FOUND)
        .send(error.details[0].message);
    }
    let advice = new Advice(
      _.pick(req.body, [
        'user',
        'phone',
        'city',
        'country',
        'email',
        'placeName',
        'description',
        'rating',
        'type',
      ]),
    );

    try {
      advice = await advice.save();
      return res.status(constants.HTTP_STATUS.OK).send(advice);
    } catch (err) {
      logger.log('error', err);
      return res.status(constants.HTTP_STATUS.ERROR).send(err);
    }
  }

  
}

module.exports = AdviceCtrl;
