//var http = require('http');

var app = angular.module('app', []);

app.controller('SignUpController', function SignUpController (
  $scope, $http) {
  $scope.user = {
    name: '',
    email: ''
  };
  $scope.times = [{hour:'7am'},{hour:'8am'}, {hour:'9am'}, {hour:'10am'}, {hour:'11am'}, {hour:'12pm'}];

  $scope.addUser = function(user) {
     console.log('User clicked register', $scope.user.name);
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    })
    .then(function(resp) {
      return resp;
    });
  };
});

app.controller('TestController', function TestController (
  $scope, $http) {
  console.log("TestController invoked")
  $scope.getAllUsers = function() {
     console.log('Getting All Users');
    return $http({
      method: 'GET',
      url: '/api/users',
    })
    .then(function(resp) {
      $scope.users=resp;
      console.log($scope.users.data);
    });
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

