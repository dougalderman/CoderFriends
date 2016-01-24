angular.module('coderFriends')
.controller('friendCtrl', function ($scope, $stateParams, githubSvc) {
    
    $scope.username = $stateParams.github_username;
    
    githubSvc.getActivity($scope.username)
    .then(function(response) {
//        console.log('response', response);
        $scope.activity = response.data;
        $scope.recentEvents = [];
        for (var i = 0; i < 10; i++) { // get 10 most recent events
            var event = $scope.activity[i];
            if (event) {
                var repo = event.repo.name;
                var locationOfSlash = repo.indexOf('/');
                var repoName = repo.slice(locationOfSlash + 1);
                var createdAt = event.created_at;
                var type = event.type;
                $scope.recentEvents.push({
                    repoName: repoName,
                    type: type,
                    createdAt: createdAt    
                });
            }
        }
    })
    .catch(function(err) {
        if (err.status === 403)
            $state.go('Base');
        console.error(err);
    }); 
});