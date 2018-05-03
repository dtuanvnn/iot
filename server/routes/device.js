var express = require('express');
var router = express.Router();

var Device = require('../models/device');
var User = require('../models/user');
var ensureAdministrator = require('../functions/ensureAdministrator')

// Device API
/* router.get('/device', function(req, res) {
	Device
	.find()
	.exec(function(err, devices){
		if (err) throw err;
		res.json(devices)
	})
}) */
router.get('/', function(req, res) {
	if (!req.query.id){
		Device
		.find()
		.exec(function(err, devices){
			if (err) throw err
			res.json(devices)
		})
	} else {
		Device
		.find({'user.$id': req.query.id})
		.exec(function(err, devices){
			if (err) throw err
			res.json(devices)
		})
	}
})
router.get('/detail', function(req, res) {
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


/* // List all devices of user id
router.get('/', function(req, res){
  var userId = req.query.id
  if (userId) {
    User.getUserById(userId, function(err, user) {
      if (err) throw err
  
      var username = user.name;
      Device.getDevicesByUserId(userId, function (err, devices) {
        if (err) throw err
    
        res.render('all-devices', {
          devices: devices,
          username: username
        })
      })
    })
  } else {
    Device.getAllDevices(function (err, devices) {
      if (err) throw err
  
      res.render('all-devices', {
        devices: devices
      })
    })
  }
})

// Detail device
router.get('/detail', function(req, res) {
  var deviceId = req.query.id
	Device.getDeviceById(deviceId, function(err, device){
		if (err) throw err;
		res.send(JSON.stringify(device))
	});
}) */

module.exports = router
