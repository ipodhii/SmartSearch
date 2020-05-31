class SettingView {
  constructor(setting) {
    let {notification, user, notifiyMembers} = setting;
    this.notification = notification;
    this.user = user;
    this.notifiyMembers = notifiyMembers;
  }
}
module.exports = SettingView;
