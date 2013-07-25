define(['underscore'], function (_) {
	'use strict';

	return function (fields) {
		var	Field = function(fieldName, data) {
			var defaultStatus = 'ok';
			this.name = fieldName;
			for (var d in data) { this[d] = data[d]; }
			this.feedback = {
				status: defaultStatus,
				errors: []
			}

			this.hasError = function (error) {
				if (!error) return this.feedback.status=='error' ? true : false;
				else				return this.feedback.errors.indexOf(error)==-1 ? false : true;
			}
			this.getStatus = function () {
				return this.feedback.status;
			}
			this.resetStatus = function () {
				this.feedback.errors = []; 
				this.feedback.status = defaultStatus;
				return this;
			}
			return this;
		}

		this.callbacks = {
			submit: function () {},
			error: function () {}
		}



		// Constructor
		this.init = function (fields) {
			this.fields = {
				order: [],
				data: {}
			}
			this.feedback = {
				status: 'default',
				fields: {}
			}

			if (fields) {
				for (var f=0; f<fields.order.length; f++) {
					this.add({
						name: fields.order[f],
						data: fields.data[fields.order[f]]
					})
				}
			}
			return this;
		}

		this.add = function (field) {
			this.fields.order.push(field.name);
			this.fields.data[field.name] = new Field(field.name, field.data);
			return this;
		}

		this.hydrate = function (values) {
			var self = this;
			_(values).map(function (value, key) {
				self.fields.data[key].value = value;
			})
			return this;
		}

		this.reset = function (values) {
			var self = this;
			_(this.fields.data).map(function (value, key) {
				self.fields.data[key].value = '';
			})
			this.callbacks = {}

			return this;
		}

		this.checkout = function() {
			var flag = true;
			this.feedback.status = 'loading'
			this.feedback.error = {fields: []};

			for (var k=0; k<this.fields.order.length; k++) {
				var f = this.fields.order[k];
				var field = this.fields.data[f];
				field.resetStatus();

				if (!field.valid) field.valid = [];

				for (var i=0; i<field.valid.length; i++) {
					if (!this.validator[field.valid[i]].check(field.value)) {
						field.feedback.status = 'error';
						field.feedback.errors.push(field.valid[i])
						flag = false;
					}
				}
			}
			
			if (flag) {
				this.feedback.status = 'valid'
				this.callbacks.submit()
			}else {
				this.feedback.status = 'valid-error'
				if (this.callbacks.error) { this.callbacks.error() }
			}
		}

		this.getStatus = function () {
			for (f in this.fields.data) {
				if (this.fields.data[f].feedback.status=='error') return 'error';
			}
			return 'ok';
		}

		this.toJSON = function () {
			var res = {}
			_(this.fields.data).each(function (field) {
				res[field.name] = field.value
			})
			return res;
		}

		this.validator = {
			'notEmpty': {
				avert: 'Ce champs ne doit pas être vide',
				check: function (data) {
					return (!data || data=='') ? false : true;
				}
			},
			'email': {
				avert: 'Format email requis',
				check: function (data) {
					var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
					return (!reg.test(data) && data!='') ? false : true;
				}
			}
		}

		return this;
	}
})