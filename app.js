var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signRouter = require('./routes/sign');

var app = express();

//Connect to database 

mongoose.connect("mongodb://localhost:27017/Scader", { useNewUrlParser: true });

// view engine setup
app.engine('.hbs',handlebars({defaultLayout:'layout', extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'My Secret', 
  resave: false, 
  saveUninitialized: false,
  cookie: { maxAge: 180*60*1000}
}));
app.use(flash());

//calling routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', signRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


app.use(function(req, res, next)
{
  res.locals.session = req.session;
  res.locals.success_msg = req.flash('success_msg');
  next();
});

module.exports = app;
