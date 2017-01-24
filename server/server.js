// set up ========================

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

// configuration =================


var server = http.createServer(function(request, response) {
  var body = [];
  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    response.end(body);
  });
});

mongoose.connect('mongodb://localhost/phone-friend');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.use(bodyParser.json());

// listen (start app with node server.js) =========

app.listen(8000);
console.log("App listening on port 8000");

app.get('/*', function(req, res){
  res.end("Hello");
})
// export =====

module.exports = app;





