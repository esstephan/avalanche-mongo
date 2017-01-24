var mongoose = require('mongoose');

var JoinSchema = new mongoose.Schema({
  timeID: Number,
  userID: Number,
  matchMade: false
});

module.exports = mongoose.model('Join', JoinSchema);