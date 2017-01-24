// set up ========================

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

// configuration =================

mongoose.connect('mongodb://pf_admin:phone4friend@ds057176.mlab.com:57176/phone-friend_users');

// require('./config/middleware.js')(app, express);
// require('./config/routes.js')(app, express);
app.use(express.static(__dirname + '/client'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.json());

// listen (start app with node server.js) =========
var port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log("App is running on port" + port);
});

app.get('/', function(req, res){
  res.redirect('/index.html');
});
// export =====

module.exports = app;





