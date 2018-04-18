var express = require('express');
var router = express.Router();
var passport = require('passport');
var uuidv4 = require('uuid/v4');
var jwt = require('jsonwebtoken');

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

router.get('/api', passport.authenticate('jwt', { session: false }), function(req, res){
	User.getAllUser(function (err, users) {
		if (err) throw err;
		res.send(users)
	});
});
router.get('/api/detail', passport.authenticate('jwt', { session: false }), function(req, res) {
	User.getUserByPhone(req.query.id, function(err, user){
		if (err) throw err;
		res.send(user)
	});
})

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
router.get('/register', passport.authenticate('jwt', { session: false }), function(req, res){
	res.render('register');
});

// Register User
router.post('/register', passport.authenticate('jwt', { session: false }), function(req, res){
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

router.get('/islogged', passport.authenticate('jwt', { session: false }), function (req, res) {
	console.log('OK')
	res.sendStatus(200)
})

/*
router.post('/login', function (req, res, next) {
	passport.authenticate('local', {failureFlash: true, session: true}, function(err, user, info) {
		req.login(user, function (err) {
			if (err) return err
			var payload = {id: user._id, expiresInMinutes: 60};
			var token = jwt.sign(payload, jwtOptions.secretOrKey);
			return res.json({message: "ok", token: token});
		})
	}) (req, res, next)
})

router.get('/logout', function(req, res){
	jwtOptions.secretOrKey = 'myjwtcode' + new Date().toUTCString();
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
}); */

module.exports = router;