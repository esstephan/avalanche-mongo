var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  displayname: String,
  email: String,
  username: String,
  notes: String,
  partnerId: Number,
  password: String,
  room: String,
  timeMatch: String,
  times: [{
    type: String
  }],
  timezone: Number,
});

User.plugin(passportLocalMongoose);

// make this available to our users in our Node applications
module.exports = mongoose.model('User', User);
