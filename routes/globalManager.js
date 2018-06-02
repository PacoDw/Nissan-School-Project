const express = require('express');
const auth    = require('../authUsers/authUser');

const router  = express.Router();

// Office Manager Route---------------------------------------------------------------------
router
    // We need add the restrict middleware
    .get('/newUser', (req, res) => {
        console.log('-----------------------------');
        console.log(`New User from: ${__dirname}`);
        console.log('-----------------------------');

        const db = require('../db/my_database');

        db.users.query("SELECT s.id_seller, s.name FROM sellers as s",
            [],
            (err, results, fields) => {

                // console.log('-----------------------------')
                // console.log(JSON.stringify(results, undefined, 2));
                // console.log('-----------------------------')
                let opt = JSON.stringify(results, undefined, 2);
                // res.json(results);
                res.render('Test', {
                    user      : 'Paco Preciado',//req.user,
                    auth      : true, //req.isAuthenticated(),
                    typeUser  : 'officeManager',
                    titlePage : 'New User',
                    options   : opt,
                    messageFlash: req.flash('info'),
                });
            }
        );
    })

module.exports = router;
