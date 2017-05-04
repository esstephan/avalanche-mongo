var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSchema = new Schema({
  time: String,
});

var Time = mongoose.model('Time', timeSchema);

// make this available to our users in our Node applications
module.exports = Time;