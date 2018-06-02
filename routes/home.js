var express = require('express');
var router = express.Router();

/* GET home page. */
router
	.get('/', (req, res) =>  {
		console.log('----------------------------------------------')
		console.log("Index Page");
		console.log(req.user);
		console.log(req.isAuthenticated());
		req.user 
		console.log('----------------------------------------------')


		res.render('Test', {
			user      : 'Paco Preciado',//req.user,
			auth      : true, //req.isAuthenticated(),
			typeUser  : 'seller',
			titlePage : 'Testing Nissan'
		});
	})

	.get('/home', (req, res) => {

		console.log('----------------------------------------------')
		console.log("Home Page");
		console.log(req.user);
		console.log(req.isAuthenticated());
		console.log('----------------------------------------------')

		res.render('Home', {
			user      : 'Paco Preciado', //req.user,
			auth      : true, //req.isAuthenticated(),
			typeUser  : 'seller',
			titlePage : 'My Home Nissan'
		});
	});

module.exports = router;

