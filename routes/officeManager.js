const express = require('express');
const auth    = require('../authUsers/authUser');

const router  = express.Router();

// Office Manager Route---------------------------------------------------------------------
router

// ------------------------------------------------------------------------------------
    // We need add the restrict middleware
    .get('/', (req, res) => {
        console.log('-----------------------------')
        console.log('Route global manager')

        const db = require('../db/my_database');

        db.users.query("SELECT s.id_seller, s.name FROM sellers as s",
            [],
            (err, results, fields) => {
                if(err) throw err;

                // console.log('-----------------------------')
                // console.log(JSON.stringify(results, undefined, 2));
                // console.log('-----------------------------')
                let opc = JSON.stringify(results, undefined, 2);
                // res.json(results);
                res.render('TempApp', {
                    user      : 'Paco Preciado',//req.user,
                    auth      : true, //req.isAuthenticated(),
                    typeUser  : 'officeManager',
                    titlePage : 'Testing Nissan',
                    messageFlash: req.flash('info'),
                    sellerOptions: opc,
                });
            }
        );
    })


    // ------------------------------------------------------------------------------------
    // We need add the restrict middleware
    .get('/users', (req, res) => {
        console.log('-----------------------------')
        console.log('Route global manager Users')

        const db = require('../db/my_database');

        db.users.query("SELECT u.id_user, u.name FROM users as u",
            [],
            (err, results, fields) => {

                // console.log('-----------------------------')
                // console.log(JSON.stringify(results, undefined, 2));
                // console.log('-----------------------------')
                let r = JSON.stringify(results, undefined, 2);
                // res.json(results);
                res.render('TempApp', {
                    user      : 'Paco Preciado',//req.user,
                    auth      : true, //req.isAuthenticated(),
                    typeUser  : 'officeManager',
                    titlePage : 'Testing Nissan',
                    messageFlash: req.flash('info'),
                    options: r,
                });
            }
        );
    })

    // ------------------------------------------------------------------------------------
    // Returns all the sellers 
    .get('/sellers', auth.justManagers(), (req, res) => {
        console.log('-----------------------------')
        console.log('Route global manager Sellers')

        const db = require('../db/my_database');

        db.users.query("SELECT s.id_seller, s.name FROM sellers as s",
            [],
            (err, results, fields) => {

                // console.log('-----------------------------')
                // console.log(JSON.stringify(results, undefined, 2));
                // console.log('-----------------------------')
                let r = JSON.stringify(results, undefined, 2);
                // res.json(results);
                res.render('Test', {
                    user      : 'Paco Preciado',//req.user,
                    auth      : true, //req.isAuthenticated(),
                    typeUser  : 'officeManager',
                    titlePage : 'Testing Nissan',
                    messageFlash: req.flash('info'),
                    options: r,
                });
            }
        );
    })

    module.exports = router;
