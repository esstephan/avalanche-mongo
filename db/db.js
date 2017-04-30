//import usename and password from hidden config file
var config = require('./db_config.js');
var admin_username = config.admin_username;
var admin_pw = config.admin_pw;

// require Sequelize to make Postgres database connection
var Sequelize = require('sequelize');

// connect to postgres db 'avalanche_db' on port
var sequelize = new Sequelize('avalanche_db', admin_username, admin_pw, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(function(connect) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });