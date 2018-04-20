var express = require('express');
var router = express.Router();

var Device = require('../models/device');
var User = require('../models/user');
var ensureAuthenticated = require('../functions/ensureAuthenticated')

var Handlebars = require("handlebars");
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(Handlebars);

Handlebars.registerHelper("switch", function(value, options) {
  this._switch_value_ = value;
  var html = options.fn(this); // Process the body of the switch block
  delete this._switch_value_;
  return html;
});

Handlebars.registerHelper("case", function(value, options) {
  if (value == this._switch_value_) {
    return options.fn(this);
  }
});


// List all devices of user id
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
})

module.exports = router
