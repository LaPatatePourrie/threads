module.exports = function (req) {
	var session = req.session
	if (!session) session = {}

	var defaultUserStatus = 3
	var defaultActionStatus = 5

	return {
		isset: function () {
			return session ? true : false
		},
		get: function () {
			return session
		},
		isAuthenticated: function (status) {
			return session.user && session.user.autenticated
		},
		isAuthorized: function (status) {
			var userStatus = this.getUserStatus()
			var actionStatus = this.action.getStatus()

			// console.log('userStatus', userStatus)
			// console.log('actionStatus', actionStatus)

			return userStatus<=actionStatus ? true : false
		},

		action: {
			getStatus: function () {
				return req.target.status ? req.target.status : defaultActionStatus
			}
		},

		getUserStatus: function () {
			return session.user ? session.user.status : defaultUserStatus
		},
		user: {
			getStatus: function () {
				return session.user ? session.user.status : defaultUserStatus
			}
		}
	}
}