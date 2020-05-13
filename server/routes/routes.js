const router = require('express').Router();
const UserCtrl = require('../controllers/userCtrl');
const AdviceCtrl = require('../controllers/adviceCtrl');
const SettingCtrl = require('../controllers/settingCtrl');

const auth = require('../middleware/auth');
const logger = require('../config/logger');
//instances
const userCtrl = new UserCtrl();
const adviceCtrl = new AdviceCtrl();
const settingCtrl = new SettingCtrl();

//routes
router.get('/', auth, (req, res) => {
  logger.log('info', 'cheking middleware');
  res.send('The middleware working');
});

router.get('/api/user', userCtrl.getUser);
router.post('/api/register', userCtrl.addUser);
router.post('/api/advice', adviceCtrl.addAdvice);
router.get('/api/advice', userCtrl.getAdvicesFromContacts);
router.post('/api/sendMail', userCtrl.sendMail);
router.post('/api/setting', settingCtrl.updateSetting);
//router.post('/api/posts', auth, adviceCtrl.addPost);
module.exports = router;
