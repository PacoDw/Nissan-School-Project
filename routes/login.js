const express  = require('express');
const passport = require('passport'); 

const router   = express.Router();

// Login routes
router
        .get('/', (req, res) => {
            res.render('login', { message: req.flash('error') } );
        })
        
        .post('/',  passport.authenticate('local', 
            { 
                successRedirect: '/seller',
                failureRedirect: '/login',
                failureFlash: true 
            })
        )

module.exports = router;