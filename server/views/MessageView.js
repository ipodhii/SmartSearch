const UserMessageView = require('./UserMessageView');


class MessageView {
  constructor(messageObj) {
    let {user, text, createdAt, id} = messageObj;
    this._id = id;
    this.user = new UserMessageView(user);
    this.text = text;
    this.createdAt = createdAt;
  }
}
module.exports = MessageView;
