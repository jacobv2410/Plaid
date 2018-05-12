// *********************************************************************************
// Routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require('../models')

// Routes
// =============================================================
module.exports = function(app) {

  // register user
  app.post("/register", function(req, res){
    //debugger
    // check if there is user exists in database or not
    


    console.log(req.body);
    db.User.create({
      username: req.body.username,
      email: req.body.email
    }).then(function(dbUser){
      //if(e) throw e;
      console.log(dbUser);
    })

  })

// Retreving data from api and adding to database
  app.post('/api/new', function(req, res) {
    console.log(req.body)
    db.New.create({
      burger_name: req.body.burger_name,
      devoured: false
    })
    res.json()
  })



}