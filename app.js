var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

var mongoDBLink = 'mongodb+srv://admin:store@iot-oqebc.mongodb.net/iot';
var uri = "mongodb://admin:store@iot-shard-00-00-oqebc.mongodb.net:27017,iot-shard-00-01-oqebc.mongodb.net:27017,iot-shard-00-02-oqebc.mongodb.net:27017/iot?ssl=true&replicaSet=iot-shard-0&authSource=admin";

var localDB = 'mongodb://localhost/iot'
mongoose.connect(localDB);
var db = mongoose.connection;

// Init App
var app = express();

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

const localStrategy = require('./server/passport/passport-local');
const jwtStrategy = require('./server/passport/passport-jwt');

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);

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

var index = require('./server/routes/index');
var user = require('./server/routes/user');
var device = require('./server/routes/device');
var history = require('./server/routes/history');

/* app.all('/api/*', function(req, res, next) {
  console.log('verifying')
  passport.authenticate('jwt', { session: false }, function(a, b, c, d) {
    console.log(a,b,c,d)
  })(req,res,next)
}, 
function(req, res, next){
  console.log('all')
  next()
}) */
app.use('/', index)
app.use('/api/user', user)
app.use('/api/device', device)
app.use('/api/history', history)

// Set Port
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});