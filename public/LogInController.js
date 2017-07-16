angular.module('app.login', [])

.controller ('LogInController', function ($scope, $http, $location) {
  var userdata;

  $scope.userLogin = function() {
  console.log('heading to server for login');
  return $http({
    method: 'POST',
    url: '/login',
    data: $scope.userdata,
  })
  .then(function(res) {
    var currentUser = {};
    currentUser.firstName = res.data.name;
    currentUser.times = res.data.times;
    currentUser.match = res.data.match;
    window.localStorage.currentUser = currentUser;
    console.log(window.localStorage);
  })
}

$scope.testLogin = function() {
  return $http({
    method: 'GET',
    url: '/loginTest',
  }).
  then(function(res) {
    console.log('answer is', res.data.answer);
  })
}

})