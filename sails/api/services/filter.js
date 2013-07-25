module.exports = {
	keys: function (values, keys) {
		var out = {}
		_(keys).each(function (key) {
			if (values[key]) 
				out[key] = values[key]
		})
		return out;
	}
}