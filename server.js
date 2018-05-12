// *********************************************************************************
//   ---SERVER---
// *********************************************************************************

// *** Dependencies
// ====================================================================
var express = require('express')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var expressValidator = require('express-validator');
var path = require('path');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Requiring our models for syncing

var db = require("./models");

// Sets up the Express App
// ====================================================================

var app = express()
var PORT = process.env.PORT || 3000

// Middles wares ------------------------------------------------------

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

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

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// Routes
// =====================================================================

require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =====================================================================

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log('🌎 Server listening on: http://localhost:' + PORT);
  });
});
