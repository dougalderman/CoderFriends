angular.module('coderFriends').service('githubSvc', function($http, $state) {
    
    this.getCurrentUser = function() {
        return $http({
            method: 'GET',
            url: '/auth/current'
        })
        .then(function(response) {
            console.log('logged in');
            return response.data;
        })
        .catch(function(err) {
            console.log(err);
            if(err.status === 401) {
                $state.go('Login'); // Handle case where user isn't logged in.
            }
        })
    };
    
});