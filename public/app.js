// var http = require('http');
// var services = angular.module('app.services');
// require AppearIn for video link
var AppearIn = window.AppearIn;
var appearin = new AppearIn;


var app = angular.module('app', ['ngRoute', 'app.signup', 'app.match']);
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'SignUpController',
      })
      .when('/match', {
        templateUrl: 'match.html',
        controller: 'MatchController',
      })
      .when('/call', {
        templateUrl: 'call.html',
        controller: 'CallController',
      })
      .otherwise({redirectTo: '/'});

  }
);

