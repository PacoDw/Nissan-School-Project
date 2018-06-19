const express  = require('express');
const passport = require('passport'); 

const router   = express.Router();

// Login routes
router
        .get('/', (req, res) => {
            console.log('---------------------------------------')    
            console.log('Login Get');
            
            res.render('LoginApp', { 
                messageFlash: req.flash('error') ,
                titlePage    : `Nissan Bienvenido`,

            });
        })
        
        .post('/',  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true } ), (req, res) => {

            console.log('-----------------------------------------------------')
            console.log('DESPUES LOGIN : ',  req.user);

            if (req.user.typeAccount == 'Seller')
                res.redirect('/seller');
            else if (req.user.typeAccount == 'OfficeManager' || req.user.typeAccount == 'Office Manager')
                res.redirect('/officeManager');
            else if (req.user.typeAccount == 'GlobalManager' || req.user.typeAccount == 'Global Manager' )
                res.redirect('/globalManager');
            else
                res.redirect('/login');
        })

module.exports = router;