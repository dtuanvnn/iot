var mongoose = require('mongoose');

// Devices Schema
var DeviceSchema = mongoose.Schema({
	id: {
		type: String,
		index:true
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
	}
});

var Device = module.exports = mongoose.model('Device', DeviceSchema);

module.exports.getDevicesByUserId = function(userId, callback){
    var query = {"user.$id": userId};
    Device.find(query, callback);
}

module.exports.getUserById = function(id, callback){
	Device.findById(id, callback);
}

module.exports.getAllUser = function(callback) {
	Device.find(callback);
}