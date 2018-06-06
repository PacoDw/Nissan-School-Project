const express  = require('express');
const auth	   = require('../authAccounts/authAccount'); 

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
    // add auth.allLogins()
	.get('/', (req, res) => {
		console.log("Logout--------------------------");

        req.logout();
        req.session.destroy();

        res.render('Home', {auth : req.isAuthenticated()});
    })
    
module.exports = router;
