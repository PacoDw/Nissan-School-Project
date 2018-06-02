const express  = require('express');
const passport = require('passport'); 

const router   = express.Router();

// Login routes
router
        .get('/', (req, res) => {
            console.log('---------------------------------------')    
            console.log('Login Get');
            
            res.render('LoginApp', { 
                messageFlash: req.flash('error') 
            });
        })
        
        .post('/',  passport.authenticate('local', 
            { 
                successRedirect: '/Seller',
                failureRedirect: '/login',
                failureFlash: true 
            })
        )

module.exports = router;