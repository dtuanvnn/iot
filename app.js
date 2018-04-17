var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/iot');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var devices = require('./routes/devices');
var history = require('./routes/history');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cookieSecretKey = process.env.COOKIE_SECRET_KEY;
var sessionSecretKey = process.env.SESSION_SECRET_KEY;
app.use(cookieParser(cookieSecretKey));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

// Express Session
app.use(session({
    secret: 'fcE44M6OrYAotb659eMFbxLYHPpfOIqn2kCtqnBl',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.db = req.db;
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/devices', devices);
app.use('/history', history);

// Set Port
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});