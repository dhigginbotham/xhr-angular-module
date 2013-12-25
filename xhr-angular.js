var app = app || angular.module('$xhr', []);
app.factory('xhr', 
  [ '$http', function ($http) {
    var xhr = {};
    var methods = ['get', 'head', 'post', 'put', 'delete', 'jsonp'];

    var internalHttpRequest = function (opts, fn) {
      var req = {method: 'get', url: null};
      if (opts) angular.extend(req, opts);
      $http(req).success(function (data, status, headers, config) {
        return fn(null, data);
      }).error(function (err) {
        if (err) return fn(err, null);
      });
    };

    methods.forEach(function (method) {
      xhr[method] = function (obj, fn) {
        var req = {method: method};
        (typeof obj != 'string') ? angular.extend(req, obj) : angular.extend(req, {url: obj});
        internalHttpRequest(req, function (err, data) {
          if (err) return fn(err, null);
          return fn(null, data);
        });
      };
    });

    return xhr;
  }
]);

app.directive('xhrRefresh',
  ['xhr', function (xhr) {

    var link = function (scope, element, attrs) {

      // console.log(scope);
      var response;

      var intGet = function (fn) {
        xhr[scope.method](scope.url, function (err, data) {
          if (err) return fn(err);
          return fn(data);
        });
      };

      intGet(function (data) {
        response = data;
        scope.response = response;
      });
    }

    return {
      link: link,
      scope: {
        url: '=',
        method: '='
      }
    }
  }
]);