const express  = require('express');

const router   = express.Router();

// Seller Route---------------------------------------------------------------------
router
		 // Get a JSON DATA OF THE ALL SELLER WITHIN THE DATABASE
		 .post('/addOrder', (req, res) => {

			const db = require('../db/my_database');

            console.log('REQ: ', req.body);
            
			db.users.query("Call newOrder(?, ?, ?, ?)", [req.body.id_seller, req.body.id_customer, req.body.id_car, req.body.deposit],
				(err, results, fields) => {

                    console.log('ALL CARS OF-----------------------------')
                    console.log(err);
					console.log(results);
					console.log('-----------------------------')

					res.json(results);
				}
			)
        })
        

module.exports = router;
