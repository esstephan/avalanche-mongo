// logging middleware, don't need to invoke explicitly
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var path = require('path');

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
var bCrypt = require('bCrypt');

// User schema - require after passport
var User = require('./models/User.js');

// enable sessions before flash
app.use(session({
  secret: 'snowfall',
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect flash messages before defining local strategy
app.use(flash());

// eventually this should all live in configuration file
passport.serializeUser(function(user, done) {
    console.log("passport serializing user" + user);
    done(null, user._id);
  });
passport.deserializeUser(function(user, done) {
    done(null, user._id);
  });

// these statements return to the app.get function via done, not to the client
passport.use('login', new LocalStrategy({
  passReqToCallback: true,
},
  function(req, username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log("User not found with username" + username);
        return done(null, false, req.flash('message', 'User Not Found'));
      }
      if (!isValidPassword) {
        return done(null, false, req.flash('message', 'Wrong password'));
      }
      return done(null, user);
    });
  }
));

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.use('signup', new LocalStrategy({
  passReqToCallback: true,
  },
  function(req, username, password, done) {
    User.findOne({'username': username}, function(err, user) {
      if (err) {
        console.log("Signup Error: " + err);
        return done(err);
      }
      // user already exists
      if (user) {
        console.log('There is already a user by that name');
        return done(null, false, req.flash('message', "User already exists"));
      } else {
        //create user
        var newUser = new User();
        newUser.username = username;
        newUser.password = createHash(password);
        newUser.email = req.param('email');
        newUser.firstName = req.param('firstName');
        newUser.lastName = req.param('lastName');
        newUser.times = req.param('times');
        newUser.timezone = req.param('timezone');
        newUser.save(function(err) {
          if (err) {
            console.log('Error saving user');
          }
          console.log('User registration successful');
          return done(null, newUser);
        });
      }
    });
}));

var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

app.post('/login', function (req, res, next) {
  console.log("Got login request from client");
  //first authenticate user via passport
  passport.authenticate('login',
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
    } else {
      console.log("sending this user: " + user);
      res.send(user);
    }
  })
});

app.get('/loginTest', function(req, res) {
  console.log('req.session is', req.session);
  if (req.user) {
    res.send(true);
    console.log('req.user is' + req.user);
  }
  else {
    res.send(false);
  }
})

app.post('/logout', function(req, res) {
  req.logout();
  req.session.reset();
  res.redirect('/#/signup');
});

app.post('/signup',
  passport.authenticate('signup'),
  function(req, res) {
    res.send(req.user.username);
});

app.get('matches', function (req, res) {
  res.send("TBD");
})

app.get('/matches/:name', function (req, res) {
  console.log("Request received to matches/:name", req.params.name);
  User.findOne({'username': req.params.name}, function(err, results) {
  if (err) return handleError(err);
  console.log("found a person", results);
  res.json(results);
  });
});

app.post('/matches', function (req, res) {
  console.log("Request received to matches/");
    User.findOne({ times: { $in: req.body.times } })
    .then(function(match) {
      var matchedUserInfo = matchInfo(match);
      currentUser.match = match;
      match.match = currentUser;
      res.json(matchedUserInfo);
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

var matchInfo = function(match) {
    return ({name: match.name,
      email: match.email,
      times: match.times,
      notes: match.notes,
      id: match.id,
    })
  };

module.exports = app;