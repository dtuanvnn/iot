var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	_id: {
		type: String
	},
	email: {
		type: String
	},
	phoneNumber: {
		type: String
	},
	password: {
		type: String
	},
	city: {
		type: String
	},
	district: {
		type: String
	},
	ward: {
		type: String
	},
	lastAccess: {
		type: Number
	},
	status: {
		type: Number
	},
	avatar: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(name, callback){
	var query = {name: name};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByPhone = function(phoneNumber, callback){
	var query = {phoneNumber: phoneNumber};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.getAllUser = function(callback) {
	User.find(callback);
}