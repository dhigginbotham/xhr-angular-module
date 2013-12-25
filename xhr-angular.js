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
    return {
      link: function (scope, element, attrs) {
        var uri;
        if (attrs.url[0] != '/' || attrs.ssl) {
          uri = 'http' + (attrs.ssl ? 's' : '') + '://';
        }
        uri += attrs.url;
        xhr[attrs.method](uri, function (err, data) {
          scope.response = data;
        });
      },
      scope: {
        url: '=',
        method: '=',
        ssl: '='
      }
    }
  }
]);