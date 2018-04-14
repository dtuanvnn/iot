var mongoose = require('mongoose');

// Sensors Schema
var SensorDataSchema = mongoose.Schema({
	_id: {
		type: String
	},
	airTemp: {
		type: String
	},
	airHum: {
		type: Number
	},
	soilTemp: {
		type: Number
	},
	soilHum: {
		type: String
	},
	elecNeg: {
		type: Object
	},
	utc: {
		type: Number
	},
	area: {
		type: Object
	}
});

var SensorData = module.exports = mongoose.model('SensorData', SensorDataSchema, 'sensorDatas');

module.exports.getSensorsByAreaId = function(areaId, callback){
    var query = {"area.$id": areaId};
    SensorData.find(query, callback);
}

module.exports.getSensorById = function(id, callback){
	SensorData.findById(id, callback);
}

module.exports.getAllSensors = function(callback) {
	SensorData.find(callback);
}