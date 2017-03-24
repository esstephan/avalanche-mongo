var mongoose = require('mongoose');

var TimeSchema = new mongoose.Schema({
  id: Number,
  time: Number
});

module.exports = mongoose.model('Time', TimeSchema);