var Q = require('q');
var User = require ('./userModel.js');

var createUser = Q.nbind(User.create, User);

module.exports = {
newUser : function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var newUser = {
    id: 2,
    name: username,
    email: email
  };
  createUser(newUser)
  .then(function(){
    res.end("sending response");
  })
  .fail(function(error){
    res.end("error: " + error);
  });

};