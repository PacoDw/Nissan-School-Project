const express  = require('express');
const bcrypt   = require('bcrypt');
const passport = require('passport'); 

const router   = express.Router();

// Register Router--------------------------------------------------------------------------------
router
        .get('/', (req, res) => {
            res.render('register',{ auth : req.isAuthenticated()});
        })

        .post('/', (req, res) => {

            // Conection to the database
            const db = require('../db/my_database');

            // Encrypting the password and then save it inside the database
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) throw err;

                 // Inserting a new user withing the database
                db.users.query("CALL newUser(?, ?, ?)", 
                [req.body.username, req.body.email, hash], (err, results, fields) => {
                    if(err) throw err;

                    // console.log(results[0][0]);
                    const user = {
                        id    : results[0][0].id_user,
                        name  : results[0][0].username,
                        email : results[0][0].email  
                    }
                    // console.log(user);

                    req.login(user, (err) => {
                        if(err) throw err;

                        res.redirect('/seller');
                    });                    
                }); 
            });
        });


passport.serializeUser(function(user, done) {
    // console.log("SERIALIZE+++++++++++++++")
    // console.log(user);
    done(null, user);
    });
    
passport.deserializeUser(function(user, done) {
    // console.log("DESERIALIZE+++++++++++++++")
    // console.log(user);
    done(null, user);
});

module.exports = router;