angular.module('app.match', [])
.controller('MatchController', function ($scope, $http) {
  console.log("Test Match Controller invoked")

  $scope.getAllUsers = function() {
     console.log('Getting All Users');
    return $http({
      method: 'GET',
      url: '/api/users',
    })
    .then(function(res) {
      $scope.users=res;
      console.log($scope.users.data);
    });
  };
    $scope.getMatchedUsers = function() {
     console.log('Getting Users Who Match Your Availability');
    return $http({
      method: 'GET',
      url: '/matches',
    })
    .then(function(res) {
      console.log(res);
      $scope.users=res.data;
      console.log($scope.users);
    });
  };

  $scope.generateVideoLink = function() {
    appearin.getRandomRoomName()
    .then(function(roomName) {
      console.log(roomName);
      appearin.addRoomToElementById("appear", roomName);
      $scope.room=roomName;
      $scope.gotRoom=true;
    });

    // then update database for both parties with new room name;
  }

})