class UserView {
  constructor(user) {
    let {id, name, lastName, email, phone, userContactsMember = []} = user;
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.userContactsMember = userContactsMember;
  }
}

module.exports = UserView;
