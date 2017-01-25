angular.module('app.services', [])

.factory('Users', function ($http) {
  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/api/users'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var addOne = function (urlLink) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    })
    .then(function(resp) {
      return resp;
    });
  };

  return {
    getAll: getAll,
    addOne: addOne
  };
})