define([
	'backbone',
	'angular',
	'filters',
	'services',
	'directives',
	'controllers'
	], function (Backbone, angular, filters, services, directives, controllers) {
		'use strict';

		return angular.module('threads', ['threads.controllers', 'threads.filters', 'threads.services', 'threads.directives']);
});
