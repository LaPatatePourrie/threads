define(['backbone', 'api', 'utils-form'], function(Backbone, api, Form) {
	return ['$scope', '$routeParams', '$timeout', function($scope, $routeParams, $timeout) {
		if ($routeParams.id) {
			displayOneUser($routeParams.id)
		}
		else {
			displayUsers()
		}


		$scope.forms = {
			register: new Form().init({
				order: ['login', 'firstname', 'lastname', 'password'],
				data: {
					login: {
						label: 'Login',
						type: 'input',
						valid: ['notEmpty']
					},
					firstname: {
						label: 'First name',
						type: 'input',
						valid: ['notEmpty']
					},
					lastname: {
						label: 'Last name',
						type: 'input',
						valid: ['notEmpty']
					},
					password: {
						label: 'Password',
						type: 'input',
						valid: ['notEmpty']
					}
				}
			}),
			signin: new Form().init({
				order: ['login', 'password'],
				data: {
					login: {
						label: 'Login',
						type: 'input',
						valid: ['notEmpty']
					},
					password: {
						label: 'Password',
						type: 'input',
						valid: ['notEmpty']
					}
				}
			})
		}

		$scope.sorts = [
			{id:'id', label:'Id'},
			{id:'name', label:'Nom'}
		]
		$scope.sort = {
			field: $scope.sorts[0],
			desc: false
		}


		function displayOneUser(idUser) {
			$scope.user = User.findOrCreate({id: idUser})

			$scope.threads = new Threads()
			$scope.threads.url = api.url(idUser).threadsByAuthor

			$scope.messages = new Messages()
			$scope.messages.url = api.url(idUser).messagesByAuthor


			$scope.user.fetch({
				success: function () {
					$scope.$apply()
				}
			})
			$scope.threads.fetch({
				success: function () {
					$scope.$apply()
				}
			})
			$scope.messages.fetch({
				success: function () {
					$scope.$apply()
				}
			})
		}

		function displayUsers() {
			$scope.users = new Users();
			
			$scope.users.fetch({
		    success: function() {
          $scope.$apply();
     		}
			});
		}


		$scope.register = function() {
			$scope.action = 'register'
			$scope.forms.register.reset()
			
			$scope.forms.register.callbacks.submit = function () {
				var user = new User($scope.forms.register.toJSON())
				user.url = api.url().users

				user.save('','', {
					success: function (res) {
						$scope.action = ''
						displayUsers()
					},
					error: function (err) { console.log(err) }
				})
			}
		}
		$scope.signin = function() {
			$scope.action = 'signin'
			$scope.forms.signin.reset()
			$scope.forms.signin.callbacks.submit = function () {
				var user = new User($scope.forms.signin.toJSON())
				user.signin({
					success: function (res) {
						console.log(res)
						alert('ok')
					},
					error: function () {
						alert('not ok')
					}
				})
			}
		}
		$scope.deleteUser = function(idUser) {
			var user = User.findOrCreate({id: idUser});
			user.destroy()
		}
	}];
});