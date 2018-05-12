const express = require('express');
const auth 	  = require('../authUsers/authUser');

const router  = express.Router();


// Team Route-------------------------------------------------------------------------
router
	.get('/', (req, res) => {

		res.render('team', {
			team: [
				{ name: 'Aylin' },
				{ name: 'Calleros' },
				{ name: 'Alan' },
				{ name: 'Conchita' },
				{ name: 'Paco' }
			],
			auth     : req.isAuthenticated()
		})
	});

// Authentication to pages, What are the users can acces to some page?
// function authenticationMiddleware() {
// 	return (req, res, next) => {
// 		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

// 		if (req.isAuthenticated()) 
// 			return next();
		
// 		res.redirect('/login')
// 	}
// }

module.exports = router;