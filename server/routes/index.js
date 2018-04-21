var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Admin = require('../models/admin');
var passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
		console.log("deseri: " + user)
    done(err, user);
  });
});

// Register
router.get('/register', function(req, res){
	if (req.isAuthenticated())
		res.render('register')
	else
		res.sendStatus(401)
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', function (req, res, next) {
	if (req.isAuthenticated()) {
		return res.sendStatus(304)
	}
	passport.authenticate('local', {failureFlash: true, session: true}, function(err, user, info) {
		if (err) return next(err)
		req.login(user, function (err) {
			if (err) return err
			var payload = {id: user._id, expiresInMinutes: 60};
			console.log('jwt key ' + config.getJWTKey())
			req.session.jwtKey = config.getJWTKey()
			var token = jwt.sign(payload, req.session.jwtKey)

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
				return res.json({message: "ok", token: token});
			})
		})
	}) (req, res, next)
})

router.get('/logout', function(req, res){
	config.generateKey()
	req.session.jwtKey = config.getJWTKey()
	req.logout()
	req.flash('success_msg', 'You are logged out')
	delete req.session.isAdmin
	res.redirect('/login')
});

router.get('/api/logout', function(req, res){
	config.generateKey()
	req.session.jwtKey = config.getJWTKey()
	req.logout()
	delete req.session.isAdmin
	res.sendStatus(200)
});

// Get Homepage
router.get('/', passport.authenticate('jwt'), function(req, res){
	res.render('index');
});

router.get('/isValidToken', passport.authenticate('jwt', { session: false }), function (req, res) {
	console.log('OK, token is valid')
	res.sendStatus(200)
})

module.exports = router;