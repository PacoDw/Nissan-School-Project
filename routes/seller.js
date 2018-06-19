const express  = require('express');
const auth	   = require('../utils/authAccount'); 
const fs = require('fs');

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
		// ----------------------------------------------------------------------------------------
		// 
		.get('/', auth.justSellers(), (req, res) => {

			console.log('-----------------------------')
			console.log('Route Seller')
			console.log(req.session.passport.user);
			console.log(req.user);
			
			res.render('SellerApp', {
				id_seller    : req.user.id_user, 
				user         : req.user.username, 
				auth         : true,            
				typeAccount  : req.user.typeAccount,
				titlePage    : `Nissan Bienvenido ${req.user.username}`  ,
				messageFlash : req.flash('info'),
			});
		})

		// ----------------------------------------------------------------------------------------
		// Create New Seller - We need add the restrict middleware auth.justManagers(),
		.post('/addSeller', (req, res) => {

			// Conection to the database
			const db = require('../db/my_database');

				// Inserting a new user withing the database
				db.users.query("CALL newSeller(?, ?, ?, ?, ?, ?, ?, ?, ?)", 
					[req.body.name, req.body.lastname, req.body.phone, req.body.address, req.body.city, 
					req.body.state, req.body.postal_code, req.body.country, req.body.selected.id_office_manager || req.body.selected.id ], 
				(err, results) => {
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
		.delete('/deleteSeller/:id', (req, res) => {

			// Conection to the database
			const db = require('../db/my_database');

				db.users.query("CALL deleteSeller(?)", [req.params.id], 
				(err, results, fields) => {
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

				res.json(results);
			});
		})

		// Get a JSON DATA OF THE ALL SELLER WITHIN THE DATABASE
		.get('/sellersWithoutAccountOf/:id', (req, res) => {

			const db = require('../db/my_database');

			db.users.query(`SELECT s.id_seller, s.name, s.job 
			FROM sellers as s
			INNER JOIN office_managers as om ON om.id_office_manager = s.id_office_manager
			WHERE s.id_account = 1  AND s.id_office_manager = ?;`, [ req.params.id ], 

				(err, results, fields) => {
				
				res.json(results);
			});
		})

		.get('/allSellers', (req, res) => {
			const db = require('../db/my_database');

			db.users.query("SELECT * FROM sellers as s", 
				[], 
				(err, results, fields) => {

				res.json(results);
			});
		})

		.get('/allSellersOf/:id', (req, res) => {
			const db = require('../db/my_database');
			
			db.users.query(`SELECT * FROM sellers as s 
							WHERE s.id_office_manager = ?`, [ req.params.id ], 
				(err, results, fields) => {
			
				res.json(results);
			});
		})



module.exports = router;