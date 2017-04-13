angular.module('app.match', [])
.controller('MatchController', function ($scope, $http) {
  console.log("Test Match Controller invoked")
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
    $scope.getMatchedUsers = function() {
     console.log('Getting Users Who Match Your Availability');
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