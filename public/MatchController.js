angular.module('app.match', [])
.controller('MatchController', function ($scope, $http) {
  $scope.user = {
    matches: [],
    loggedIn: false,
  }

  $scope.testLogin = function() {
    console.log('Are you logged in');
    return $http({
      method: 'GET',
      url: '/loginTest',
    })
    .then(function(res) {
      $scope.loggedIn=res.data;
      console.log(res);
      console.log($scope.loggedIn);
    });
  };

  $scope.getMatchedUsers = function() {
    console.log('Getting Users Who Match Your Availability');
    return $http({
      method: 'POST',
      url: '/matches',
      data: $scope.user,
    })
    .then(function(res) {
      console.log(res);
      $scope.users=res.data;
      console.log($scope.users);
    });
  };

  $scope.getUserByName = function() {
    console.log('Getting Users With That Name');
    return $http({
      method: 'GET',
      url: '/matches/'+$scope.user.name,
      name: $scope.user.name,
    })
    .then(function(res) {
      console.log("response is", res.data);
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