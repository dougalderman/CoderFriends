var app = angular.module('coderFriends');

app.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('myHttpInterceptor');
});

// register the interceptor as a service
app.factory('myHttpInterceptor', function($q, $state) {
    return {
        // optional method
        responseError: function(rejection) {
            if (rejection.status == 403) {
                $state.go('Base');
                return;
            }
            return $q.reject(rejection);
        }
    };
});