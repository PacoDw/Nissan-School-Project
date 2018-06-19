const express  = require('express');
const auth	   = require('../utils/authAccount'); 

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router

		 // Get a JSON DATA OF THE ALL SELLER WITHIN THE DATABASE
		 .get('/allCarsFromSeller/:id', (req, res) => {

			const db = require('../db/my_database');

			console.log('REQ: ', req.params);

			db.users.query("Call allCarsFromSeller(?)",[ req.params.id ],

				(err, results, fields) => {

					console.log('ALL CARS OF-----------------------------')
					console.log(results);
					console.log('-----------------------------')

					res.json(results[0]);
				}
			)
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

module.exports = router;