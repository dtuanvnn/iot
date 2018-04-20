var mongoose = require('mongoose');

// Setting Schema
var SettingSchema = mongoose.Schema({
	_id: {
		type: String
  },
  _class: {
    type: String
  },
	name: {
		type: String
	},
	index: {
		type: Number
	},
	enable: {
		type: Number
	},
	data: {
		type: Object
  },
  area: {
		ref: 'Area',
		type: String
	},
  gateway: {
		ref: 'Device',
		type: String
	},
	user: {
		ref: 'User',
		type: String
	}
});

var Setting = module.exports = mongoose.model('Setting', SettingSchema, "settings");
module.exports.getSettingsByQuery = function(query, callback){
  Setting.find(query, callback);
}
module.exports.getSettingById = function(id, callback){
	Setting.findById(id, callback);
}
module.exports.getSettings = function(callback) {
	Setting.find(callback);
}