var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  notes: String,
  times: Object,
});

module.exports = mongoose.model('User', UserSchema);


