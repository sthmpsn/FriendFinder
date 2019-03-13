var friends = require("../data/friends");

var friendsArr = friends.friendsArr;
var connection = friends.connection;
var getFriends = friends.getFriends;

function bffCalc(num1, num2){
    console.log(num1+ " - " +num2);
    return Math.abs(parseInt(num1)) - Math.abs(parseInt(num2));
}

function findBff(newFriend){
    var bestFriend;
    var bffScore;

    for(var i=0; i < friendsArr.length; i++){
        var q1 = bffCalc(friendsArr[i].scores[0], newFriend.q1);
        var q2 = bffCalc(friendsArr[i].scores[1], newFriend.q2);
        var q3 = bffCalc(friendsArr[i].scores[2], newFriend.q3);
        var q4 = bffCalc(friendsArr[i].scores[3], newFriend.q4);
        var q5 = bffCalc(friendsArr[i].scores[4], newFriend.q5);
        var q6 = bffCalc(friendsArr[i].scores[5], newFriend.q6);
        var q7 = bffCalc(friendsArr[i].scores[6], newFriend.q7);
        var q8 = bffCalc(friendsArr[i].scores[7], newFriend.q8);
        var q9 = bffCalc(friendsArr[i].scores[8], newFriend.q9);
        var q10 = bffCalc(friendsArr[i].scores[9], newFriend.q10);
        var totalScore = q1+q2+q3+q4+q5+q6+q7+q8+q9+q10;
        console.log(friendsArr[i].name +" scored: "+totalScore);
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

    // API GET Requests  (The "READ" part of CRUD)
    // Below code handles when users "visit" a page.
    // ---------------------------------------------------------------------------
    app.get("/api/friends", function(req, res) {
        getFriends();       //How to get this to execute after SQL is inserted to Table??? Currently will get empty data
        res.json(friendsArr);
    });

    
    // API POST Requests (The "CREATE" part of CRUD)
    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware (app.use in server.js)
        var newFriend = req.body;
        var bff;
        
        connection.query("INSERT INTO friends SET ?", newFriend, (err, res) => {
            if (err) throw err;
            console.log("Successfully inserted new friend " +newFriend.name);
            getFriends();
            bff = findBff(newFriend);
            console.log("BFF Name : " +bff.name);

        });
            res.json(newFriend);
    });

}