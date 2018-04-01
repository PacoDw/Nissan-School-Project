const createError  = require('http-errors');
const express      = require('express');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const bodyParser   = require('body-parser');

const app = express();

// Global variables that help us to handle body parse------
const urlencodedParse = bodyParser.urlencoded({extended: false});
const jsonParse       = bodyParser.json();

const indexRouter  = require('./routes/index');
const teamRouter  = require('./routes/team');


// view engine setup---------------------------------------
app
    .set('views', `${__dirname}/views`)
    .set('view engine', 'ejs');


// Middlewares----------------------------------------------
app
    .use(logger('dev'))
    .use(cookieParser())
  //Setting folder public like assets to the client side--
    .use('assets', express.static(`${__dirname}/public`));
    

//-------------------------------------------------------
// Handling Routes---------------------------------------
app
    .use('/', indexRouter)
    .use('/team', teamRouter);



//--------------------------------------------------------
// catch 404 and forward to error handler-----------------
app    
    .use(function(req, res, next) {
      next(createError(404));
    })
    
  // error handler-----------------------------------------
    .use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    
  // render the error page---------------------------------
      res.status(err.status || 500);
      res.render('error');
    });
    
  
module.exports = app;
