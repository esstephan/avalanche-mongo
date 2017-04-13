// set up ========================

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

//create our app object and tell it to use some middleware
var app = express();
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.urlencoded());

// listen (start app with node server.js) =========
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("App is running on port" + port);
});

// HTML5 mode support
// app.all('/*', function(req, res, next) {
//     // Just send the index.html for other files to support HTML5Mode
//     res.sendFile('public/index.html', { root: process.cwd() });
// });

// connect to database =================
mongoose.connect('mongodb://pf_admin:phone4friend@ds057176.mlab.com:57176/phone-friend_users');

//----
//make some fake users
// var fake = new User;
// fake.id = 1;
// fake.name = "Ada";
// fake.email = "ada@gmail.com";
// fake.times = "7pm";

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



// export =====

module.exports = app;





