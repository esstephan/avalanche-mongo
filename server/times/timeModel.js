var mongoose = require('mongoose');

var TimeSchema = new mongoose.Schema({
  time: Number
});

module.exports = mongoose.model('User', UserSchema);