var express = require('express');
var router = express.Router();

var User = require('../models/user');
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

// Login
router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', function (req, res, next) {
	if (req.isAuthenticated()) {
		return res.sendStatus(304)
	}
	passport.authenticate('local', {failureFlash: true, session: true}, function(err, user, info) {
		req.login(user, function (err) {
			if (err) return err
			var payload = {id: user._id, expiresInMinutes: 60};
			var token = jwt.sign(payload, config.getJWTKey())
			return res.json({message: "ok", token: token});
		})
	}) (req, res, next)
})

router.get('/logout', function(req, res){
	config.generateKey()
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/login');
});

// Get Homepage
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res){
	res.render('index');
});

module.exports = router;