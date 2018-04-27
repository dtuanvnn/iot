var express = require('express');
var router = express.Router();
var passport = require('passport');

var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Area = require('../models/area');
var Device = require('../models/device');
var Events = require('../models/event');
var SensorData = require('../models/sensorData');
var Admin = require('../models/admin');

var ensureAdministrator = require('../functions/ensureAdministrator')

// SensorData API
router.get('/sensordata', function(req, res){
	var currentPage = req.query.page || 0;
	var pageSize = 20
	SensorData
	.find()
	.skip(pageSize*(Math.max(currentPage-1, 0)))
	.limit(pageSize)
	.select('-_class')
	.exec(function(err, sensorDatas){
		if (err) throw err
		res.json(sensorDatas)
	})
})

// Event API
router.get('/event', function(req, res){
	var currentPage = req.query.page || 0;
	var pageSize = 20

	Events
	.find()
	.skip(pageSize*(Math.max(currentPage-1, 0)))
	.limit(pageSize)
	.select('type utc')
	.exec(function(err, events){
		if (err) throw err
		res.json(events)
	})
})
router.get('/event/detail', function(req, res){
	if (!req.query.id){
		return res.sendStatus(404)
	}
	Events
	.findOne({'_id': req.query.id})
	.select('-_id -_class')
	.populate('sensor', '-_id -_class -area')
	.populate('area', 'name')
	.populate('user', 'name')
	.exec(function(err, event){
		if (err) throw err
		res.json(event)
	})
})

// User API
router.get('/list/:city/:district', function(req, res, next){
	console.log(req.params)
	let queryString = {}
	if (req.params.city) {
		queryString.city = req.params.city
	}
	if(req.params.district) {
		queryString.district = req.params.district
	}
	User
	.find(queryString)
	.select('name email phoneNumber lastAccess')
	.exec(function(err, users){
		if (err) next(err)
		return res.status(200).json(users)
	})
})
router.get('/filter', function(req, res){
	if (!req.query){
		return res.sendStatus(404)
	}
	User
	.find()
	.distinct(req.query.id)
	.exec(function(err, users){
		if (err) throw err
		res.json(users)
	})
})
router.get('/detail', function(req, res){
	if (!req.query.id){
		return res.sendStatus(404)
	}
	User
	.findOne({'_id': req.query.id})
	.select('-password -_class -_id')
	.exec(function(err, user){
		if (err) throw err
		res.json(user)
	})
})

// Area API
router.get('/area', function(req, res) {
	Area.find().select('name').exec(function(err, areas){
		if (err) throw err
		res.json(areas)
	})
})
router.get('/area/detail', function(req, res) {
	if (!req.query.id){
		return res.sendStatus(404)
	}
	Area
	.findOne({'_id': req.query.id})
	.select('-_id -_class')
	.populate('gateway', '-_id -user -area -_class')
	.populate('sensor', '-_id -user -area -_class')
	.populate({
		path:'control', 
		select: '-_id -user -area -_class', 
		populate : {
			path : 'outputs', 
			select: '-_id -_class'
		}
	})
	.populate('user', '-_id name status')
	.exec(function(err, area) {
		if (err) throw err
		res.json(area)
	})
})

// Device API
/* router.get('/device', function(req, res) {
	Device
	.find()
	.exec(function(err, devices){
		if (err) throw err;
		res.json(devices)
	})
}) */
router.get('/device', function(req, res) {
	if (!req.query.id){
		Device
		.find()
		.exec(function(err, devices){
			if (err) throw err;
			res.json(devices)
		})
	} else {
		Device
		.find({'user.$id': req.query.id})
		.exec(function(err, devices){
			if (err) throw err;
			res.json(devices)
		})
	}
})
router.get('/device/detail', function(req, res) {
	if (!req.query.id){
		return res.sendStatus(404)
	}
	Device
	.findOne({'_id':req.query.id})
	.select('-_id -_class')
	.populate('user', 'name')
	.populate('area', 'name')
	.populate('outputs', '-_id -_class -user -area -control')
	.exec(function(err, device){
		if (err) throw err;
		res.json(device)
	});
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

/* router.get('/', function(req, res){
	User.getAllUser(function (err, users) {
		if (err) throw err;

		res.render('all-users', {
			users: users
		});
	});
}); */

/* router.get('/', passport.authenticate('jwt', { session: false }), function(req, res){
	User.find().select('name').exec(function (err, users) {
		if (err) throw err;
		res.send(JSON.stringify(users))
	});
}); */

/* router.get('/area', function(req, res) {
	Area.find(function(err, areas) {
		var promises = [];
		areas.forEach(function(area){
			var promises = [];
			promises.push(new Promise(function(resolve, reject){
				User.findById({'_id':area.user.oid}, {'name':1, 'email':1}, function(err, data){
					resolve(data)
				})
			}))
			promises.push(new Promise(function(resolve, reject){
				Device.findById({'_id':area.gateway.oid}, {'name':1 }, function(err, data){
					resolve(data)
				})
			}))
			promises.push(new Promise(function(resolve, reject){
				User.findById({'_id':area.sensor.oid}, {'name':1 }, function(err, data){
					resolve(data)
				})
			}))
			promises.push(new Promise(function(resolve, reject){
				User.findById({'_id':area.control.oid}, {'name':1 }, function(err, data){
					resolve(data)
				})
			}))

			Promise.all(promises).then(function(data){
				return 
			})
		})
		Promise.all().then(function(data){res.json(data)})
	})
}) */

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

module.exports = router;