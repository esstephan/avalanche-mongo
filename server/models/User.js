var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var User = new Schema({
  firstName: String,
  lastName: String,
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

User.methods.generateJWT = function() {
  // set expiration date for 7 days from now
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime()/1000),
    // fill in secret for production code
    }, JWT_SECRET)
}

User.plugin(passportLocalMongoose);

// make this available to our users in our Node applications
module.exports = mongoose.model('User', User);
