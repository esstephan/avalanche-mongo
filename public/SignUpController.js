angular.module('app.signup', ['app.match'])

.controller ('SignUpController', function ($scope, $rootScope, $http, $location) {
  // $scope.formData = {
  //   firstName: undefined,
  //   lastName: undefined,
  //   email: undefined,
  //   username: undefined,
  //   notes: undefined,
  //   partnerId: undefined,
  //   password: undefined,
  //   room: undefined,
  //   timeMatch: undefined,
  //   times: undefined,
  //   timezone: undefined,
  // };

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
  $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  $scope.sendSignup = function() {
    return $http({
      method: 'POST',
      url: '/signup',
      headers: {
        "Content-Type": "application/json"
      },
      data: $scope.formData,
    })
  .then(function(res) {
    console.log('times are', res.data.times);
      console.log("Signed up ", res.data.firstName);
      localStorage.setItem('currentUser', JSON.stringify(res.data));
    })
  }

  $scope.logUserOut = function(){
    console.log("logout button pressed");
    return $http({
      method: 'POST',
      url: '/logout',
    })
    .then(function(res) {
      window.localStorage.setItem('currentUser', null);
      console.log("logged out");
    });
  };

});

