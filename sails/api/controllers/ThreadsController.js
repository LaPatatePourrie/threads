var authKeys = ['title']

var ThreadsController = {

	threads: function (req,res) {
		async.waterfall([
			function getThreads(callback) {
				Thread.find().done(function (err, threads) {
					callback(err, threads)
				})
			}, 
			// Find thread messageCount and authors in parallel
			function getThreadDetails (threads, callback) {
				async.parallel([
					function getMessageDetails(callback) {
						var funcs = []
						_(threads).each(function (thread) {
							funcs.push(function (callback) {
								Message.find({idThread: thread.id}).done(function (err, messages) {
									thread.messageCount = messages.length
									thread.lastAuthorId = messages[messages.length-1].idAuthor

									User.findOne({id: thread.lastAuthorId}, function (err, author) {
										thread.lastAuthor = author
										callback(err)
									})
								})
							})
						})
						// Recherche des auteurs en parallèle
						async.parallel(funcs, function (err) {
							callback(err, threads)
						})
					}, 
					function getAuthors(callback) {
						var funcs = []
						_(threads).each(function(thread) {
							funcs.push(function (callback) {
								User.findOne({id: thread.idAuthor}, function (err, author) {
									thread.author = author;
									callback(err)
								})
							})
						})
						// Recherche des auteurs en parallèle
						async.parallel(funcs, function (err) {
							callback(err, threads)
						})
					}], function (err) {
					callback(err, threads)
				})
			}
		], 
		function (err, threads) {
			res.end(JSON.stringify(threads))
		})
	},

	thread: function (req,res) { 
		async.waterfall(
			[
				function getThread(callback) {
					Thread.findOne({id: req.params.id}).done(function (err, thread) {
						if (!thread) err = true;
						callback(err, thread)
					})
				}, 
				function getMessages(thread, callback) {
					Message.find({idThread: req.params.id}).done(function (err, messages) {
						thread.messages = messages
						callback(err, thread)
					})
				}, 
				function getAuthors(thread, callback) {
					var funcs = []
					_(thread.messages).each(function(message) {
						funcs.push(function (callback) {
							User.findOne({id: message.idAuthor}, function (err, author) {
								message.author = author
								callback()
							})
						})
					})
					// Recherche des auteurs en parallèle
					async.parallel(funcs, function (err) {
						callback(err, thread)
					})
				}
			], 
			function (err, thread) {
				if (err) 	res.end('No thread')
				else			res.end(JSON.stringify(thread))
			}
		)
	},

	insert: function(req, res) {
		var values = filter.keys(req.body, authKeys)
		values.idAuthor = 1

		Thread.create(values).done(function (err, thread) {
			res.end(JSON.stringify(thread))
		})
	},

	delete: function(req, res) {
		var idThread = req.params.id
		Message.destroy({idThread:idThread}, function () {})
		Thread.destroy({id: idThread}, function (err) {
			res.end('ok')
		})
	}

}; 

module.exports = ThreadsController;