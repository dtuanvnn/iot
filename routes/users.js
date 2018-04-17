var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var uuidv4 = require('uuid/v4');
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var User = require('../models/user');
var ensureAuthenticated = require('../functions/ensureAuthenticated')

// List all users
router.get('/', ensureAuthenticated, function(req, res){
	User.getAllUser(function (err, users) {
		if (err) throw err;

		res.render('all-users', {
			users: users
		});
	});
});

router.get('/api', ensureAuthenticated, function(req, res){
	User.getAllUser(function (err, users) {
		if (err) throw err;

		res.send(users)
	});
});

// Detail user
router.get('/detail', function(req, res) {
	User.getUserByPhone(req.query.id, function(err, user){
		if (err) throw err;

		res.render('user-detail', {
			user: user
		});
	});
})

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			password: password,
			phoneNumber: '0001212',
			_id: uuidv4()
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(name, password, done) {
   User.getUserByUsername(name, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
	console.log('Seri: ' + user)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
		console.log('Deseri: ' + user)
    done(err, user);
  });
});

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'mycode';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
	// usually this would be a database call:
	User.getUserById(jwt_payload.id, function(err, user) {
		if (err) next(null, false)
    next(null, user);
  });

  /* var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  } */
});

passport.use(strategy);

router.get('/islogged', passport.authenticate('jwt', { session: false }), function (req, res) {
	console.log('OK')
	res.sendStatus(200)
})

router.post('/login', function (req, res, next) {
	passport.authenticate('local', {failureFlash: true, session: true}, function(err, user, info) {
		req.login(user, function (err) {
			if (err) return err
			var payload = {id: user._id};
			var token = jwt.sign(payload, jwtOptions.secretOrKey);
			return res.json({message: "ok", token: token});
		})
	}) (req, res, next)
})

/* router.post('/login', function (req, res, next) {
	passport.authenticate('local', {failureFlash: true, session: true}, function(err, user, info) {
		req.login(user, function (err) {
			return res.sendStatus(200)
		})
	}) (req, res, next)
}) */

router.post('/login2', 
	passport.authenticate('local', {failureFlash: true, session: true}),
	function (req, res, next) {
		res.sendStatus(200)
	}
)

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;