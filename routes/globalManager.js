const express = require('express');
const auth	   = require('../utils/authAccount'); 

const router  = express.Router();

// Office Manager Route---------------------------------------------------------------------
router
        .get('/', auth.justGlobalManager(), (req, res) => {
            console.log('-----------------------------')
            console.log('Route Global manager')
            console.log(req.session.passport.user)

            res.render('GlobalManagerApp', {
				id_global_manager   : req.user.id_user,
				user         : req.user.username, //req.user,
				auth         : true,            //req.isAuthenticated(),
                typeAccount  : req.user.typeAccount,
                page         : 'sellers',
				titlePage    : `Nissan Bienvenido ${req.user.username}`,
				messageFlash : req.flash('info'),
			});
        })


        .get('/allGlobalManagers', (req, res) => {
            console.log('-----------------------------')
            console.log('Route All office manager Users')

            const db = require('../db/my_database');

            db.users.query("SELECT * FROM global_managers",
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


            // Get a JSON DATA OF THE ALL SELLER WITHIN THE DATABASE
            .get('/allTypeUserWithoutAccount', (req, res) => {

            const db = require('../db/my_database');

            db.users.query(`SELECT id_global_manager as id, name, lastname, job FROM  global_managers
                            WHERE id_account = 1
                            UNION
                            SELECT id_office_manager as id, name, lastname, job FROM  office_managers
                            WHERE id_account = 1
                            UNION
                            SELECT id_seller as id, name, lastname, job FROM  sellers
                            WHERE id_account = 1;`, 
                [], 
                (err, results, fields) => {
                
                let sellers       = results.filter( item => item.job == 'Seller');
                let officeManager = results.filter( item => item.job == 'Office Manager');
                let globalManager = results.filter( item => item.job == 'Global Manager');

                let datos = {
                    sellers        : sellers,
                    officeManagers : officeManager,
                    globalManagers : globalManager
                }

                res.json(datos);
            });
        })

module.exports = router;
