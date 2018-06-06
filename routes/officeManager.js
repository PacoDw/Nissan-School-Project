const express = require('express');
const auth	   = require('../authAccounts/authAccount'); 

const router  = express.Router();

// Office Manager Route---------------------------------------------------------------------
router

// ------------------------------------------------------------------------------------
    // We need add the restrict middleware
    .get('/', (req, res) => {
        console.log('-----------------------------')
        console.log('Route global manager')

        res.render('TempApp', {
            user      : 'Paco Preciado',//req.user,
            auth      : true, //req.isAuthenticated(),
            typeUser  : 'officeManager',
            titlePage : 'Testing Nissan',
            messageFlash: req.flash('info'),
        });
    })

     // ------------------------------------------------------------------------------------
    // We need add the restrict middleware
    .get('/allOfficeManagers', (req, res) => {
        console.log('-----------------------------')
        console.log('Route All global manager Users')

        const db = require('../db/my_database');

        db.users.query("SELECT gm.id_global_manager, gm.name FROM globals_managers as gm",
            [],
            (err, results, fields) => {
                console.log('ID OFFICE: ', results);
                if (err)  {
                    console.log('Error MysSQL: ', err);
                    res.status(500).send({ messageFlash : 'Error Interno: Vuelva intentarlo mas tarde.' }); 
                }
                else
                    res.status(200).send( results );
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
