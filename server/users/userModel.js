var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: Number,
  email: String,
  name: String
});

module.exports = mongoose.model('User', UserSchema);