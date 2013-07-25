
var MessagesController = {

	update: function (req,res) { 
		var out = {}

		var values = req.body

		Message.update({
			id: values.id
		}, 
		filter.keys(values, authKeys), function(err, message) {
		  res.end(JSON.stringify(message))
		});
	},

	insert: function(req, res) {
		var values = filter.keys(req.body, authKeys)
		values.idAuthor = 1

		Message.create(values).done(function (err, message) {
			res.end(JSON.stringify(message))
		})
	},

	delete: function(req, res) {
		var idMessage = req.params.id
		Message.destroy({id: idMessage}, function (err) {
			res.end('ok')
		})
	}
};

module.exports = MessagesController;