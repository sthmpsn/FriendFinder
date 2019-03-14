require("dotenv").config();     
const keys = require("../../keys");
const mysql = require("mysql");


// ===============================================================================
// MySql Database Connection - Verify if Heroku JawsDB first
// ===============================================================================
var connection;

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: keys.dbCreds.id,
        password: keys.dbCreds.secret,
        database: "y0fr833g2h1g1pcn"
    });
};

connection.connect(function(err) {
    if(err) throw err;
    console.log("db connected as id " + connection.threadId);
});

// ==================================================================================
// Gets the all friends from table "friends" and add to the "friendsArr" as an object
// ==================================================================================


// Export the friends array containing the DB data to be used in the api Routes
// Export the db connection to be used for the api Push route
// Export the getFriends function
module.exports.connection = connection;

