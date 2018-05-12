// *********************************************************************************
//   ---SERVER---
// *********************************************************************************

// *** Dependencies
// ====================================================================
var express = require('express')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var path = require('path')
// var cool = require('cool-ascii-faces')

// Requiring our models for syncing

var db = require("./models");

// Sets up the Express App
// ====================================================================

var app = express()
var PORT = process.env.PORT || 3000

// Middles wares ------------------------------------------------------

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Static directory
app.use(express.static(path.join(__dirname, 'public')))
// parse application/json
app.use(bodyParser.json());

// Handlebars config --------------------------------------------------

app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
      extname: '.hbs'
  })
)
app.set('view engine', 'hbs')

// Routes
// =====================================================================

require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =====================================================================

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log('🌎 Server listening on: http://localhost:' + PORT);
  });
});
