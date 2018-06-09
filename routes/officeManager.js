const express = require('express');
const auth	   = require('../authAccounts/authAccount'); 

const router  = express.Router();

// Office Manager Route---------------------------------------------------------------------
router

    .get('/', (req, res) => {
        res.redirect('/sellers');
    })

    // ------------------------------------------------------------------------------------
    // We need add the restrict middleware
    .get('/sellers', (req, res) => {
        console.log('-----------------------------')
        console.log('Route office manager')

        res.render('OfficeManagerApp', {
            user      : 'Paco Preciado',//req.user,
            auth      : true, //req.isAuthenticated(),
            typeUser  : 'officeManager',
            page      : 'sellers',
            titlePage : 'Testing Nissan',
            messageFlash: req.flash('info'),
        });
    })

    // ------------------------------------------------------------------------------------
    // We need add the restrict middleware
    .get('/accounts', (req, res) => {
        console.log('-----------------------------')
        console.log('Route office manager')

        res.render('OfficeManagerApp', {
            user      : 'Paco Preciado',//req.user,
            auth      : true, //req.isAuthenticated(),
            typeUser  : 'officeManager',
            page      : 'accounts',
            titlePage : 'Testing Nissan',
            messageFlash: req.flash('info'),
        });
    })

     // ------------------------------------------------------------------------------------
    // We need add the restrict middleware
    .get('/allOfficeManagers', (req, res) => {
        console.log('-----------------------------')
        console.log('Route All office manager Users')

        const db = require('../db/my_database');

        db.users.query("SELECT gm.id_global_manager, gm.name, gm.job FROM globals_managers as gm",
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

    module.exports = router;
