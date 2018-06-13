const express  = require('express');
const bcrypt   = require('bcrypt');
const passport = require('passport'); 
const auth	   = require('../utils/authAccount'); 


const router   = express.Router();

// Register Router--------------------------------------------------------------------------------
router
        // Add auth.allLogins()
        .post('/addAccount', (req, res) => {

            console.log('Body: ', req.body);
            // Conection to the database
            const db = require('../db/my_database');

            // Encrypting the password and then save it inside the database
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) throw err;

                 // Inserting a new Account withing the database
                db.users.query("CALL newAccount(?, ?, ?, ?, ?)", 
                    [ req.body.username, req.body.email, hash, req.body.selected.typeAccount, req.body.selected.id ], 
                (err, results, fields) => {
                    if (err)  {
                        console.log('Error MysSQL: ', err);
                        res.status(500).send({ messageFlash : 'Error Interno: Vuelva intentarlo mas tarde.' }); 
                    }
                    else if (results[0][0].error)
                        res.status(500).send({ messageFlash : results[0][0].error });
                    else
                        res.status(200).send({ messageFlash : results[0][0].success });
                }); 
            });
        })

        	.delete('/deleteAccount/:id/:typeAccount',  (req, res) => {

                console.log('Params: ', req.params);
                console.log('ID:     ', req.params.id);
                console.log('Type:   ', req.params.typeAccount);
                
                // Conection to the database
                const db = require('../db/my_database');

                    /*DETENERMINAR QUE TIPO DE USUARIO ES Y SACAR SU ID YA SEA SELLER Y
                    REGRESARLO AL FROND PARA PONERLO EN EL OPTIONS */
                    db.users.query('CALL itemRemovedAccount(?, ?)', [req.params.id, req.params.typeAccount], 
                    (err, resultado, fields) => {
                        console.log('REST : ', resultado)
                        if (err)  {
                            console.log('Error MysSQL: ', err);
                        }
                        else
                        {
                            let itemRemoved = 'empty';
                            itemRemoved = resultado[0][0];

                            db.users.query("Call deleteAccount(?)", [req.params.id], 
                            (err, results, fields) => {
                                if (err)  {
                                    console.log('Error MysSQL: ', err);
                                    res.status(400).send({ messageFlash : 'Error Interno: Vuelva intentarlo mas tarde.' }); 
                                }
                                else if (results[0][0].error)
                                    res.status(400).send({ messageFlash : results[0][0].error });
                                else
                                    res.status(200).send( { messageFlash : results[0][0].success, itemRemoved } );
                            });
                        }
                    })
            })

         // ------------------------------------------------------------------------------------
        // We need add the restrict middleware
        .get('/allAccounts', (req, res) => {
		const db = require('../db/my_database');

		db.users.query("SELECT a.id_account, a.email,  a.username, a.typeAccount FROM accounts as a", 
			[], 
			(err, results, fields) => {
			
			console.log('-----------------------------')
			console.log(results);
			console.log('-----------------------------')

			res.json(results);
		});
	})


passport.serializeUser(function(account, done) {
    // console.log("SERIALIZE+++++++++++++++")
    // console.log(account);
    done(null, account);
    });
    
passport.deserializeUser(function(account, done) {
    // console.log("DESERIALIZE+++++++++++++++")
    // console.log(account);
    done(null, account);
});

module.exports = router;