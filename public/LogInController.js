angular.module('app.login', [])

.controller ('LogInController', function ($scope, $rootScope, $http, $location, $q) {
  $scope.userdata = {};

  $scope.userLogin = function() {
  console.log('heading to server for login');
  $http({
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    url: '/login',
    withCredentials: true,
    data: {"username": $scope.userdata.username,
    "password": $scope.userdata.password,}
  })
  .then(function(res) {
    console.log("Welcome,", res.data.firstName);
    window.localStorage.setItem('currentUser', JSON.stringify(res.data));
  })
}

//   $scope.userLogin = function() {
//   console.log('$scope.userdata is', $scope.userdata);
//   console.log('heading to server for login');
//   var data = {$scope.userdata};
//   $http.post('/login', data)
//   .then(function successCallback (res) {
//     console.log('status is', res.data.status);
//     window.localStorage.currentUser = res.data.currentUser;
//     console.log(window.localStorage.currentUser);
//   },
//   function errorCallback(res) {
//     console.log("there was an error", res);
//   })
// }

$scope.testLogin = function() {
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser !== null) {
    console.log (currentUser.firstName, "is logged in locally");
  } else {
    console.log ("No user logged in locally");
  }
}

$scope.logUserOut = function(){
  return $http({
    method: 'POST',
    url: '/logout',
  })
  .then(function(res) {
    console.log(res.data);
    localStorage.setItem('currentUser', null);
  });
};

})