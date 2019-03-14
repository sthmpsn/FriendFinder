var friends = require("../data/friends");
var connection = friends.connection;
var bestFriend = undefined;


function bffCalc(num1, num2){
    var result = Math.abs(parseInt(num1) - parseInt(num2));
    console.log(num1+ " - " +num2+ " = " +result);
    
    return result;
}

function findBff(newFriend, cb){
    // var bestFriend = undefined;
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

    connection.query("SELECT * FROM friends", function(err, result){
        if(err) {
          return res.status(500).end(); 
        }
        console.log(result);
        
        for(var i=0; i < result.length; i++){
            console.log("-------------------------------------------");
            q1 = bffCalc(result[i].q1, newFriend.q1);
            q2 = bffCalc(result[i].q2, newFriend.q2);
            q3 = bffCalc(result[i].q3, newFriend.q3);
            q4 = bffCalc(result[i].q4, newFriend.q4);
            q5 = bffCalc(result[i].q5, newFriend.q5);
            q6 = bffCalc(result[i].q6, newFriend.q6);
            q7 = bffCalc(result[i].q7, newFriend.q7);
            q8 = bffCalc(result[i].q8, newFriend.q8);
            q9 = bffCalc(result[i].q9, newFriend.q9);
            q10 = bffCalc(result[i].q10, newFriend.q10);
            totalScore = q1+q2+q3+q4+q5+q6+q7+q8+q9+q10;
            console.log(result[i].name +" scored: "+totalScore);
            console.log("===========================================");
            
            if (bestFriend === undefined){
                console.log("Default BFF: " + bestFriend)
                bestFriend = result[i];
                bffScore = totalScore;
            }
            else{
                if (totalScore < bffScore){
                    bestFriend = result[i];
                    bffScore = totalScore;
                    console.log(result[i].name +" is your new BFF!!")
                }
            }
            console.log("Your BFF is " +bestFriend.name+ " with a total score of " +bffScore);
        }
        // return bestFriend;
        cb();
    });

}




// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        connection.query("SELECT * FROM friends", function(err, results){
            if(err) {
              return res.status(500).end(); 
            }
            
            res.json(results);
        });

    });

    
    // API POST Requests (The "CREATE" part of CRUD)
    app.post("/api/friends", function(req, res) {
      
        var newFriend = req.body;
        findBff(newFriend, function(){  
            console.log("BFF Name : " +bestFriend.name);

            // Add user to the the MySQL database
            connection.query("INSERT INTO friends SET ?", newFriend, (err, results) => {
                if (err) throw err;
                console.log("Successfully inserted " +newFriend.name+ " with ID: " + results.insertId);
            });

            res.json(bestFriend);
        });
    });
}