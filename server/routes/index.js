var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Admin = require('../models/admin');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var uuidv4 = require('uuid/v4');
const config = require('../config');
var ensureAdministrator = require('../functions/ensureAdministrator')

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Register User
router.post('/register', 
passport.authenticate('jwt', { session: false }),
ensureAdministrator, 
function(req, res){
	var name = req.body.name
	var email = req.body.email
	var password = req.body.password
	var password2 = req.body.password2
	var phoneNumber = req.body.phoneNumber
	// Validation
	req.checkBody('name', 'Name is required').notEmpty()
	req.checkBody('email', 'Email is required').notEmpty()
	req.checkBody('email', 'Email is not valid').isEmail()
	req.checkBody('password', 'Password is required').notEmpty()
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password)
	req.checkBody('phoneNumber', 'Phone Number is number').isNumeric()
	var errors = req.validationErrors();

	if(errors){
		res.json({errors: errors})
	} else {
		var newUser = new User({
			name: name,
			email:email,
			password: password,
			phoneNumber: phoneNumber,
			_id: uuidv4()
		});
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
			res.status(200).json({userid: user._id})
		});
		req.flash('success_msg', 'You are registered and can now login');
	}
});
// Login
router.post('/login', function (req, res, next) {
	passport.authenticate('local', {failureFlash: true, session: true}, function(err, user, info) {
		if (err) return next(err)
		var payload = {id: user._id, expiresInMinutes: 60};
		config.generateKey()
		console.log(config.getJWTKey())
		var token = jwt.sign(payload, config.getJWTKey())

		Admin
		.findOne({'user':user._id})
		.select('-_id -user')
		.exec(function(err, admin){
			if (err) throw err
			if (!admin) {
				console.log('set admin')
				req.session.isAdmin = -1
			} else {
				req.session.isAdmin = admin.type
			}
			return res.json({
				message: "ok", 
				user: {
					token: token, 
					userid: user._id, 
					admin: admin.type,
					username: user.name
				}
			});
		})
	}) (req, res, next)
})
// Logout
router.post('/logout', 
	/* passport.authenticate('jwt', { session: false }),  */
	function(req, res){
		config.generateKey()
		delete req.session.isAdmin
		res.sendStatus(200)
	}
);
// test authentical home page
router.get('/', function(req, res, next) { 
	console.log(req.headers)
passport.authenticate('jwt', { session: false })(req, res, next)
},
function(req, res){
	return res.status(200).json({message: "OK"})
});

module.exports = router;