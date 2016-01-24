angular.module('coderFriends').service('githubSvc', function($http, $state) {
    
    this.getFollowing = function() {
        return $http({
            method: 'GET',
            url: '/api/github/following'
        })
    };
    
});