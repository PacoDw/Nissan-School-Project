const express  = require('express');
const auth	   = require('../authUsers/authUser'); 

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
	.get('/', auth.allLogins(), (req, res) => {
		console.log("Seller--------------------------");
		console.log(req.user);

		console.log(req.isAuthenticated());
		res.render('seller', {
			title    : 'Seller', 
			username : req.user.name,
			auth     : req.isAuthenticated()
		});
	})

// Authentication to pages, What are the users can acces to some page?
// function userAuth() {
// 	return (req, res, next) => {
// 		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

// 		if (req.isAuthenticated()) 
// 			return next();
		
// 		res.redirect('/login')
// 	}
// }

module.exports = router;