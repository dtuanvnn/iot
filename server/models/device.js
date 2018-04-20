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
	enable: {
		type: Number
	},
	relay: {
		type: Number
	},
	outputs: [{
		ref: 'Device',
		type: String
	}],
	user: {
		ref: 'User',
		type: String
	},
	control: {
		ref: 'Device',
		type: String
	},
	area: {
		ref: 'Area',
		type: String
	}
});

var Device = module.exports = mongoose.model('Device', DeviceSchema, 'devices');

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