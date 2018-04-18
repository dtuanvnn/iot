var User = require('../models/user');
var passportJWT = require("passport-jwt");
const config = require('../config');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = config.getJWTKey()

module.exports = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
	
	User.getUserById(jwt_payload.id, function(err, user) {
		if (err) next(null, false)
    next(null, user);
  });
});