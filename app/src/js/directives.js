define(['angular', 'services'], function(angular, services) {
	'use strict';

	angular.module('threads.directives', ['threads.services'])

		.directive('form', function () {
		  return {
		    restrict: 'A',
		    replace: false,
		    templateUrl: 'src/partials/modules/form.html',
		    scope: {},

		    link: function (scope, element, attrs) {
					scope.rootPath = 'src'
		    	scope.$watch(function () {return scope.$parent.forms}, function (forms) {
		    		if (forms) {
			    		scope.form = forms[attrs.form]
		    		}
		    	})
		    }
		  }
		});

});