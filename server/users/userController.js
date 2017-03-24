var Q = require('q');
var User = require ('./userModel.js');

var createUser = Q.nbind(User.create, User);

module.exports = {
newUser : function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var times = req.body.times;
  var newUser = {
    name: username,
    email: email,
    times: times,
  };
  createUser(newUser)
  .then(function(){
    res.end("sending response");
  })
  .catch(function(error){
    res.end("error: " + error);
  });

};