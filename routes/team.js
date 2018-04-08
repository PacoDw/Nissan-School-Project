var express = require('express');
var router = express.Router();

/* GET users listing. */
router
      .get('/', function(req, res, next) {
        
        res.render('team', {
          team: [
            {name: 'Aylin' },
            {name: 'Calleros'},
            {name: 'Alan'},
            {name: 'Conchita'},
            {name: 'Paco'}
          ]
        })
      });

module.exports = router;
