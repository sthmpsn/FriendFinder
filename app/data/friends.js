require("dotenv").config();     
const keys = require("../../keys");
const mysql = require("mysql");

// Store all the friends as objects from MySQL
var friendsArr = [];

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
var getFriends = function (){
    friendsArr = [];   // Clear the friendsArr to ensure only "fresh" data from DB is loaded
    connection.query("SELECT * FROM friends", function(err, result){
        if(err) throw(err);
        for (var i=0; i < result.length; i++){
            friendsArr.push(
                {
                    name: result[i].name,
                    photo: result[i].photo,
                    scores: [
                        result[i].q1,
                        result[i].q2,
                        result[i].q3,
                        result[i].q4,
                        result[i].q5,
                        result[i].q6,
                        result[i].q7,
                        result[i].q8,
                        result[i].q9,
                        result[i].q10,
                    ]
                }
            )
        }
    });
}

getFriends();   // initialize the friendsArr with mySql items


// Export the friends array containing the DB data to be used in the api Routes
// Export the db connection to be used for the api Push route
// Export the getFriends function
module.exports.connection = connection;
module.exports.friendsArr = friendsArr;
module.exports.getFriends = getFriends;

