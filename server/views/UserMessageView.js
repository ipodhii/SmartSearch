const {uuid} = require('uuidv4');

class UserMessageView {
  constructor(user) {
    this._id = uuid();
    this.name = user;
  }
}
module.exports = UserMessageView;
