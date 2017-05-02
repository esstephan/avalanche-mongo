'use strict';
module.exports = function(sequelize, DataTypes) {
  //Define the User model
  var User = sequelize.define('User', {
    //Define the data types of the user fields
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    partner_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    room: DataTypes.STRING,
    times: DataTypes.ARRAY(DataTypes.STRING),
    timezone: DataTypes.INTEGER,
  }, {
    //set the timestamps to be underscored: (created_at, updated_at)
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};