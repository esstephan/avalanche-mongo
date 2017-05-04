var User = require ('../models/User.js');
var Time = require ('../models/Time.js');
//ooooo

module.exports = {

  createUser : function(req, res) {
    console.log('req.body is', req.body)
    var newUser=User(req.body);

    newUser.save(req.body)
    .then(function(savedUser) {
      res.status(200).json(savedUser.name + ' created');
    })
    .catch(function(error) {
      res.end('error: ', error);
    });
  },

  findAll : function(req, res) {
    User.find{}
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(error) {
      res.end('error: ', error);
    });
  }

  // findMatches: function(req, res) {
  //   User.find({ times: { "$in" : req.body.times} })
  //   .then(function(users) {

  //   })
  // }

}