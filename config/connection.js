/*
Setup the code to connect Node to MySQL.
Export the connection.
*/
var mysql = require('mysql');
var connection;
require('dotenv').config()

// Set up mySQL
// Fixed the connection
// Please work
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
}


// Link up
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;

// put everything from the line below, including the quotations, into the parenthesis of  "connection = mysql.createConnection()""
// "mysql://k9nk1o0dl0ul630j:fk4kq6fzt3y53j3m@c584md9egjnm02sk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/mg7zf1g4lp6sq18l"