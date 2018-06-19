'use strict';

module.exports = {
	
	justSellers: function () {
		return (req, res, next) => {
			console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);


			if ( req.isAuthenticated() )
			{
				const userTypeAccount = req.session.passport.user.typeAccount;
				
				if ( userTypeAccount == 'Seller' ) 
					return next();
			
				else if ( userTypeAccount == 'OfficeManager' || userTypeAccount == 'Office Manager')
					res.redirect('/OfficeManager');

				else 
					res.redirect('/GlobalManager');
			}
			res.redirect('/login');
		}
	},

	justManagers: function () {
		return (req, res, next) => {
			console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

			console.log('TYPE ACCOUNT ' , req.session.passport.user.typeAccount)

			if ( req.isAuthenticated() )
			{
				const userTypeAccount = req.session.passport.user.typeAccount;
				
				if ( userTypeAccount == 'OfficeManager' || userTypeAccount == 'Office Manager' ) 
					return next();
			
				else if ( userTypeAccount == 'GlobalManager' || userTypeAccount == 'Global Manager')
					res.redirect('/GlobalManager');

				else 
					res.redirect('/seller');
			}
			res.redirect('/login');
		}
	},


	justGlobalManager: function () {
		return (req, res, next) => {
			console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);


			if ( req.isAuthenticated() )
			{
				const userTypeAccount = req.session.passport.user.typeAccount;
				
				if ( userTypeAccount == 'GlobalManager' || userTypeAccount == 'Global Manager' ) 
					return next();
			
				else if ( userTypeAccount == 'OfficeManager' || userTypeAccount == 'Office Manager')
					res.redirect('/OfficeManager');

				else 
					res.redirect('/seller');
			}
			res.redirect('/login');
		}
	}

}
