// *********************************************************************************
// Routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require('../models')
var apiHelper = require("./apiHelper");
var bcrypt = require('bcryptjs');


// Routes
// =============================================================
module.exports = function (app) {

  // register user
  app.post("/register", function (req, res) {

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("confirmPassword", "Passwords do not match").equals(password);
    var errors = req.validationErrors();

    if (errors) {
      res.render("registration", {
        errors: errors
      });
    } else {
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function (r) {
        // if email exists, do not create in database
        if (r) {          
          //req.flash("error_msg", "Email has been taken");
          res.render("registration", {msg: "Email has been taken. Please choose a different one"});
        } else {
          db.User.create({
            username: username,
            email: email,
            password: password
          }).then(function (dbUser, callback) {
            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(dbUser.password, salt, function (err, hash) {
                dbUser.password = hash;
                dbUser.save(callback);
              });
            });
          })

          req.flash("success_msg", "You are registered and can now login");
          res.redirect("login");
        }
      })
    }






    //debugger
    // check if there is user exists in database or not

    // if (apiHelper(req.body.email, db.User)) {
    //   console.log("exists");
    //   res.send("exists");
    // } else {
    //   console.log("not");
    //   // console.log(req.body);
    //   db.User.create({
    //     username: req.body.username,
    //     email: req.body.email
    //   }).then(function (dbUser) {
    //     //if(e) throw e;
    //     console.log(dbUser);
    //     res.json(dbUser);
    //   })
    // }



    // db.Todo.create({
    //   text: req.body.text,
    //   complete: req.body.complete
    // }).then(function(dbTodo) {
    //   // We have access to the new todo as an argument inside of the callback function
    //   res.json(dbTodo);
    // });


  })

  // Retreving data from api and adding to database
  app.post('/api/new', function (req, res) {
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