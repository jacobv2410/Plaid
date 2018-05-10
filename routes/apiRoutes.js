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

// Retreving data from api and adding to database
  app.post('/api/new', function(req, res) {
    console.log(req.body)
    db.New.create({
      burger_name: req.body.burger_name,
      devoured: false
    })
    res.json()
  })

  // app.get('/api/newBurger', function(req, res) {
  //   res.json()
  // })

}