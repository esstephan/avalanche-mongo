angular.module('app.signup', [])

.controller ('SignUpController', function ($scope, $http) {
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

