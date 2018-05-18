var mongoose = require('mongoose');

// Sensor Data Schema
var SensorDataSchema = mongoose.Schema({
	_id: String,
	_class: String,
	airTemp: Number,
	airHum: Number,
	soilTemp: Number,
	soilHum: Number,
	elecNeg: Number,
	utc: Date,
	area: {
		ref: 'Area',
		type: Object
	}
});

var SensorData = module.exports = mongoose.model('SensorData', SensorDataSchema, 'sensorDatas')