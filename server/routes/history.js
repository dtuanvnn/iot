var express = require('express');
var moment = require('moment')
var router = express.Router();
var ensureAdministrator = require('../functions/ensureAdministrator')

var SensorData = require('../models/sensorData');
var Events = require('../models/event');

// Get history sensors
router.get('/sensor', function(req, res){
  var currentPage = parseInt(req.query.page) || 1
  var pageSize = parseInt(req.query.pageSize) || 10
  SensorData
  .find()
  .skip(pageSize*(Math.max(currentPage-1, 0)))
  .limit(pageSize)
  .select('-_class')
  .exec(function (err, sensors) {
    if (err) throw err
    SensorData.count().exec(function(err, count){
      if (err) throw err
      var pages = Math.ceil(count / pageSize)
      res.json({
        data: sensors,
        pages: pages
      })
    })
  })
})
router.get('/sensor/filter', function(req, res){
  var startDate = req.query.startDate || Date.now
  var endDate = req.query.endDate || Date.now + 1
  console.log(startDate)
  console.log(endDate)

  SensorData
  .aggregate([
    { $match: {
        'utc': { 
          $gte: startDate,
          $lte: endDate 
        } 
      } 
    },
    { $group: {
        _id: { 
            year: { $year : { $add: [ new Date(0), "$utc"]}},
            month: { $month : { $add: [ new Date(0), "$utc"]}},
            day: { $dayOfMonth : { $add: [ new Date(0), "$utc"]}},
            hour: { $hour : { $add: [ new Date(0), "$utc"]}}
        },
        airTemp: { $avg: "$airTemp" },
        airHum: { $avg: "$airHum" },
        soilTemp: { $avg: "$soilTemp" },
        soilHum: { $avg: "$soilHum" },
        elecNeg: { $avg: "$elecNeg" },
        
        first: { $min: "$utc" }
      }
    },
    { $sort: {_id: 1} },
    { $project: { 
        date: { $add: [ new Date(0), "$first" ]}, 
        airTemp: { $divide: [{ $trunc: { $multiply: ["$airTemp", 100]}}, 100]}, 
        airHum: { $divide: [{ $trunc: { $multiply: ["$airHum", 100]}}, 100]}, 
        soilTemp: { $divide: [{ $trunc: { $multiply: ["$soilTemp", 100]}}, 100]}, 
        soilHum: { $divide: [{ $trunc: { $multiply: ["$soilHum", 100]}}, 100]},
        elecNeg: { $divide: [{ $trunc: { $multiply: ["$elecNeg", 100]}}, 100]},
        _id: 1
      } 
    }
  ])
  .exec(function (err, sensors) {
    if (err) throw err
    res.json({
      data: sensors
    })
  })

  /* SensorData
  .find({"utc": {
    $gt: startDate,
    $lt: endDate
  }})
  .select('-_class')
  .exec(function (err, sensors) {
    if (err) throw err
    res.json({
      data: sensors
    })
  }) */
})

// Event API
router.get('/event', function(req, res){
	var currentPage = parseInt(req.query.page) || 1
  var pageSize = parseInt(req.query.pageSize) || 10
	Events
	.find()
	.skip(pageSize*(Math.max(currentPage-1, 0)))
	.limit(pageSize)
	.select('type utc')
	.exec(function(err, events){
    if (err) throw err
    Events.count().exec(function(err, count){
      if (err) throw err
      var pages = Math.ceil(count / pageSize)
      res.json({
        data: events,
        pages: pages
      })
    })
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

module.exports = router;