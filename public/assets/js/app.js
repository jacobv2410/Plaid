//require("dotenv").config();

$(document).ready(function(){
    //console.log('hi');
    
    // var APP_PORT = process.env.APP_PORT;
    // console.log(APP_PORT);
    // var PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
    // var PLAID_SECRET = process.env.PLAID_SECRET;
    // var PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
    // var PLAID_ENV = process.env.PLAID_ENV;

    // function setup(){
    //     var handler = Plaid.create({
    //         apiVersion: 'v2',
    //         clientName: 'Plaid Walkthrough Demo',
    //         env: '<%= PLAID_ENV %>',
    //         product: ['transactions'],
    //         key: '<%= PLAID_PUBLIC_KEY %>',
    //         onSuccess: function(public_token) {
    //           $.post('/get_access_token', {
    //             public_token: public_token
    //           }, function() {
    //             $('#container').fadeOut('fast', function() {
    //               $('#intro').hide();
    //               $('#app, #steps').fadeIn('slow');
    //             });
    //           });
    //         },
    //       });
    // }



    $("#link-btn").on("click", function(){
        console.log("hello");
    })
});
