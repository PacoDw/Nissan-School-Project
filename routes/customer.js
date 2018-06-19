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
		.post('/addCustomer',  (req, res) => {

            console.log('BODY : ', req.body);
			// Conection to the database
			const db = require('../db/my_database');

				// Inserting a new user withing the database
				db.users.query("CALL newCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?)", 
					[req.body.name, req.body.lastname, req.body.phone, req.body.address, req.body.city, 
					req.body.state, req.body.postal_code, req.body.country, req.body.id_seller], 
				(err, results, fields) => {
					if (err)  {
						console.log('Error MysSQL: ', err);
						res.status(500).send({ messageFlash : 'Error Interno: Vuelva intentarlo mas tarde.' }); 
					}
                    else if (results[0][0].error)
                    {
                        console.log('pre final')                        
						res.status(500).send({ messageFlash : results[0][0].error });
                    }
                    else
                    {
                        console.log('final');

                        db.users.query('SELECT id_customer FROM customers ORDER BY id_customer DESC LIMIT 1',[],
                        (e, r, f) => {
                            console.log('id : ', r[0].id_customer)
                            res.status(200).send({ messageFlash : results[0][0].success, id_customer : r[0].id_customer });
                        });
                    }
				}
			);                    
		})

module.exports = router;