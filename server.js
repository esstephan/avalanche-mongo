// set up ========================

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var User = require('./server/users/userModel.js')
var Q = require('q');

var app = express();

// configuration =================

mongoose.connect('mongodb://pf_admin:phone4friend@ds057176.mlab.com:57176/phone-friend_users');

// require('./config/middleware.js')(app, express);
// require('./config/routes.js')(app, express);
app.use(express.static(__dirname + '/client'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.json());

//----
//make some fake users
var fake = new User;
fake.id = 1;
fake.name = "Ada";
fake.email = "ada@gmail.com";
fake.times = "7pm";

// //save fake user
fake.save(function(err){
  if (err){
    console.log("error saving test user");
    return (err);
  } else {
    console.log("user successfully saved");
  }
})

// listen (start app with node server.js) =========
var port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log("App is running on port" + port);
});

app.get('/', function(req, res){
  res.redirect('/index.html');
});

app.post('/api/users', function(req, res){
  var user = new User({ name: req.body.username, email: req.body.email, times: req.body.times });
    user.save(function (err, user) {
      if (err) {
        return console.error(err);
      } else {
        console.log ("successfully saved ", user);
        res.end(user);
    }
  });
});

var retrieveAllUsers = Q.nbind(User.find, User);

app.get('/api/users', function(req, res, next){
  retrieveAllUsers({})
  .then(function(retrieved){
    console.log("finding all users")
    res.json(retrieved);
  })
  .fail(function(error){
    res.end("error: " + error);
  });
})



//app.post('/api/users', userController.signin)



// export =====

module.exports = app;





