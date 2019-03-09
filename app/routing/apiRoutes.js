// Can Load other data that is used by these Routes here (i.e arrays that are REQUIRED?)

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    // API GET Requests  (The "READ" part of CRUD)
    // Below code handles when users "visit" a page.
    // ---------------------------------------------------------------------------
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });

    
    // API POST Requests (The "CREATE" part of CRUD)
    app.post("/api/friends", function(req, res) {
        // logic that write to your app either an array or database

    });

}