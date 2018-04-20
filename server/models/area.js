var mongoose = require('mongoose');
var User = require('../models/user');
// Area Schema
var AreaSchema = mongoose.Schema({
	_id: String,
  _class: String,
	name: String,
	gateway: {
		ref: String,
		type: Object
	},
	sensor: {
		ref: String,
		type: Object
	},
	control: {
		ref: String,
		type: Object
	},
	user: {
		'ref': String,
		'$id': {
			type: String,
			ref: 'User'
		}
	}
});

var Area = module.exports = mongoose.model('Area', AreaSchema);
module.exports.getAreasByQuery = function(query, callback){
    Area.find(query, callback);
}
module.exports.getAreaById = function(id, callback){
	Area.findById(id, callback);
}
module.exports.getAreas = function(callback) {
	Area.find(callback);
}