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
    .set('view engine', 'hbs');


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

// Handlebars default config-------------------------------
const hbs = require('hbs');
const fs = require('fs');

const partialsDir = __dirname + '/views';

const filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  const matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  const name = matches[1];
  const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2);
});

module.exports = app;
