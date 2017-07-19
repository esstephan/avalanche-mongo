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
var JsonStrategy = require('passport-json').Strategy;
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
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

// these statements return to the app.get function via done, not to the client
passport.use('login', new LocalStrategy(
  function(username, password, done) {
    console.log('username is', username);
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, flash('message', 'User Not Found'));
      }
      if (!isValidPassword(user, password)) {
        return done(null, false, flash('message', 'Wrong password'));
      };
      return done(null, user, flash('message', "success!"));
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
        newUser.email = req.body.email;
        newUser.firstName = req.body.firstname;
        newUser.lastName = req.body.lastname;
        newUser.times = calcTimes(req.body);
        newUser.timezone = req.body.timezone || 0;
        console.log('newUser is', newUser);
        newUser.save(function(err) {
          if (err) {
            console.log('Error saving user', err);
            return done(null, false);
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
  // first authenticate user via passport
  passport.authenticate('login',
    //after passport sends response, handle the info
  function(err, user, info) {
    if (err) {
      console.log("There was an error");
      return next(err);
    }
    if (!user) {
      console.log(info.errorMsg);
      return res.redirect('/#login');
    } else {
      console.log('no error');
      console.log(user);
      var currentUser = {};
      currentUser.firstName = user.firstName || "Friend";
      currentUser.times = user.times;
      currentUser.match = user.match;
      currentUser.room = user.room;
      console.log("current User is", currentUser);
      res.status(200).json(currentUser);
    }
  })(req, res, next);
});

app.post('/logout', function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    res.send("logout successful");
  });
});

app.post('/signup',
  passport.authenticate('signup'),
  function(req, res) {
    res.send(req.user);
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
  // find user with matching times that isn't requester
  // update that user with requester as match
  // find requesting user
  // update requester with match
  console.log("req.body is", req.body);
  User.findOne({'times': { $in: req.body.times } })
  .exec(function(err, match) {
    console.log("match is", match);
  })

  // console.log('currentUser is', currentUser);
  // var match = User.findOne({ times: { $in: req.body.times } });
  // var matchedUserInfo = matchInfo(match);
  // console.log("your match is", matchedUserInfo);
  // currentUser.match = match;
  // match.match = currentUser;
  // currentUser.save();
  // match.save();
  // sendResponse(200, matchedUserInfo);
});

var sendResponse = function(status, content) {
  res.status(status);
  res.json(content);
}

  // convert times to numbers then concatenate with day of week
var calcTimes = function(userdata) {
    // var times = [];
    // userdata.times.forEach(datapoint) {
    //   if(datapoint.time != null) {
    //     times.push(datapoint.time);
    //   }
    // }
    // var time1c = times[0] ? times[0] : null;
    // console.log(time1c);
    // var time2c = user.time2 ? parseInt(user.time2.time) + parseInt(user.timezone) : null;
    // var time3c = user.time3 ? parseInt(user.time3.time) + parseInt(user.timezone) : null;
    // var day1 = user.day1 ? user.day1+time1c : null;
    // var day2 = user.day2 ? user.day2+time1c : null;
    // var day3 = user.day3 ? user.day3+time1c : null;
    // return [day1, day2, day3];
    return ["Monday7", "Tuesday8", "Wednesday9"];
  };

var matchInfo = function(match) {
    return ({name: match.firstName,
      email: match.email,
      times: match.times,
      notes: match.notes,
      id: match._id,
    })
  };

module.exports = app;