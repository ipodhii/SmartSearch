const express = require('express');
const mongoose = require('mongoose');
const logger = require('./config/logger');
const app = express();

const routes = require('./routes/routes');
const constants = require('./utils/constants');
const socketsCtrl = require('./controllers/socketsCtrl');
const MessageView = require('./views/MessageView');

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
