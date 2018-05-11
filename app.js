const express      = require('express');
const createError  = require('http-errors');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const bodyParser   = require('body-parser');

// Set the enviroment variables-----------------------------------------------------
require('dotenv').config();


const app = express();

// Authentication packages----------------------------------------------------------
const bcrypt       = require('bcrypt');
const session      = require('express-session');
const passport     = require('passport');

// Routes imports-------------------------------------------------------------------
const index        = require('./routes/index');
const register     = require('./routes/register');
const login        = require('./routes/login');
const teamRouter   = require('./routes/team');


// view engine setup----------------------------------------------------------------
app
    .set('views', `${__dirname}/views`)
    .set('view engine', 'hbs');



// Middlewares----------------------------------------------------------------------
app
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
    .use('/assets', express.static(`${__dirname}/public`)) //Setting folder public like assets to the client side

    // Initiating the session without you have logged if is in true
    .use(session({ secret: 'iovjcxzoivjewqn', resave: false, saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session());


//----------------------------------------------------------------------------------
// Handling Routes------------------------------------------------------------------
app
    .use('/', index)
    .use('/register', register)
    .use('/login', login)
    .use('/team', teamRouter);




//-----------------------------------------------------------------------------------
// catch 404 and forward to error handler--------------------------------------------
app    
    .use(function(req, res, next) {
      next(createError(404));
    })
    
  // error handler-------------------------------------------------------------------
    .use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    
  // render the error page-----------------------------------------------------------
      res.status(err.status || 500);
      res.render('error');
    });

// Handlebars default config---------------------------------------------------------
const hbs = require('hbs');
const fs = require('fs');

const partialsDir = __dirname + '/views/partials';

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
