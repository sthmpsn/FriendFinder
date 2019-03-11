require("dotenv").config();     
const keys = require("../../keys");
const mysql = require("mysql");
const $ = require("jquery");

// Store all the friends as objects from MySQL
var friendsArr = [];

// ===============================================================================
// MySql Database Connection
// ===============================================================================
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

// ==================================================================================
// Gets the all friends from table "friends" and add to the "friendsArr" as an object
// ==================================================================================
var getFriends = function (){
    friendsArr = [];   // Clear the friendsArr to ensure only "fresh" data from DB is loaded
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
        console.log("Friends in our DB\n",friendsArr);   // will log out the friendsArr AFTER the query loads the data
    });
}

getFriends();   // initialize the friendsArr with mySql items

// ==================================================================================
// Handle the Submit from the survey.html and post new user + survey score
//   IMPORTED A JQUERY PACKAGE BUT DO NOT THINK THIS IS THE CORRECT WAY TO GO ABOUT IT
//  ANOTHER FRONT END JS FILE WITH JQUERY IS NEEDED FOR THE BELOW CODE?
// ==================================================================================
$(".submit").on("click", function(event) {
    event.preventDefault();

    // Here we grab the form elements
    var newFriend = {
        name: $("#name").val().trim(),
        photo: $("#photo").val().trim(),
        q1: $("#q1").val().trim(),
        q2: $("#q2").val().trim(),
        q3: $("#q3").val().trim(),
        q4: $("#q4").val().trim(),
        q5: $("#q5").val().trim(),
        q6: $("#q6").val().trim(),
        q7: $("#q7").val().trim(),
        q8: $("#q8").val().trim(),
        q9: $("#q9").val().trim(),
        q10: $("#q10").val().trim()
    }
    console.log(newFriend);

    $.post("/api/friends", newFriend, function(data){
        alert(data);
 




    });
});








// Export the friends array containing the DB data to be used in the api Routes
// Export the db connection to be used for the api Push route
// Export the getFriends function
module.exports.connection = connection;
module.exports.friendsArr = friendsArr;
module.exports.getFriends = getFriends;