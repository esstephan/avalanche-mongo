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
    console.log("response received");
  })
}

})