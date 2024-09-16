const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const { DoMongoDB } = require('./mongoDBmodule/mongoDBmain');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Command DB
// DoMongoDB('TOP','Inventory-App', 'findOne', {_test: 'WKD Teststring'});

// require Categorie Model
const Categorie = require('./models/categories');

// Try to connect to MongoDB
try{
  mongoose.connect(process.env.MONGODB);
  
  mongoose.connection.on('fullsetup', err => {
    if(err)console.err(err);
      console.log('Mongoose has successfully connected to the Replica set.');
  });

} catch(err){
  console.error(err)
};

// Listen for error events
mongoose.connection.on('error', err => {
  if(err)console.err(err);
});

// Succesful connected
mongoose.connection.on('connected', err => {
  if(err)console.err(err);
    console.log('Mongoose has successfully connected to MongoDB.');
});

mongoose.connection.on('open', err => {
  if(err)console.err(err);
    console.log('Mongoose connection is open.');
});
 
const peavey = new Categorie({ type: 'Category', name: 'Peavey' });

peavey.save(function (err) {
  if (err) return console.log(err);
  console.log('saved');
});  
     
  

 


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;

// Only for commands in collections