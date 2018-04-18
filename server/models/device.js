var mongoose = require('mongoose');

// Devices Schema
var DeviceSchema = mongoose.Schema({
	_id: {
		type: String
	},
	name: {
		type: String
	},
	type: {
		type: Number
	},
	status: {
		type: Number
	},
	code: {
		type: String
	},
	user: {
		type: Object
	},
	enable: {
		type: Number
	},
	relay: {
		type: Number
	}
});

var Device = module.exports = mongoose.model('Device', DeviceSchema);

module.exports.getDevicesByUserId = function(userId, callback){
    var query = {"user.$id": userId};
    Device.find(query, callback);
}

module.exports.getDeviceById = function(id, callback){
	Device.findById(id, callback);
}

module.exports.getAllDevices = function(callback) {
	Device.find(callback);
}