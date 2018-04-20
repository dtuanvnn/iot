var mongoose = require('mongoose');

// Event Schema
var EventSchema = mongoose.Schema({
	_id: String,
  _class: String,
	type: Number,
	utc: Date,
	sensor: {
		ref: 'SensorData',
		type: String
	},
	area: {
		ref: 'Area',
		type: String
	},
	user: {
		ref: 'User',
		type: String
	}
});

var Events = module.exports = mongoose.model('Event', EventSchema, "events");
module.exports.getEventsByQuery = function(query, callback){
  Events.find(query, callback);
}
module.exports.getEventById = function(id, callback){
	Events.findById(id, callback);
}
module.exports.getEvents = function(callback) {
	Events.find(callback);
}