// logging middleware, don't need to invoke explicitly
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var path = require('path');

// fake user data for testing
var fake = require('./fake.js');
var userQ = require('./controllers/userController.js');
var User = require ('./models/User.js');

// create app object and tell it to use some middleware
var express = require('express');
var app = express();
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.urlencoded({extended: true}));

// authentication ================
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(session({
  secret: 'resist!',
  resave: true,
  saveUninitialized: false,
}))

// passport configuration
app.use(passport.initialize);
app.use(passport.session());

var Account = require('./models/Account');
passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// create route responses

app.get ('/login', function(req, res, next) {
  res.render('login', { user: req.user});
})
app.post('/login', passport.authenticate('local'), function (req, res, next) {
  res.redirect('/call');
})

app.post('/signup', function (req, res) {
    console.log('req.body is', req.body);
    var newUser = User(req.body);
    newUser.save()
    .then(function(savedUser) {
      res.render('matches', {savedUser.name + ' created'});
    })
    .catch(function(error) {
      res.send('error: ', error);
    });
  });

app.post('/signup2', function (req, res) {
    var newUser = User(req.body);
    newUser.times = calcTimes(req.body);
    newUser.save()
    .then(function(savedUser) {
      res.send(savedUser.name + ' created');
    })
    .catch(function(error) {
      res.send('error: ', error);
    });
  });

app.get('/matches/:name', function (req, res) {
  console.log("Request received to matches/:name", req.params.name);
  User.findOne({'username': req.params.name}, function(err, results) {
  if (err) return handleError(err);
  console.log("found a person", results);
  return results;
  });
});

app.get('/matches', function (req, res) {
  console.log("Request received to matches/");
    User.find({ times: { $in: req.body.times } })
    .then(function(matches) {
      var matchedUsers = matchInfo(matches, req.body);
      res.json(matchedUsers);
    })
    .catch(function(error) {
      res.send('error: ', error);
    });
  });

  // convert times to numbers then concatenate with day of week
var calcTimes = function(user) {
    var time1c = parseInt(user.time1.time) + parseInt(user.timezone);
    var time2c = parseInt(user.time2.time) + parseInt(user.timezone);
    var time3c = parseInt(user.time3.time) + parseInt(user.timezone);
    return [user.day1+time1c, user.day2+time2c, user.day3+time3c];
  }

var matchInfo = function(matches, user) {
  return matches.map(function(match) {
    return ({name: match.name,
      email: match.email,
      times: match.times,
      notes: match.notes,
    })
  });
}

// //save fake user
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


