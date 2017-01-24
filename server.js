// set up ========================

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

// configuration =================

//mongoose.connect('mongodb://localhost/phone-friend');

// require('./config/middleware.js')(app, express);
// require('./config/routes.js')(app, express);

app.use(bodyParser.json());

// listen (start app with node server.js) =========
var port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log("App is running on port" + port);
});


app.get('/', function(req, res){
  res.send('hello world');
});
// export =====

module.exports = app;





