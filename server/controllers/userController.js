var models = require ('../models');

module.exports = {
  createUser : function(req, res) {
    console.log('req.body is', req.body)
    models.User.create(req.body)
    .then(function(newUser){
      res.status(200).json(newUser.name + " created");
    })
    .catch(function(error){
      res.end("error: " + error);
    });

  }.

  findMatch : function(req, res) {
    models.User.find({
      where: {

      }
    })
  }
}