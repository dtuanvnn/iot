var mongoose = require('mongoose');

// Event Schema
var EventSchema = mongoose.Schema({
	_id: {
		type: String
  },
  _class: {
    type: String
  },
	type: {
		type: String
	},
	utc: {
		type: String
	},
	sensor: {
		type: String
	},
	area: {
		type: String
	},
	user: {
		type: String
	}
});

var Events = module.exports = mongoose.model('Events', EventSchema, "events");
module.exports.getEventsByQuery = function(query, callback){
  Events.find(query, callback);
}
module.exports.getEventById = function(id, callback){
	Events.findById(id, callback);
}
module.exports.getEvents = function(callback) {
	Events.find(callback);
}