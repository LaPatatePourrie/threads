define(['angular', 'services', 'underscore', 'utils-form'], function (angular, services, _, Form) {
	'use strict';

	var appControllers = angular.module('threads.controllers', ['threads.services'])

	var controllers = ['threads', 'thread', 'users']

	_(controllers).each(function (ctrl) {
		appControllers.controller(ctrl, ['$scope', '$injector', function ($scope, $injector) {

			// Common methods
			$scope.sortBy = function (elems, field) {
				$scope.sort.field.id = field
				$scope.sort.desc = !$scope.sort.desc

				elems.sortByField($scope.sort.field.id, $scope.sort.desc);
			}

			$scope.rootPath = 'src'

			$scope.errorStatus = function (error) {
				$scope.status.error = error
			}


			$scope.clone = function (srcInstance) {
				if(typeof(srcInstance) != 'object' || srcInstance == null) return srcInstance;
				var newInstance = srcInstance.constructor();
				for(var i in srcInstance) newInstance[i] = this.clone(srcInstance[i]);
				return newInstance;
			}

			// Specific controllers
			require(['controllers/'+ctrl+'Ctrl'], function(controller) {
				$injector.invoke(controller, this, {'$scope': $scope});
			});
		}])
	});

	return appControllers;
});