//var http = require('http');

var app = angular.module('app', []);

app.controller('SignUpController', function SignUpController (
  $scope) {
  $scope.user = {
    name: '',
    email: ''
  };
  $scope.times = [{hour:'7am'},{hour:'8am'}, {hour:'9am'}, {hour:'10am'}, {hour:'11am'}, {hour:'12pm'}];

  $scope.addUser = function() {
     console.log('User clicked register', user);
  };
})

// var firstrequest = $http({
//   method: 'GET',
//   url: 'https://safe-brook-85826.herokuapp.com'
// }).then(function successCallback(response) {
//     console.log("success");
//   }, function errorCallback(response) {
//     console.error(error);
//   });

