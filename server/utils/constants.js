module.exports = Object.freeze({
  SMTP: {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'amitdanonmail@gmail.com',
      clientId:
        '273343245441-um6vgnk5lu44ba68cf42pthq3nu5n349.apps.googleusercontent.com',
      clientSecret: 'v0KmgWqkBdxvILPq3m8qA0-b',
      refreshToken:
        '1//04PYk8Ja1MO5XCgYIARAAGAQSNwF-L9Ir2o5souzo-w-lCvxIEobzM879WEV5DpQZ0AGBdKum36u7Aj4pAL51LPV_F9nNBiusTic',
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
  DB_CONNECT:
    'mongodb+srv://ipodhii:Israel1234!!@cluster0-sdcnk.mongodb.net/test?retryWrites=true&w=majority',
  PORT: '5000',
});
