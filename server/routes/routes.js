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
router.get('/', (req, res) => {
  logger.log('info', 'cheking middleware');
  res.send('routing working');
});

router.get('/api/user', userCtrl.getUser);
router.post('/api/register', userCtrl.addUser);
router.post('/api/login', userCtrl.login);
router.get('/api/advice', userCtrl.getAdvicesFromContacts);
router.post('/api/sendMail', userCtrl.sendMail);

router.post('/api/advice', adviceCtrl.addAdvice);

router.post('/api/setting', settingCtrl.updateSetting);
module.exports = router;
