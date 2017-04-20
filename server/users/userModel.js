var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: Number,
  email: String,
  name: String,
  notes: String,
  partner: Object,
  password: String,
  room: String,
  times: Array,
  timezone: Number,
});

module.exports = mongoose.model('User', UserSchema);


