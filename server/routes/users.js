var express = require('express');
var router = express.Router();
var passport = require('passport');
var uuidv4 = require('uuid/v4');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Area = require('../models/area');
var Device = require('../models/device');
//var ensureAuthenticated = require('../functions/ensureAuthenticated')

// List all users
/* router.get('/', function(req, res){
	User.getAllUser(function (err, users) {
		if (err) throw err;

		res.render('all-users', {
			users: users
		});
	});
}); */

router.get('/', /*passport.authenticate('jwt', { session: false }),*/ function(req, res){
	User.find().select('name').exec(function (err, users) {
		if (err) throw err;
		res.send(JSON.stringify(users))
	});
});
router.get('/area', function(req, res) {
	Area.findById({'_id': 'bb81c242-10c6-408a-a8dc-80b6bc596044'})
	.populate('user.id')
	.exec(function(err, areas) {
		res.json(areas)
	})
})
router.get('/device', function(req, res) {
	User.find().exec(function(err, users){
		var area = new Area({
			_id: uuidv4(),
			user: users[0]._id
		})
		area.save(function(err, user){
			if(err) throw err;
			console.log(user);
			res.json(area)
		})
	})
})
router.get('/detail', function(req, res) {
	User.getUserByPhone(req.query.id, function(err, user){
		if (err) throw err;
		res.send(user)
	});
})

// Detail user
/* router.get('/detail', function(req, res) {
	User.getUserByPhone(req.query.id, function(err, user){
		if (err) throw err;

		res.render('user-detail', {
			user: user
		});
	});
})
 */
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