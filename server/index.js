const express = require('express');
const mongoose = require('mongoose');
const logger = require('./config/logger');
const app = express();

const routes = require('./routes/routes');
const constants = require('./utils/constants');
const socketsCtrl = require('./controllers/socketsCtrl');
const MessageView = require('./views/MessageView');

const FireBaseCtrl = require('./controllers/fireBaseCtrl');
const fireBaseCtrl = new FireBaseCtrl();

const PORT = process.env.PORT || constants.PORT;
//middlewares
app.use(express.json());
app.use('/', routes);

// Middleware to handle CORS in development:

app.use('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, x-access-token, x-user-pathway, x-mongo-key, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  next();
});

//connect to db
const {Message} = require('./model/Message');
mongoose
  .connect(constants.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.log('info', `MongoDB Connected,running in port${PORT}`))
  .catch(err => console.log(err));

  let server = app.listen(PORT);
  var io = require('socket.io').listen(server, {
    transports: ['polling', 'websocket'],
  });
  global.io = io;
  
  /*
  io.on('connect', socket => {
    console.log('connected');
    socket.emit('update_contact', {bla: 'hi'});
    socket.emit('connection', {michael: 'ist doof'});
    socket.emit('haha', 'hi'); // This will be emitted
    socket.on('recruiter_id', id => {
      this.socketMap.set(id, id);
      socket.emit('update_contact', {bla: 'hi'});
    });
    socket.emit('update_contact', {bla: 'hi'});
  });
  */
  //setup event listener
  io.on('connection', socket => {
    console.log('user connected');
  
    socket.on('get messages', async function() {
      let messages = await Message.find();
      let messagesViews = [];
      for (let message of messages) {
        messagesViews.push(new MessageView(message));
      }
      socket.emit('messages', messagesViews);
    });
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  
    //Someone is typing
    socket.on('typing', data => {
      socket.broadcast.emit('notifyTyping', {
        user: data.user,
        message: data.message,
      });
    });
  
    //when soemone stops typing
    socket.on('stopTyping', () => {
      socket.broadcast.emit('notifyStopTyping');
    });
  
    socket.on('chat message', async function(msg) {
      const {error} = messageValidation(msg);
      if (error) {
        throw new Error('invalid message');
      }
      let message = new Message(msg);
      try {
        message = await message.save();
        message = new MessageView(message);
        console.log('message: ', message);
        //broadcast message to everyone in port:5000 except yourself.
        socket.broadcast.emit('received', message);
        fireBaseCtrl.sendNotifications(message);
        //save chat to the database
        console.log('connected correctly to the server');
      } catch (err) {
        console.log('errrrrrr', err);
      }
    });
  });
  
