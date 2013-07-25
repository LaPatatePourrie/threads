define(['angular', 'app'], function(angular, app) {
	'use strict';
	
	var baseUrl = 'src/partials'
	
	return app.config(['$routeProvider', function($routeProvider) {
		
		$routeProvider.when('/threads', {
			templateUrl: baseUrl+'/threads.html',
			controller: 'threads'
		});
		
		$routeProvider.when('/threads/:id', {
			templateUrl: baseUrl+'/thread.html',
			controller: 'threads'
		});
		
		$routeProvider.when('/users', {
			templateUrl: baseUrl+'/users.html',
			controller: 'users'
		});
		
		$routeProvider.when('/users/:id', {
			templateUrl: baseUrl+'/user.html',
			controller: 'users'
		});
		
		$routeProvider.otherwise({redirectTo: '/threads'});
	}]);
	
});