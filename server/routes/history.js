var express = require('express');
var router = express.Router();
var ensureAdministrator = require('../functions/ensureAdministrator')

var SensorData = require('../models/sensorData');

// Get history sensors
router.get('/sensors', ensureAdministrator, function(req, res){
  SensorData.getAllSensors(function (err, sensors) {
    if (err) throw err

    res.render('history-sensor', {
      sensors: sensors
    });
  })
});

module.exports = router;