// logging middleware, don't need to invoke explicitly
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var path = require('path');

// fake user data for testing
var fake = require('./fake.js');

// User schema
var userQ = require('./controllers/userController.js');
var User = require('./models/User.js');
var jwt = require('jsonwebtoken');

// create app object
var express = require('express');
var app = express();

// load static resources before session middleware
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// authentication ================
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// set a secret for JSON web token
app.set('JSONsecret', "notSoSecret");

// enable sessions before flash
app.use(session({
  secret: 'snowfall',
}));

// connect flash messages before defining local strategy
app.use(flash());

// eventually this should all live in configuration file
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user, done) {
    done(null, user);
  });

// these statements return to the app.get function via done, not to the client
  passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { errorMsg: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { errorMsg: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', function (req, res, next) {
  //first authenticate user via passport
  passport.authenticate('local',
    // removing successRedirect since success sends a webtoken and can't send JSON and redirect in the same response
    {
      failureRedirect: '/#/login',
      failureFlash: true,
      successFlash: true,
    },
    //after passport sends response, handle the info
  function(err, user, info) {
    if (err) {
      console.log("There was an error");
      req.flash('errorMsg', "This is an error");
      return next(err);
    }
    if (!user) {
      console.log(info.errorMsg);
      req.flash('errorMsg', info.errorMsg);
      return res.redirect('/#login');
    }
    console.log("Successfully logged in");
    //create JSON webtoken
    var token = jwt.sign(user, app.get('JSONsecret'), {
          expiresIn: 60*60*2 // expires in 2 hours
        });

    res.json({
      success: true,
      message: "Token sent",
      token: token,
    })
    }) (req, res, next);
});

app.get('/loginTest', function(req, res) {
  if (req.user) {
    res.send({ answer: "yes" });
  }
  else {
    res.send({ answer: "no" });
  }
})

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
      res.send(error);
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