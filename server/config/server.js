var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var routes = require ('./server/routes.js');
var mongoose = require('mongoose');

//define app using express
var app = express();

//tell app to serve client files on initial get request
app.use(express.static(path.join(__dirname + '/client')));

//define which elements of bodyParser to use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//create a Node server
var server = app.listen(8000, function() {
  console.log('listening on port 8000');
});

//call the routes function passing in app
routes(app, express);

//connect to local MongoDB
mongoose.connect('mongodb://localhost/avalanche');

//call the connection db
var db = mongoose.connection;

//confirm that database is loaded
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('database connection successful');
});

//make app available to other modules
module.exports = app;