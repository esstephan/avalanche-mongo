var express= require('express');

module.exports = function(passport) {

var routes = express.Router();

routes.post('/login', function (req, res, next) {
  console.log("Got login request from client");
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
    var token = user.generateJWT();
    console.log(token);
    res.json({
      success: true,
      message: "Token sent",
      token: token,
    })
    }) (req, res, next);
});

routes.get('/loginTest', function(req, res) {
  if (req.user) {
    res.send({ answer: "yes" });
  }
  else {
    res.send({ answer: "no" });
  }
})

routes.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/#/signup');
});

routes.post('/signup', function (req, res) {
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

routes.get('/matches/:name', function (req, res) {
  console.log("Request received to matches/:name", req.params.name);
  User.findOne({'username': req.params.name}, function(err, results) {
  if (err) return handleError(err);
  console.log("found a person", results);
  res.json(results);
  });
});

routes.post('/matches', function (req, res) {
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

}
