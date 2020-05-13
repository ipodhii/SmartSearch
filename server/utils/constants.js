const config = require('config');
const xoauth2 = require('xoauth2');

module.exports = Object.freeze({
  SMTP: {
    service: config.get('smtp.service'),
    auth: {
      type: 'OAuth2',
      user: config.get('smtp.user'),
      clientId: config.get('smtp.clientId'),
      clientSecret: config.get('smtp.clientSecret'),
      refreshToken: config.get('smtp.refreshToken'),
    },
  },
  HTTP_STATUS: {
    OK: 200,
    ERROR: 500,
    SOURCE_NOT_FOUND: 400,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 404,
    FORBIDDEN: 403,
  },
  PHONE_SIZE: 10,
  EXPIRIATION_TIME: 60 * 60,
  SALT_ROUNDS: 10,
  TOKEN_SECRET: 'amitSecretKey',
});
