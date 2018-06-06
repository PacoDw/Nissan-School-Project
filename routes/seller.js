const express  = require('express');
const auth	   = require('../authAccounts/authAccount'); 
const fs = require('fs');

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
	.get('/', (req, res) => {
		console.log("Seller--------------------------");
		// console.log(req.user);
		// console.log(req.isAuthenticated());

		const db = require('../db/my_database');

		db.users.query("SELECT s.id_seller, s.name FROM sellers as s", 
			[], 
			(err, results, fields) => {
			
			console.log('-----------------------------')
			// console.log(JSON.stringify(results, undefined, 2));
			console.log('-----------------------------')
			let r = JSON.stringify(results, undefined, 2);
			// res.json(results)

			res.render('Seller', {
				titlePage     : 'Seller', 
				username      : 'Nissan', // req.user.name ||,
				auth          : req.isAuthenticated(),
				messageFlash  : req.flash('info'),
				options       : r
			});

		});
	})

	// ----------------------------------------------------------------------------------------
	// My Dashboard 
	.get('/myDashboard', (req, res) => {

		res.render('Test', {
			user      : 'Paco Preciado', // req.user,
			auth      : true,//req.isAuthenticated(),
			titlePage : 'My Dashboard Nissan'
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
					res.status(400).send({ messageFlash : 'Error Interno: Vuelva intentarlo mas tarde.' }); 
				}
				else if (results[0][0].error)
					res.status(400).send({ messageFlash : results[0][0].error });
				else
					res.status(200).send({ messageFlash : results[0][0].success });
			}
		);                    
	})

	// ----------------------------------------------------------------------------------------
	// Create New Seller - We need add the restrict middleware auth.justManagers(),
	.delete('/deleteSeller/:id',  (req, res) => {

		console.log('Paramas: ', req.params.id);

		// Conection to the database
		const db = require('../db/my_database');

			// Inserting a new user withing the database
			db.users.query("Call deleteSeller(?)", [req.params.id], 
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
	.get('/SellersWithoutAccount', (req, res) => {

		const db = require('../db/my_database');

		db.users.query("SELECT s.id_seller, s.name FROM sellers as s WHERE id_account = 1", 
			[], 

			(err, results, fields) => {
			
			console.log('-----------------------------')
			console.log(results);
			console.log('-----------------------------')

			res.json(results);
		});
	})

	.get('/allSellers', (req, res) => {
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