const express  = require('express');
const auth	   = require('../authUsers/authUser'); 
const fs = require('fs');

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
	.get('/', (req, res) => {
		console.log("Seller--------------------------");
		// console.log(req.user);
		// console.log(req.isAuthenticated());


		fs.readdir(`./views`, (err, files) => {
			console.log('Views--------------------------------')
		files.forEach(file => {
			console.log(file);
		});
			console.log('-------------------------------------')
		})

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
		console.log('-----------------------------')
		console.log('Post New Seller');
		console.log(req.body);
		console.log('-----------------------------')

		res.status(500).send({ messageFlash : 'Error con mysql' });

		// Conection to the database
		const db = require('../db/my_database');

			// Inserting a new user withing the database
			db.users.query("CALL newSeller(?, ?, ?, ?, ?, ?, ?, ?, ?)", 
			[req.body.name, req.body.lastname, req.body.phone, req.body.address, req.body.city, 
			req.body.state, req.body.postal_code, req.body.country, req.body.selected.id_office_manager], 

			(err, results, fields) => {
				if (err){

					console.log('Entro errror');

					res.status(200).send({ messageFlash : err });
					res.end();
					// throw err;
				} 
					

				console.log(results);
				if (results[0][0].error)
				{
					console.log('Error normal----------------------------')
					console.log(results[0][0])
					console.log('-----------------------------');
					// req.flash('info', { messageFlash: results[0][0].error } );
					// res.redirect('/Seller/NewSeller');

					res.send(200, { messageFlash : results[0][0].error });
				}
				else
				{
					console.log('True-----------------------------')
					// console.log(results[0][0])
					console.log('-----------------------------')
	
					// req.flash('info', { messageFlash: results[0][0].success } );
	
					// res.redirect('/Seller');
					res.send(200, { messageFlash : results[0][0].success });

				}
			}
		);                    
	})


	// Get a JSON DATA OF THE ALL SELLER WITHIN THE DATABASE
	.get('/Sellers.json', (req, res) => {

		const db = require('../db/my_database');

		db.users.query("SELECT s.id_seller, s.name FROM sellers as s", 
			[], 

			(err, results, fields) => {
			
			console.log('-----------------------------')
			console.log(results);
			console.log('-----------------------------')

			res.json(results);
		});

			// res.send(JSON.stringify(resusts))
	})


module.exports = router;