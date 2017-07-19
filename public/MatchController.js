angular.module('app.match', [])
.controller('MatchController', function ($scope, $rootScope, $http) {

  $scope.getMatchedUsers = function() {
    console.log('Getting Users Who Match Your Availability');
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return $http({
      method: 'POST',
      url: '/matches',
      data: currentUser,
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    })
    .then(function(res) {
      console.log(res);
      //localStorage.setItem('matchedUser', JSON.stringify(res.data))
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

  $scope.logUserOut = function(){
    return $http({
      method: 'POST',
      url: '/logout',
    })
    .then(function(res) {
      $rootScope.loggedin = false;
      console.log("logged out", $rootScope);
    });
  };

})