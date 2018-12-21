/*------------------EXPRESS DEFINE HOST AND PORT--------------------*/
const express = require('express'),
  app = express('localhost'),
  port = process.env.PORT || 5000;


/*--------------------------------------Declare global variables--------------------------------*/
  admin = require('firebase-admin'),
  async = require('async'), 
  bcrypt = require('bcrypt')
  batch = require('batchflow'),
  cookieParser = require('cookie-parser'),
  crypto = require('crypto'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  gm = require('gm').subClass({imageMagick: true}),
  mongoose = require('mongoose'),
  moment = require('moment'),
  multer = require('multer'),
  path = require('path'),
  passport = require('passport'),
  randomstring = require('randomstring'),
  session = require('express-session');

  /*---------------------MOONGOSE------------------------*/
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/blockchain', 

 
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;

db.on(
  'error', 
  console.error.bind(
    console, 'MongoDB connection error:'
  )
);  

/*---------------------------------------Passport session setup--------------------------------*/

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({extended: true, limit: '50mb'}));
app.use(session({secret: 'soManySecrets', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
app.use(function(request, response, next) {
  // console.log('Reached main middleware in server.js');
  // response.status(404).send({url: request.originalUrl + ' not found'});
  next();
});

/*------------------------ROUTE--------------------*/
var passportConfig = require('./api/config/passport');
passportConfig(passport);

var adminRoutes = require('./api/routes/adminRoute');
adminRoutes(app, passport);

var authorizedUserRoutes = require('./api/routes/authorizedUserRoutes');
authorizedUserRoutes(app, passport);

var userRoute = require('./api/routes/userRoute');
userRoute(app, passport);

/*-----------------------listen port----------------------------*/
app.listen(port);
console.log('node RESTful API server started on: ' + port)
