var mongoose = require('mongoose');

// Admin Schema
var AdminSchema = mongoose.Schema({
	_id: String,
	type: Number,
	user: {
		ref: 'User',
		type: String
	}
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema, 'admins')