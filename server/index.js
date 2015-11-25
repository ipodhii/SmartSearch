const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const logger=require('./config/logger');
const app = express();
const result = dotenv.config();
if (result.error) {
  throw result.error;
}


//global variables
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use('/', routes);

/*
//Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.status(200).send();
  } else {
    next();
  }
});
*/
//connect to db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.log("info",'MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(PORT);
