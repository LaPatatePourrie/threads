/**
* Allow any authenticated user.
*/
module.exports = function (req,res,ok) {
	delete req.session

	var session = new Session(req)
	
	// User is allowed, proceed to controller
	if (session.isAuthenticated()) {
		return ok();
	}
	// User is not allowed
	else {
		var out = {auth: true}
		return res.send(JSON.stringify(out), 403);
	}
};