var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
  function(name, password, done) {
   User.getUserByUsername(name, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
  });
})