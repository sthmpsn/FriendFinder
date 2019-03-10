var friends = require("../data/friends");

var friendsArr = friends.friendsArr;
var connection = friends.connection;
var getFriends = friends.getFriends;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    // API GET Requests  (The "READ" part of CRUD)
    // Below code handles when users "visit" a page.
    // ---------------------------------------------------------------------------
    app.get("/api/friends", function(req, res) {
        res.json(friendsArr);
    });

    
    // API POST Requests (The "CREATE" part of CRUD)
    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware (app.use in server.js)
        var newFriend = req.body;
        // friendsArr.push(newFriend);
        

        connection.query("INSERT INTO friends SET ?", newFriend, (err, res) => {
            if (err) throw err;
            console.log("Successfully inserted new Friend " +newFriend.name);
            getFriends();  //How to get this to execute after SQL is inserted to Table???
        });

        res.send("Successfully inserted new friend " + newFriend.name);

    });

}