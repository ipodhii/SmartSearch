const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(constants.HTTP_STATUS.UNAUTHORIZED)
      .send('Access denied. No token.');
  }
  try {
    const decoded = jwt.verify(token, constants.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(constants.HTTP_STATUS.SOURCE_NOT_FOUND)
      .send('Invalid token.');
  }
}
module.exports = auth;
