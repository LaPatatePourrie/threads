var UsersController = { 

	register: function(req, res) {
		var values = filter.keys(req.body, _(User.attributes).keys())
		User.create(values).done(function (err, user) {
			res.end(JSON.stringify(user))
		})
	},

	signin: function(req, res) {
		var values = filter.keys(req.body, _(User.attributes).keys())
		values.password = require('crypto').createHash('md5').update(values.password).digest("hex")

		User.findOne(values).done(function (err, user) {
			if (err || !user) {
				res.end(JSON.stringify({error:true}))
			}
			else {
				// var session = new Session(req)
				// session.setUser(user)
				req.session.user = user
				req.session.setuser = 'ok'
				console.log(req.session.user)
				res.end(JSON.stringify({auth:true}))
			}
		})
	},
	
	users: function (req,res) { 
		req.session.setuser = 'hehe'
		User.find().done(function (err, users) {
			res.end(JSON.stringify(users))
		})
	},
	
	user: function (req,res) { 
		User.findOne({id: req.params.id}).done(function (err, user) {
			res.end(JSON.stringify(user))
		})
	},
	
	delete: function(req, res) {
		var idUser = req.params.id
		User.destroy({id: idUser}, function (err) {
			res.end('ok')
		})
	},
	
	messages: function (req,res) { 
		Message.find({idAuthor: req.params.id}).done(function (err, messages) {
			res.end(JSON.stringify(messages))
		})
	},
	
	threads: function (req,res) {
		Thread.find({idAuthor: req.params.id}).done(function (err, threads) {
			res.end(JSON.stringify(threads))
		})
	}
 
}; 
module.exports = UsersController;