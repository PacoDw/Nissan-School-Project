const express  = require('express');
const auth	   = require('../authAccounts/authAccount'); 

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
	.get('/', auth.allLogins(), (req, res) => {
		
	})

module.exports = router;