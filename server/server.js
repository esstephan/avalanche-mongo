// require app object and its routing
var app = require('./routes.js');

require('../server/config/passport')// pass passport for configuration

// require db connection
var db = require('./db/db.js');

// listen (start app with node server.js) =========
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("App is running on port" + port);
});






