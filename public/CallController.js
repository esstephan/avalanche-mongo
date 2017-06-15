angular.module('app.call', [])
.controller('CallController', function ($scope, $http) {
  $scope.partner = "Ana";
  $scope.room = "exquisite-peacock";
  $scope.gotRoom = true;
  console.log("Your Room", $scope.room);
  appearin.addRoomToElementById("appear", $scope.room);

})