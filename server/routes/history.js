var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../functions/ensureAuthenticated')

var SensorDatas = require('../models/sensorDatas');

// Get history sensors
router.get('/sensors', ensureAuthenticated, function(req, res){
  SensorDatas.getAllSensors(function (err, sensors) {
    if (err) throw err

    res.render('history-sensor', {
      sensors: sensors
    });
  })
});

module.exports = router;