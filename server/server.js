// set up ========================

// require app object and its routing
var app = require('./routes.js');

// require mongoose to make MongoDB database connection
var mongoose = require('mongoose');

// listen (start app with node server.js) =========
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("App is running on port" + port);
});

// connect to database =================
mongoose.connect('mongodb://pf_admin:phone4friend@ds057176.mlab.com:57176/phone-friend_users');







