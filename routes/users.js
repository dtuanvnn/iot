var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var uuidv4 = require('uuid/v4');

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

router.get('/api', function(req, res){
	User.getAllUser(function (err, users) {
		if (err) throw err;

		res.send(users);
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
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
	//passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
	passport.authenticate('local', { failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
		//res.redirect('/');
		res.send(true)
	});

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;