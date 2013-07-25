var crypto = require('crypto');

module.exports = {

	attributes: {
		id: 'int',
		firstname: {
			type: 'string'
		},
		lastname: {
			type: 'string'
		},
		login: {
			type: 'string',
      required: true
		},
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    status: {
      type: 'int',
      maxLength: 1,
      required: true,
      defaultsTo: 5
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
	},


  // Lifecycle Callbacks
  beforeCreate: function(values, next) {
  	console.log('beforeCreate')
		var hash = crypto.createHash('md5').update(values.password).digest("hex");
    values.password = hash;
    next();
  }
};