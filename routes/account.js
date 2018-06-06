const express  = require('express');
const bcrypt   = require('bcrypt');
const passport = require('passport'); 
const auth	   = require('../authAccounts/authAccount'); 


const router   = express.Router();

// Register Router--------------------------------------------------------------------------------
router
        // Add auth.allLogins()
        .post('/addAccount', (req, res) => {

            console.log('Body: ', req.body);
            // Conection to the database
            const db = require('../db/my_database');

            // Encrypting the password and then save it inside the database
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) throw err;

                 // Inserting a new Account withing the database
                db.users.query("CALL newAccount(?, ?, ?, ?)", 
                    [ req.body.username, req.body.email, hash, req.body.typeAccount ], 
                (err, results, fields) => {
                    if (err)  {
                        console.log('Error MysSQL: ', err);
                        res.status(500).send({ messageFlash : 'Error Interno: Vuelva intentarlo mas tarde.' }); 
                    }
                    else if (results[0][0].error)
                        res.status(500).send({ messageFlash : results[0][0].error });
                    else
                        res.status(200).send({ messageFlash : results[0][0].success });
                }); 
            });
        })

         // ------------------------------------------------------------------------------------
        // We need add the restrict middleware
        .get('/allAccounts', (req, res) => {
            console.log('-----------------------------')
            console.log('Route global manager Accounts')

            const db = require('../db/my_database');

            db.users.query("SELECT u.id_account, u.name FROM accounts as u",
                [],
                (err, results, fields) => {

                    // console.log('-----------------------------')
                    // console.log(JSON.stringify(results, undefined, 2));
                    // console.log('-----------------------------')
                    let r = JSON.stringify(results, undefined, 2);
                    // res.json(results);
                    res.render('TempApp', {
                        account      : 'Paco Preciado',//req.account,
                        auth      : true, //req.isAuthenticated(),
                        typeAccount  : 'officeManager',
                        titlePage : 'Testing Nissan',
                        messageFlash: req.flash('info'),
                        options: r,
                    });
                }
            );
        })


passport.serializeUser(function(account, done) {
    // console.log("SERIALIZE+++++++++++++++")
    // console.log(account);
    done(null, account);
    });
    
passport.deserializeUser(function(account, done) {
    // console.log("DESERIALIZE+++++++++++++++")
    // console.log(account);
    done(null, account);
});

module.exports = router;