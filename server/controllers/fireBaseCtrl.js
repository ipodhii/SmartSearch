var admin = require('firebase-admin');
const {Device} = require('../model/Device');
const UserCtrl = require('./userCtrl');

const SettingCtrl = require('./settingCtrl');

const userCtrl = new UserCtrl();
const settingCtrl = new SettingCtrl();

var serviceAccount = require('../metal-repeater-264117-firebase-adminsdk-qg9vw-663d271cb0.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://metal-repeater-264117.firebaseio.com',
});

class FirebaseCtrl {
  async sendNotifications(m) {
    let fcmTokens = await Device.find({user: {$nin: m.user.name}});
    let userDetailView = await userCtrl.getUserDetailsByMail(m.user.name);

    if (!fcmTokens || !fcmTokens.length) {
      console.log('cant find', fcmTokens);
      return;
    }
    fcmTokens = fcmTokens.map(fcm => fcm.fcmToken);
    let message = {
      android: {
        notification: {
          body: `${userDetailView.name} ${userDetailView.lastName} wrote a message`,
          title: 'Chat message',
          icon: 'ic_stat_name',
        },
        priority: 'high',
      },
      tokens: fcmTokens,
    };

    admin
      .messaging()
      .sendMulticast(message)
      .then(response => {
        console.log(response.successCount + ' messages were sent successfully');
      })
      .catch(err => {
        console.log('printError', err);
      });
  }

  async sendNotificationsToChosenContactsMembers(user, placeName) {
    try {
      console.log('printUser', user);
      let settings = await settingCtrl.getAllSettings(user),
        notifiyMembers,
        notification,
        usersPhone = [];
      console.log('printSetting', settings);
      for (let setting of settings) {
        notifiyMembers = JSON.parse(setting.notifiyMembers);
        notification = JSON.parse(setting.notification);
        if (!notification) {
          break;
        }
        notifiyMembers = notifiyMembers.filter(
          member => member.highPriority && member.phone === user,
        );
        if (!notifiyMembers || !notifiyMembers.length) {
          break;
        }
        usersPhone.push(setting.user);
      }

      console.log('printParams', usersPhone);
      if (!usersPhone || !usersPhone.length) {
        return;
      }

      console.log('9999printSettingnotifiyMembers', usersPhone);
      let fcmTokens = await Device.find({user: {$in: usersPhone}});
      console.log('9999printSettingnotifiyMembers', fcmTokens);

      console.log('printTest', fcmTokens);
      if (!fcmTokens || !fcmTokens.length) {
        console.log('cant find', fcmTokens);
        return;
      }
      fcmTokens = fcmTokens.map(fcm => fcm.fcmToken);
      console.log('printFcmTokens', fcmTokens);

      let userDetailView = await userCtrl.getUserDetailsByPhone(user);

      let message = {
        android: {
          notification: {
            body: `${userDetailView.name} ${userDetailView.lastName} wrote new advice on ${placeName}`,
            title: 'advice notification',
            icon: 'ic_stat_name',
          },
          priority: 'high',
        },
        tokens: fcmTokens,
      };

      admin
        .messaging()
        .sendMulticast(message)
        .then(response => {
          console.log(
            response.successCount + ' messages were sent successfully',
          );
        })
        .catch(err => {
          console.log('printError', err);
        });
    } catch (err) {
      console.log('printError', err);
    }
  }
}

module.exports = FirebaseCtrl;
