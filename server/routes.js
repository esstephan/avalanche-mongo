//server side routing

// set up ========================

var express = require('express');
// logging middleware, don't need to invoke explicitly
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var path = require('path');
// fake user data for testing
var fake = require('./fake.js');
var User = require('./users/userModel.js')

// database connection
var db = require('../db/db.js');

// create our app object and tell it to use some middleware
var app = express();
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.json());

// create dummy route responses
app.post('/signup', function(req, res) {
  var newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    times: req.body.times,
    timezone: req.body.timezone,
    partner: req.body.partner,
  });
  newUser.save (
    function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send("Created user " + req.body.name);
      }
    })
});

app.get('/matches', function (req, res) {
  var currUserId = req.body._id || 0;
  query = User.find( { "_id" : { $ne: currUserId } } );
  User.find(function(err, users) {
    if (err) return console.error(err);
    console.log("sending all users");
    res.send(users);
  });
});

var findMatch = function(user) {
  var match = false;
  while (match === false);
  for (var i=0; i < user.times.length; i++) {
    User.findOne( {})
  }
}

// // //save fake user
// fake.save(function(err){
//   if (err){
//     console.log("error saving test user");
//     return (err);
//   } else {
//     console.log("user successfully saved");
//   }
// })


// app.post('/api/users', function(req, res){
//   var user = new User({ name: req.body.username, email: req.body.email, times: req.body.times });
//     user.save(function (err, user) {
//       if (err) {
//         return console.error(err);
//       } else {
//         console.log ("successfully saved ", user);
//         res.end(user);
//     }
//   });
// });

// var retrieveAllUsers = Q.nbind(User.find, User);

// app.get('/api/users', function(req, res, next){
//   retrieveAllUsers({})
//   .then(function(retrieved){
//     console.log("finding all users")
//     res.json(retrieved);
//   })
//   .fail(function(error){
//     res.end("error: " + error);
//   });
// })



//app.post('/api/users', userController.signin)

// Node.js export - make the app available to other files when 'required' =====

module.exports = app;


