require("dotenv").config();     
const keys = require("../../keys");
const mysql = require("mysql");


// Store all the User data from MySQL
var friendsArr = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: keys.dbCreds.id,
    password: keys.dbCreds.secret,
    database: "friendfinder_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("db connected as id " + connection.threadId);
});

function getFriends(){
    connection.query("SELECT * FROM friends", function(err, result){
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
    console.log(friendsArr);
}


getFriends();   // initialize the friendsArr with mySql items

// Export the friends array containing the DB data to be used in the api Routes
module.exports.connection = connection;
module.exports.friendsArr = friendsArr;
module.exports.getFriends = getFriends;