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


// // npm packages
var path = require('path')
var morgan = require('morgan')
var expresshbs = require('express-handlebars')

// // new express app
var app = express()

// // middleware
app.use(morgan('dev'))
app.engine('hbs', expresshbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


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



app.get('/', function(request, response, next) {
  response.render('index', {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
  });
});

app.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      var msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + error);
      return response.json({
        error: msg
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    response.json({
      'error': false
    });
  });
});

app.get('/accounts', function(request, response, next) {
  // Retrieve high-level account information and account and routing numbers
  // for each account associated with the Item.
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      var msg = 'Unable to pull accounts from the Plaid API.';
      console.log(msg + '\n' + error);
      return response.json({
        error: msg
      });
    }

    console.log(authResponse.accounts);
    response.json({
      error: false,
      accounts: authResponse.accounts,
      numbers: authResponse.numbers,
    });
  });
});

app.post('/item', function(request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({
        error: error
      });
    }

    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
      if (err != null) {
        var msg = 'Unable to pull institution information from the Plaid API.';
        console.log(msg + '\n' + error);
        return response.json({
          error: msg
        });
      } else {
        response.json({
          item: itemResponse.item,
          institution: instRes.institution,
        });
      }
    });
  });
});

app.post('/transactions', function(request, response, next) {
  // Pull transactions for the Item for the last 30 days
  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0,
  }, function(error, transactionsResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({
        error: error
      });
    }
    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
    response.json(transactionsResponse);
  });
});

require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);


var server = app.listen(APP_PORT, function() {
  console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});
