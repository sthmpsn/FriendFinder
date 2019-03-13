// Dependencies
var express = require("express");
require("dotenv").config();     


// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8000;

// Create express app instance.
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// ================================================================================

require("./app/routing/htmlRoutes")(app);    // uses a file called "apiRoutes.js" located in the <root>/routes folder. Contains HTML routes
require("./app/routing/apiRoutes")(app);     // uses a file called "apiRoutes.js" located in the <root>/routes folder. Contains API routes

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
