angular.module('app.signup', [])

.controller ('SignUpController', function ($scope, $http) {
  $scope.user = {
    name: '',
    email: '',
    password: '',
    notes: '',
    times: [
    {pref: 1,
      day: $scope.day1,
      time: $scope.time1+$scope.timezone,
    },
    {pref: 2,
      day: $scope.day2,
      time: $scope.time2+$scope.timezone,
    },
    {pref: 1,
      day: $scope.day3,
      time: $scope.time3+$scope.timezone,
    }
    ]
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

  $scope.addUser = function(user) {
    console.log('User clicked register', $scope.user.name);
    return $http({
      method: 'POST',
      url: '/signup',
      data: $scope.user,
    })
    .then(function(res) {
      console.log(res.data);
    });
  };

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

