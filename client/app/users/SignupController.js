angular.module('app.signup', [])

.controller ('SignupController', function ($scope, $http) {
  $scope.user = {
    name: '',
    email: '',
    password: '',
    notes: '',
    times: {},
  };

  $scope.user.times = {
    Mon8: false,
    Mon9: false,
    Mon10: false,
    Mon11: false,
    Mon12: false,
    Mon13: false,
    Mon14: false,
    Mon15: false,
    Mon16: false,
  }

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