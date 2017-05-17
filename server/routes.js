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
app.use(bodyParser.json());

// authentication ================
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Express
app.use(session({
  secret: 'snowfall',
  resave: true,
  saveUninitialized: false,
}))

// connect flash messages
app.use(flash());

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {return done(err); }
    if (!user) {
      return done(null, false, { message: "Username does not exist"});
    }
    if (user.password != password) {
      return done(null, false, { message: "Incorrect password"});
    }
    return done (null, user, {message: "User logged in"});
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// route responses
// app.post('/login', passport.authenticate('local'), function (req, res, next) {
//   res.send("user logged in");
// })

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(401).end('no such user'); }

    //If you use session, skip if you dont
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).end('user authenticated' + user.username); //That, or hand them a session id or a JWT Token
    });
  })(req, res, next);
});

app.post('/signup', function (req, res) {
    var newUser = User(req.body);
    newUser.save()
    .then(function(savedUser) {
      res.send(savedUser.username + ' created');
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
  res.json(results);
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
    var time1c = user.time1 ? parseInt(user.time1.time) + parseInt(user.timezone) : null;
    var time2c = user.time2 ? parseInt(user.time2.time) + parseInt(user.timezone) : null;
    var time3c = user.time3 ? parseInt(user.time3.time) + parseInt(user.timezone) : null;
    var day1 = user.day1 ? user.day1+time1c : null;
    var day2 = user.day2 ? user.day2+time1c : null;
    var day3 = user.day3 ? user.day3+time1c : null;
    return [day1, day2, day3];
  }

var matchInfo = function(matches, user) {
  return matches.map(function(match) {
    return ({name: match.name,
      email: match.email,
      times: match.times,
      notes: match.notes,
      id: match.id,
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


