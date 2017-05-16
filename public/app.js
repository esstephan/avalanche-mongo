// var http = require('http');
// var services = angular.module('app.services');
// require AppearIn for video link
var AppearIn = window.AppearIn;
var appearin = new AppearIn;


var app = angular.module('app', ['ngRoute', 'app.signup', 'app.match', 'app.signupwithform']);
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'SignUpController',
      })
      .when('/signupWithForm', {
        templateUrl: 'signupWithForm.html',
        controller: 'SignUpWithFormController',
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

