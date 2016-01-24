angular.module('coderFriends')
.controller('homeCtrl', function (githubSvc, $scope, $state) {
    
    githubSvc.getFollowing() 
     .then(function( response ) {
//        console.log('response', response);
        $scope.following = response.data;
    })
    .catch(function(err) {
        if (err.status === 403)
            $state.go('Base');
        console.error(err);
    }); 
    
});