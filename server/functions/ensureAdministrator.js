var ensureAdministrator = function (req, res, next){
	if(req.isAuthenticated() && req.session.isAdmin === 2){
		console.log("Is super admin")
		return next();
	} else {
		console.log("Is NOT super admin ", req.session.isAdmin)
		return res.sendStatus(401);
	}
}

module.exports = ensureAdministrator