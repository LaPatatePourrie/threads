define([], function() {
	return {
		url: function(param1, param2) {
			var server = 'http://127.0.0.1:1337'
			
			return {
				signin: 								server+'/signin',
				register: 							server+'/register',

				threads: 								server+'/thread',
				thread: 								server+'/thread/'+param1,

				user: 									server+'/user/'+param1,
				users: 									server+'/user',
				
				messagesByAuthor: 			server+'/user/'+param1+'/messages',
				threadsByAuthor: 				server+'/user/'+param1+'/threads',

				updateMessage: 					server+'/message/'+param1,
				postMessage: 						server+'/message'
			}	
		}
	}
})