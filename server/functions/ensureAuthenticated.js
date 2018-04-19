var ensureAuthenticated = function (req, res, next){
	console.log(req.user)
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = ensureAuthenticated