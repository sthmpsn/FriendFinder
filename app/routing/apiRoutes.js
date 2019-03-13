var friends = require("../data/friends");

var friendsArr = friends.friendsArr;
var connection = friends.connection;
var getFriends = friends.getFriends;




function bffCalc(num1, num2){
    var result = Math.abs(parseInt(num1) - parseInt(num2));
    console.log(num1+ " - " +num2+ " = " +result);
    
    return result;
}

function findBff(newFriend){
    var bestFriend = undefined;
    var bffScore = 0;
    var q1 = 0;
    var q2 = 0;
    var q3 = 0;
    var q4 = 0;
    var q5 = 0;
    var q6 = 0;
    var q7 = 0;
    var q8 = 0;
    var q9 = 0;
    var q10 = 0;
    var totalScore = 0;


    for(var i=0; i < friendsArr.length; i++){
        console.log("-------------------------------------------");
        q1 = bffCalc(friendsArr[i].scores[0], newFriend.q1);
        q2 = bffCalc(friendsArr[i].scores[1], newFriend.q2);
        q3 = bffCalc(friendsArr[i].scores[2], newFriend.q3);
        q4 = bffCalc(friendsArr[i].scores[3], newFriend.q4);
        q5 = bffCalc(friendsArr[i].scores[4], newFriend.q5);
        q6 = bffCalc(friendsArr[i].scores[5], newFriend.q6);
        q7 = bffCalc(friendsArr[i].scores[6], newFriend.q7);
        q8 = bffCalc(friendsArr[i].scores[7], newFriend.q8);
        q9 = bffCalc(friendsArr[i].scores[8], newFriend.q9);
        q10 = bffCalc(friendsArr[i].scores[9], newFriend.q10);
        totalScore = q1+q2+q3+q4+q5+q6+q7+q8+q9+q10;
        console.log(friendsArr[i].name +" scored: "+totalScore);
        console.log("===========================================");
        
        if (bestFriend === undefined){
            console.log("Default BFF: " + bestFriend)
            bestFriend = friendsArr[i];
            bffScore = totalScore;
        }
        else{
            if (totalScore < bffScore){
                bestFriend = friendsArr[i];
                bffScore = totalScore;
                console.log(friendsArr[i].name +" is your new BFF!!")
            }
        }
        console.log("Your BFF is " +bestFriend.name+ " with a total score of " +bffScore);
    }
    return bestFriend;
    
}

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    // Use as a "middleware to refresh the Friends array after every "API" call
    // var refreshFriends = function(req, res, next){
    //     getFriends();
    //     next();
    // }

    // API GET Requests  (The "READ" part of CRUD)
    // Below code handles when users "visit" a page.
    // ---------------------------------------------------------------------------
    // app.use("/api/*",refreshFriends);


    app.get("/api/friends", function(req, res) {
        getFriends();
        res.json(friendsArr);
    });

    
    // API POST Requests (The "CREATE" part of CRUD)
    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware (app.use in server.js)
        getFriends();
        var newFriend = req.body;
        var bff = findBff(newFriend);
        console.log("BFF Name : " +bff.name);

        // Add user to the the MySQL database
        connection.query("INSERT INTO friends SET ?", newFriend, (err, results) => {
            if (err) throw err;
            console.log("Successfully inserted " +newFriend.name+ " with ID: " + results.insertId);
            friendsArr.push(newFriend);
        });
        res.json(bff);
    });

}