//Test data.  Will want to have this data pulled from MySql database.
// var friends = [
//     {
//         name: "Jerry",
//         photo: "https://studybreaks.com/wp-content/uploads/2018/12/sb1.jpg",
//         scores: [
//             "5",
//             "1",
//             "4",
//             "5",
//             "1",
//             "4",
//             "5",
//             "1",
//             "4",
//             "3"
//         ]
//     },
//     {
//         name: "Rick",
//         photo: "https://studybreaks.com/wp-content/uploads/2018/12/sb1.jpg",
//         scores: [
//             "5",
//             "1",
//             "4",
//             "5",
//             "1",
//             "4",
//             "5",
//             "1",
//             "4",
//             "3"
//         ]
//     },
//     {
//         name: "Morty",
//         photo: "https://studybreaks.com/wp-content/uploads/2018/12/sb1.jpg",
//         scores: [
//             "5",
//             "1",
//             "4",
//             "5",
//             "1",
//             "4",
//             "5",
//             "1",
//             "4",
//             "3"
//         ]
//     },
// ]

require("dotenv").config();     
const keys = require("../../keys.js");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: keys.dbCreds.id,
    password: keys.dbCreds.secret,
    database: "friendfinder_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
});





// Export the friends DB to be used in the api Routes
// module.exports = friends;