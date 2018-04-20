var mongoose = require('mongoose');

// Area Schema
var AreaSchema = mongoose.Schema({
	_id: String,
  _class: String,
	name: String,
	gateway: {
		ref: 'Device',
		type: String
	},
	sensor: {
		ref: 'Device',
		type: String
	},
	control: {
		ref: 'Device',
		type: String
	},
	user: {
		ref: 'User',
		type: String
	}
});

var Area = module.exports = mongoose.model('Area', AreaSchema, 'areas')