const mysql = require('mysql');

let myDataBase = mysql.createConnection({
    host      : process.env.DB_HOST,
    user      : process.env.DB_USER,
    password  : process.env.DB_PASS,
    database  : process.env.DB_NAME
});

myDataBase.connect();

module.exports = { users : myDataBase };