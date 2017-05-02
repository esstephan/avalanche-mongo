angular.module('app.signup', [])

.controller ('SignUpController', function ($scope, $http, $location) {
  var userToSend;

  $scope.user = {
    email: '',
    name: '',
    notes: '',
    partner_id: null,
    password: '',
    room: '',
    timezone: 0,
    time1: 0,
    time2: 0,
    time3: 0,
  };

  // times in Pacific Time Zone, from 6am to 5pm
  $scope.times = [{label: "7 am", time: 7},
  {label: "8 am", time: 8},
  {label: "9 am", time: 9},
  {label: "10 am", time: 10},
  {label: "11 am", time: 11},
  {label: "12 pm", time: 12},
  {label: "1 pm", time: 13},
  {label: "2 pm", time: 14},
  {label: "3 pm", time: 15},
  {label: "4 pm", time: 16},
  {label: "5 pm", time: 17},
  {label: "6 pm", time: 18},
  {label: "7 pm", time: 19}]
  $scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  $scope.addUser = function() {
    $scope.calcTimes();
    return $http({
      method: 'POST',
      url: '/signup',
      data: userToSend,
    })
    .then(function(res) {
      console.log(res.data);
    })
    .then(function() {
      console.log('redirecting');
      $location.url('/match');
    })
  };

  // convert times to numbers then concatenate with day of week
  $scope.calcTimes = function() {
    var time1c = parseInt($scope.user.time1.time) + parseInt($scope.timezone);
    var time2c = parseInt($scope.user.time2.time) + parseInt($scope.timezone);
    var time3c = parseInt($scope.user.time3.time) + parseInt($scope.timezone);
    var userTimes = [$scope.day1+time1c, $scope.day2+time2c, $scope.day3+time3c];
    userToSend = $scope.user;
    userToSend.times = userTimes;
  }

  $scope.getQuote = function() {
    return $http({
      method: 'GET',
      url: 'http://quotes.rest/qod.json',
    })
    .then (function(res) {
      console.log(res);
      $scope.quote = res.data.contents.quotes[0].quote;
      $scope.quoteAuthor = res.data.contents.quotes[0].author;
      $scope.quoted=true;
    })
  }
});

