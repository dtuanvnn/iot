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
		type: String
	},
  gateway: {
		type: String
	},
	user: {
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