class UserView {
  constructor(user) {
    let {id, email, phone, userContactsMember = []} = user;
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.userContactsMember = userContactsMember;
  }
}

module.exports = UserView;
