const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userCtrl');
const AdviceCtrl = require('../controllers/adviceCtrl');
const SettingCtrl = require('../controllers/settingCtrl');
const SocketsCtrl = require('../controllers/socketsCtrl');
const NotesCtrl = require('../controllers/notesCtrl');

const auth = require('../middleware/auth');
const logger = require('../config/logger');

//socket

//instances
const userCtrl = new UserCtrl();
const adviceCtrl = new AdviceCtrl();
const settingCtrl = new SettingCtrl();
const socketsCtrl = new SocketsCtrl();
const notesCtrl = new NotesCtrl();

//routes
router.get('/', (req, res) => {
  logger.log('info', 'cheking middleware');
  res.send('routing working');
});

router.get('/api/user', userCtrl.getUser);
router.post('/api/register', userCtrl.addUser);
router.post('/api/login', userCtrl.login);
router.post('/api/useradvices', userCtrl.getAdvicesFromContacts);
router.post('/api/sendMail', userCtrl.sendMail);
router.post('/api/setPasswordMail', userCtrl.setPasswordMail);
router.put('/api/user', userCtrl.updateUser);

router.get('/api/messages', socketsCtrl.getAllMessages);
router.post('/api/sendMessage', socketsCtrl.sendMessage);

router.post('/api/advice', adviceCtrl.addAdvice);

//setting routes
router.post('/api/setting', settingCtrl.createSetting);
router.put('/api/setting', settingCtrl.updateSetting);
router.get('/api/setting', settingCtrl.getSetting);

//note routes
router.post('/api/note', notesCtrl.createNote);
router.put('/api/note', notesCtrl.updateNote);
router.get('/api/note', notesCtrl.getNotes);
router.delete('/api/note', notesCtrl.deleteNote);

module.exports = router;
