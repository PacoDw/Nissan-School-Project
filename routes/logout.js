const express  = require('express');
const auth	   = require('../utils/authAccount'); 

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
    // add auth.allLogins()
	.get('/', (req, res) => {
		console.log("Logout--------------------------");

        req.logout();
        req.session.destroy();

        res.render('LoginApp');
    })
    
module.exports = router;
