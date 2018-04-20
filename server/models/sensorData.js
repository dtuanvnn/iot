var mongoose = require('mongoose');

// Sensor Data Schema
var SensorDataSchema = mongoose.Schema({
	_id: {
		type: String
	},
	_class: {
		type: String
	},
	airTemp: {
		type: Number
	},
	airHum: {
		type: Number
	},
	soilTemp: {
		type: Number
	},
	soilHum: {
		type: Number
	},
	elecNeg: {
		type: Number
	},
	utc: {
		type: Number
	},
	area: {
		type: String
	}
});

var SensorData = module.exports = mongoose.model('SensorData', SensorDataSchema, 'sensorDatas');

module.exports.getSensorsByAreaId = function(areaId, callback){
    var query = {"area.$id": areaId};
    SensorData.find(query, callback);
}

module.exports.getSensorDataById = function(id, callback){
	SensorData.findById(id, callback);
}

module.exports.getSensorDatas = function(callback) {
	SensorData.find(callback);
}