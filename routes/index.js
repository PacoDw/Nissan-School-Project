var express = require('express');
var router = express.Router();

/* GET home page. */
router
      .get('/', function(req, res, next) {
        console.log("Authentication+++++++++++++++++++++++++++++++");
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('index', {auth : req.isAuthenticated()});
      });

module.exports = router;
