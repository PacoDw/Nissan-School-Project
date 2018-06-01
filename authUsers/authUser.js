'use strict';

module.exports = {
	
	allLogers: function () {
		return (req, res, next) => {
			console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

			if (req.isAuthenticated()) 
				return next();
			
			res.redirect('/login');
		}
	},

	justManagers: function () {
		return (req, res, next) => {
			console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

			/**You need to use isAuthenticated */
			// if (!req.isAuthenticated()) 
			// 	res.redirect('/login');
				
				return next();
		}
	},


	justGlobalManager: function () {
		return (req, res, next) => {
			console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

			if (req.isAuthenticated()) 
			{
				
				return next();
			}
			
			res.redirect('/login');
		}
	}

}
