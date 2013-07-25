define(['backbone', 'api', 'utils-form'], function(Backbone, api, Form) {
	return ['$scope', '$routeParams', '$timeout', function($scope, $routeParams, $timeout) {
		if ($routeParams.id) {
			displayOneThread($routeParams.id)
		}
		else {
			displayThreads()
		}
		$scope.status = {error:false}


		$scope.forms = {
			message: new Form().init({
				order: ['content'],
				data: {
					content: {
						label: 'Votre message :',
						type: 'textarea',
						valid: ['notEmpty']
					}
				}
			}),
			thread: new Form().init({
				order: ['title', 'content'],
				data: {
					title: {
						label: 'Titre :',
						type: 'input',
						detail: 'text',
						valid: ['notEmpty']
					},
					content: {
						label: 'Votre message :',
						type: 'textarea',
						valid: ['notEmpty']
					}
				}
			})
		}
		$scope.sorts = [
			{id:'id', label:'Id'},
			{id:'date', label:'Date'},
			{id:'title', label:'Title'},
			{id:'author', label:'Auteur'}
		];
		$scope.sort = {
			field: $scope.sorts[0],
			desc: false
		}


		function displayOneThread (idThread) {
			$scope.thread = Thread.findOrCreate({id: idThread});
			console.log($scope.thread)

			$scope.thread.fetch({
				success: function () {
					$scope.$apply()
				},
				error: function (model, res) {
					$scope.status.error = {auth:res.responseJSON.auth}
					$scope.$apply()
				}
			})
		}

		function displayThreads () {
			$scope.threads = new Threads();
			
			$scope.threads.fetch({
		    success: function() {
          $scope.$apply();
     		}
			});
		}


		//
		// Thread action
		//
		$scope.postThread = function() {
			$scope.action = 'postThread'

			$scope.forms.thread.reset()
			$scope.forms.thread.callbacks.submit = function () {
				var form = $scope.forms.thread;

				var thread = new Thread(form.toJSON())
				thread.url = api.url().threads

				thread.save('','', {
					success: function (res) {
						$scope.action = ''
						displayThreads()

						// Save first thread message
						var values = form.toJSON()
						values.idThread = res.get('id')

						var message = new Message(values)
						message.url = api.url().postMessage
						message.save('', '', {
							success: function (message) {
								message.set('author', Author.findOrCreate({id: message.get('idAuthor')}))
								$scope.threads.get(values.idThread).get('messages').add(message)
							}
						})
					},
					error: function (res) { console.log(err) }
				})
			}
		}
		$scope.deleteThread = function(idThread) {
			var thread = Thread.findOrCreate({id: idThread});
			thread.destroy()
		}



		//
		// Message action
		//
		$scope.postMessage = function(idMessage) {
			$scope.thread.set('status', 'postMessage')
			$scope.thread.get('messages').invoke('set', {'status': ''})
			$scope.forms.message.reset()

			$scope.forms.message.callbacks.submit = function () {
				var values = $scope.forms.message.toJSON();
				values.idThread = $scope.thread.get('id')

				var message = new Message(values)
				message.url = api.url().postMessage

				message.save('', '', {
					success: function (res) {
						$scope.thread.set('status', '')
						displayOneThread($scope.thread.get('id'))
					},
					error: function (res) { console.log(err) }
				})
			}
		}

		$scope.deleteMessage = function(idMessage) {
			$scope.thread.set('status', 'deleting')
			var message = $scope.thread.get('messages').get(idMessage)
			message.url = api.url(idMessage).updateMessage
			message.destroy({
				error: function (model, res) {
					$scope.status.error = {auth:res.responseJSON.auth}
					$scope.thread.get('messages').add(model)
					$scope.$apply()
				}
			})
		}

		$scope.updateMessage = function(idMessage, index) {
			$scope.thread.set('status', '')
			var message = $scope.thread.get('messages').get(idMessage)

			$scope.forms.message = $scope.forms.message.hydrate({content: message.get('content')})
			$scope.forms.message.callbacks = {
				submit: function () {
					message.set('status', 'updated')

					// Create Model from Form
					_($scope.forms.message.toJSON()).map(function (value, key) {
						message.set(key, value)
					})
					// Save Model
					message.url = api.url(message.get('id')).updateMessage
					message.save({
						succes: function (res) {
							console.log('Message updated')
						},
						error: function (res) {
							console.log('Error updating message', res)
						}
					});
				}
			}

			$scope.thread.get('messages').invoke('set', {'status': ''});
			message.set('status', 'update')
		}

	}];
});