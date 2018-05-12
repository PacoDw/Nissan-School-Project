const express  = require('express');
const auth	   = require('../authUsers/authUser'); 

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
	.get('/', auth.allLogins(), (req, res) => {
		console.log("Logout--------------------------");

        req.logout();
        req.session.destroy();

        res.render('index', {auth : req.isAuthenticated()});
    })
    
module.exports = router;
