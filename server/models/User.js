var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  name: String,
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

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;