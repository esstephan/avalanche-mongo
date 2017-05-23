// logging middleware, don't need to invoke explicitly
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var path = require('path');

// fake user data for testing
var fake = require('./fake.js');
var userQ = require('./controllers/userController.js');
var User = require('./models/User.js');

// create app object
var express = require('express');
var app = express();

// load static resources before session middleware
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// authentication ================
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// eventually this should all live in configuration file
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new LocalStrategy(
function(username, password, done) {
  console.log("request to local strategy received");
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password != password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}
));

// enable sessions
app.use(session({
  secret: 'snowfall',
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// connect flash messages
app.use(flash());

// route responses
// app.use(function(req, res) {
//   if (req.session && req.session.user) {
//     User.findOne({ email: req.session.user.email }, function(err, user) {
//       if (user) {
//         req.user = user;
//         delete req.user.password; // delete the password from the session
//         req.session.user = user;  //refresh the session value
//         res.locals.user = user;
//       }
//     });
//   }
// });

app.post('/login', passport.authenticate('local'), function(req, res) {
    console.log(req.user);
    res.redirect('/#/match');
});

app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/#/signup');
});

app.post('/signup', function (req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
      if(user) {
        res.send("That username is taken");
      } else {
        var newUser = User(req.body);
        newUser.save()
        .then(function(savedUser) {
          req.login(savedUser, function(err) {
            if (err) { return next(err);}
            res.json(savedUser);
          });
        })
        .catch(function(error) {
          res.send('error: ', error);
        });
      }
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
  };

var matchInfo = function(matches, user) {
  return matches.map(function(match) {
    return ({name: match.name,
      email: match.email,
      times: match.times,
      notes: match.notes,
      id: match.id,
    })
  });
};

module.exports = app;