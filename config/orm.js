/*
Import (require) connection.js into orm.js
In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
selectAll()
insertOne()
updateOne()
Export the ORM object in module.exports.
*/
var connection = require('./connection.js');


function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through keys. Push key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // Add quotes to string w/ spaces
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}



var orm = {
    // Selecting all burgers from the seeds.sql file and displaying them.
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            } 
            cb(result);
            
            //console.log(tableInput + " = orm - Ln54");
            //console.log(cb + " = orm - Ln55");
            //console.log(result);
        });
    },
    // Inserting a new burger into the burgers table.
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        //console.log(queryString  + " = orm - Ln70");

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // Update the burger to be devoured
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};



module.exports = orm;