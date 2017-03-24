//var http = require('http');

var app = angular.module('app', ['ngRoute', 'app.signup', 'app.match']);
var services = angular.module('app.services');

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/signup', {
      templateUrl: '/app/signup.html',
      controller: 'SignupController'
    })
    .when('/match', {
      templateUrl: '/app/match.html',
      controller: 'MatchController'
    })
    .otherwise({redirectTo: '/'});
});



// var firstrequest = $http({
//   method: 'GET',
//   url: 'https://safe-brook-85826.herokuapp.com'
// }).then(function successCallback(response) {
//     console.log("success");
//   }, function errorCallback(response) {
//     console.error(error);
//   });

