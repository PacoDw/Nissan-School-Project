const express = require('express');
const bcrypt  = require('bcrypt'); 
const router  = express.Router();

// Register routes
router
        .get('/', (req, res) => {
            res.render('register');
        })

        .post('/', (req, res) => {

            // Conection to the database
            const db = require('../db/my_database');

            // Encrypting the password and then save it inside the database
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) throw err;

                 // Inserting a new user withing the database
                db.users.query("SELECT newUser(?, ?, ?) as msg", 
                [req.body.username, req.body.email, hash], (err, results, fields) => {
                    if(err) throw err;

                    
                    console.log(results[0].msg);
                    res.redirect('/');
                }); 
            });
        })

module.exports = router;