var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  notes: String,
  partnerId: Number,
  password: String,
  room: String,
  timeMatch: String,
  times: [timeSchema],
  timezone: Number,
  unique: true,
});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;