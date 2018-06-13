const express  = require('express');
const auth	   = require('../utils/authAccount'); 
const fs = require('fs');

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
		// ----------------------------------------------------------------------------------------
		// 
		.get('/Sales', (req, res) => {

			console.log('-----------------------------')
			console.log('Route Seller')

			res.render('TempApp', {
				id_user   : 2,
				user      : 'Paco Preciado', //req.user,
				auth      : true,            //req.isAuthenticated(),
				typeUser  : 'Seller',
				page      : '',
				titlePage : 'Testing Nissan',
				messageFlash: req.flash('info'),
			});
		})

















		// ----------------------------------------------------------------------------------------
		// Create New Seller - We need add the restrict middleware auth.justManagers(),
		.post('/addSeller',  (req, res) => {

			// Conection to the database
			const db = require('../db/my_database');

				// Inserting a new user withing the database
				db.users.query("CALL newSeller(?, ?, ?, ?, ?, ?, ?, ?, ?)", 
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
		// Create New Seller - We need add the restrict middleware auth.justManagers(),
		.delete('/deleteSeller/:id',  (req, res) => {

			console.log('Params: ', JSON.parse(req.params.id));

			// Conection to the database
			const db = require('../db/my_database');

				// Inserting a new user withing the database
				db.users.query("CALL deleteSeller(?)", [req.params.id], 
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
		.get('/sellersWithoutAccount', (req, res) => {

			const db = require('../db/my_database');

			db.users.query("SELECT s.id_seller, s.name, s.job FROM sellers as s WHERE id_account = 1", 
				[], 

				(err, results, fields) => {
				
				console.log('-----------------------------')
				console.log(results);
				console.log('-----------------------------')

				res.json(results);
			});
		})

		.get('/allSellers', (req, res) => {
			console.log('ENTRO A ALL SELLER')
			const db = require('../db/my_database');

			db.users.query("SELECT * FROM sellers as s", 
				[], 
				(err, results, fields) => {
				
				console.log('-----------------------------')
				console.log(results);
				console.log('-----------------------------')

				res.json(results);
			});
		})



module.exports = router;