var User = require ('../models/User.js');

  // createUser = function (req, res) {
  //   console.log('req.body is', req.body);
  //   var newUser = User(req.body);
  //   newUser.save()
  //   .then(function(savedUser) {
  //     return (savedUser.name + ' created');
  //   })
  //   .catch(function(error) {
  //     return ('error: ', error);
  //   });
  // }

  // findAll = function (req, res) {
  //   User.find({})
  //   .then(function(users) {
  //     return users;
  //   })
  //   .catch(function(error) {
  //     return ('error: ', error);
  //   });
  // }

  // findMatches: function(req, res) {
  //   User.find({ times: { "$in" : req.body.times} })
  //   .then(function(users) {

  //   })
  // }