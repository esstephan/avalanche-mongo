//server side routing

// set up ========================

var express = require('express');

// logging middleware, don't need to invoke explicitly
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var path = require('path');

// fake user data for testing
var fake = require('./fake.js');
var users = require('./controllers/userController.js')

// create app object and tell it to use some middleware
var app = express();
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.json());

// create route responses
app.post('/signup', users.createUser);
app.get('/matches', users.findMatches);


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


