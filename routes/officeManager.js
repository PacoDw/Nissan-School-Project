const express = require('express');
const auth	   = require('../utils/authAccount'); 

const router  = express.Router();

// Office Manager Route---------------------------------------------------------------------
router

        .get('/', auth.justManagers(), (req, res) => {
            console.log('-----------------------------')
            console.log('Route office manager')
			
			res.render('OfficeManagerApp', {
				id_office_manager   : req.user.id_user,
				id_account   : req.user.id_account,
				user         : req.user.username, //req.user,
				auth         : true,            //req.isAuthenticated(),
				typeAccount  : req.user.typeAccount,
				page         : 'sellers',
				titlePage    : `Nissan Bienvenido ${req.user.username}`  ,
				messageFlash : req.flash('info'),
			});
        })

    	// ----------------------------------------------------------------------------------------
		// Create New OfficeManager - We need add the restrict middleware auth.justManagers(),
		.post('/addOfficeManager', (req, res) => {

			// Conection to the database
			const db = require('../db/my_database');

			console.log('Add officeManagers: ', req.body);

				// Inserting a new user withing the database
				db.users.query("CALL newOfficeManager(?, ?, ?, ?, ?, ?, ?, ?, ?)", 
					[req.body.name, req.body.lastname, req.body.phone, req.body.address, req.body.city, 
					req.body.state, req.body.postal_code, req.body.country, req.body.selected.id], 
				(err, results, fields) => {
					if (err)  {
						console.log('Error MysSQL: ', err);
						res.status(500).send({ messageFlash : 'Error Interno: Vuelva intentarlo mas tarde.' }); 
					}
					else if (results[0][0].error)
						res.status(500).send({ messageFlash : results[0][0].error });
					else
						res.status(200).send({ messageFlash : results[0][0].success });
				}
			);                    
        })

        // ----------------------------------------------------------------------------------------
		// Create New OfficeManager - We need add the restrict middleware auth.justManagers(),
		.delete('/deleteOfficeManager/:id', (req, res) => {

			console.log('Params: ', JSON.parse(req.params.id));

			// Conection to the database
			const db = require('../db/my_database');

				// Inserting a new user withing the database
				db.users.query("CALL deleteOfficeManager(?)", [req.params.id], 
				(err, results, fields) => {
					console.log('RESUTS BACKEND: ', results);
					if (err)  {
						console.log('Error MysSQL: ', err);
						res.status(400).send({ messageFlash : 'Error Interno: Vuelva intentarlo mas tarde.' }); 
					}
					else if (results[0][0].error)
						res.status(400).send({ messageFlash : results[0][0].error });
					else
						res.status(200).send({ messageFlash : results[0][0].success });
				}
			);                    
        })
        
        // Get a JSON DATA OF THE ALL SELLER WITHIN THE DATABASE
		.get('/officeManagersWithoutAccount', (req, res) => {

			const db = require('../db/my_database');

			db.users.query("SELECT s.id_office_manager, s.name, s.job FROM office_managers as s WHERE id_account = 1", 
				[], 

				(err, results, fields) => {
				
				console.log('-----------------------------')
				console.log(results);
				console.log('-----------------------------')

				res.json(results);
			});
		})
        
        .get('/AllOfficeManagers', (req, res) => {
            console.log('-----------------------------')
            console.log('Route All office manager Users')

            const db = require('../db/my_database');

            db.users.query("SELECT * FROM office_managers", [],
                (err, results, fields) => {
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
