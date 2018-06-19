const express      = require('express');
const createError  = require('http-errors');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
// const cons         = require('consolidate');
const flash        = require('connect-flash');

// Set the enviroment variables-----------------------------------------------------
require('dotenv').config();

const app = express();

// Authentication packages----------------------------------------------------------
const bcrypt         = require('bcrypt');
const session        = require('express-session');
const passport       = require('passport');
const MySQLStore     = require('express-mysql-session')(session);
const LocalStrategy  = require('passport-local').Strategy;


// Routes imports-------------------------------------------------------------------
const home           = require('./routes/home');
const account        = require('./routes/account');
const login          = require('./routes/login');
const logout         = require('./routes/logout'); 
const teamRouter     = require('./routes/team');
const car            = require('./routes/car');
const customer       = require('./routes/customer');
const sales          = require('./routes/sales');
const order          = require('./routes/order');
const seller         = require('./routes/seller');
const officeManager  = require('./routes/officeManager');
const globalManager  = require('./routes/globalManager');



// view engine setup----------------------------------------------------------------
app
    .set('views', `${__dirname}/views`)
    .set('view engine', 'jsx')
    .engine('jsx', require('express-react-views').createEngine( {beautify : true } ));



//----------------------------------------------------------------------------------
// Middlewares----------------------------------------------------------------------
app
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
    .use('/assets', express.static(`${__dirname}/public`)) //Setting folder public like assets to the client side

    // Initiating the session without you have logged if is in true
    .use(session({ secret: 'iovjcxzoivjewqn', store: new MySQLStore({},require('./db/my_database').users), resave: false, saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session())
    .use(flash());



// Midleware that setting true if the Account is athenticated before that passing to routes
app.use( (req, res, next) => { res.locals.isAuthenticated = req.isAuthenticated(); next(); } );


//----------------------------------------------------------------------------------
// Handling Routes------------------------------------------------------------------
app
    .use('/',              home)
    .use('/account',       account)
    .use('/login',         login)
    .use('/logout',        logout)
    .use('/team',          teamRouter)
    .use('/car',           car)
    .use('/customer',      customer)
    .use('/sales',         sales)
    .use('/order',         order)
    .use('/seller',        seller)
    .use('/officeManager', officeManager)
    .use('/globalManager', globalManager)


//----------------------------------------------------------------------------------
// Passport local strategy
passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('Login POST');

        // Conection to the database
        const db = require('./db/my_database');

        db.users.query('Call login(?)',  [ username ], (err, results) => {
            console.log('RESULTS LOGIN: ', results[0][0]);
            if ( err ) {
                return done(err);                
            }
            else if( results[0][0].id_account == undefined )
            {
                // console.log('No existe el usuario en la base de datos');
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            else
            {    
                bcrypt.compare(password, results[0][0].password, 
                    (err, response) => {
                        if (err) throw err;

                        if ( response )
                        {    
                            const account = {
                                id_account  : results[0][0].id_account,
                                username    : results[0][0].username,
                                email       : results[0][0].email,
                                typeAccount : results[0][0].typeAccount,
                                id_user     : results[0][0].id_user
                            }
                            console.log('Login in', account );
                
                            return done(null, account);
                        }
                        else
                        {
                            // console.log('The password or account is incorrect');
                            return done(null, false, { message: 'Incorrect username or password.'} );
                            return done(null, false);
                        }
                    }
                );
            }
        })
    }
));



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
      res.render('Error');
    });

module.exports = app;
