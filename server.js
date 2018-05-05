// // npm packages
// var express = require('express')
// var bodyparser = require('body-parser')
// var path = require('path')
// var morgan = require('morgan')
// var expresshbs = require('express-handlebars')

// // new express app
// var app = express()

// // middleware
// app.use(morgan('dev'))
// app.engine('hbs', expresshbs({defaultLayout: 'main', extname: '.hbs'}))
// app.set('view engine', 'hbs')
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(bodyparser.urlencoded({ extended: true }))
// app.use(bodyparser.json())

// // your code here...
// app.get('/', function (req, res) {
//   res.render('index')
// })

// var PORT = process.env.PORT || 3000
// // listening port
// app.listen(PORT, function (e) {
//   if (e) throw e
// })


'use strict';
require("dotenv").config();
//var envvar = require('envvar');
var express = require('express');
var bodyparser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');
var nodemailer = require("nodemailer");


// // npm packages
var path = require('path')
var morgan = require('morgan')
var expresshbs = require('express-handlebars')

// // new express app
var app = express()

// // middleware
app.use(morgan('dev'))
app.engine('hbs', expresshbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({
  extended: true
}))
app.use(bodyparser.json())

//testing
// var APP_PORT = "8080";
// var PLAID_CLIENT_ID = '5ae4c1ebef7f2f0010f3f647';
// var PLAID_SECRET = "4b7f8fd3e90f237c76888c5783863c"
// var PLAID_PUBLIC_KEY = "8aa15e0d27e6eb00546f1ad06517f3"
// var PLAID_ENV = "development";

// var APP_PORT = envvar.number('APP_PORT', 8080);
// var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
// var PLAID_SECRET = envvar.string('PLAID_SECRET');
// var PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
// var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

var APP_PORT = process.env.APP_PORT;
var PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
var PLAID_SECRET = process.env.PLAID_SECRET;
var PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
var PLAID_ENV = process.env.PLAID_ENV;

var EMAIL_USERNAME = process.env.EMAIL_USERNAME;
var EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var GMAIL_REFRESH_TOKEN = process.env.REFRESH_TOKEN;
var GMAIL_ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

//var app = express();
//app.use(express.static('public'));
//app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(bodyParser.json());

// // your code here...
// app.get('/', function (req, res) {
//   res.render('index')
// })

// var PORT = process.env.PORT || 3000
// // listening port
// app.listen(PORT, function (e) {
//   if (e) throw e
// })

app.get("/", function (req, res) {
  //res.send("Hello world");
  res.render("./layouts/main");
})

app.post("/send", function (req, res) {
  //console.log(req.body);
  var output = `
  <p>You have a new contact request</p>
  <h3>Contact detaisl</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",    
    auth: {
      type: "OAuth2",
      user: EMAIL_USERNAME, // generated ethereal user
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
      accessToken: GMAIL_ACCESS_TOKEN      
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "'Minh Nguyen 👻' <" + EMAIL_USERNAME + ">", // sender address
    to: 'taolaobidaomail@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.render("../views/layouts/main", {msg: "Email has been sent"});
  });

});

require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);


app.listen(APP_PORT, function () {
  console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});
