var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
//mongoose setup
var mongoose = require('mongoose');

//routes
var appRoutes = require('./routes/app');
var messageRoutes = require('./routes/messages');
var studentRoutes = require('./routes/student');
var userRoutes = require('./routes/user');

//initialize app
var app = express();
mongoose.connect('localhost:27017/node-angular');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// //set storage engine for multer
// var storage = multer.diskStorage({
//     destination : './public/uploads/',
//     filename: function(req,file,cb){
//         cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Initiialize the upload 
// var upload = multer({
//     storage : storage
// }).single('avatar');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//specific ones first
app.use('/student', studentRoutes);
app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
