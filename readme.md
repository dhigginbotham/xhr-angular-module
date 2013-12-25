##xhr
tiny wrapper for angular's `$http`, i didn't like writing the promise syntax over and over.

###usage
```html
<script type="text/javascript" src="angular.min.js"></script>
<script type="text/javascript" src="xhr-angular.js"></script>
```

----

```js
var app = angular.module('xhrDemo', ['$xhr']);

app.controller('demoCtrl', [
  '$scope', 'xhr', function ($scope, xhr) {
    $scope.model = null;

    // alternatively the first param of xhr[method] 
    // accepts the same object that $http does, 
    // i lazily need paths more
    $scope.init = function () {
      xhr.get('https://api.github.com/users/dhigginbotham', function (err, data) {
        if (err) console.log(err);
        $scope.model = data;
      });
    };
  }
]);
```

###directive
```jade
div(xhr-refresh, url="'https://api.github.com/users/dhigginbotham'", method="'get'", ng-model="response")
  pre {{response|json}}
```

----

###methods
```js
xhr.get('https://api.github.com/users/dhigginbotham', function (err, data) {
  if (err) console.log(err);
  $scope.model = data;
});

xhr.head('https://api.github.com/users/dhigginbotham', function (err, data) {
  if (err) console.log(err);
  $scope.model = data;
});

xhr.post('https://api.github.com/users/dhigginbotham', function (err, data) {
  if (err) console.log(err);
  $scope.model = data;
});

xhr.put('https://api.github.com/users/dhigginbotham', function (err, data) {
  if (err) console.log(err);
  $scope.model = data;
});

xhr.delete('https://api.github.com/users/dhigginbotham', function (err, data) {
  if (err) console.log(err);
  $scope.model = data;
});

xhr.jsonp('https://api.github.com/users/dhigginbotham', function (err, data) {
  if (err) console.log(err);
  $scope.model = data;
});
```