angular.module('coderFriends', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

    // routing configuration code

    $urlRouterProvider
        .otherwise('/');

    $stateProvider
  	    .state('Base', {
  			    templateUrl: 'templates/base.html',
  			    url: '/',
                controller: 'baseCtrl'
  		})
        .state('Home', {
  			    templateUrl: 'templates/home.html',
  			    url: '/home',
            controller: 'homeCtrl',
        })
        .state('Friend', {
            templateUrl: 'templates/friendTmpl.html',
            url: '/friend/:github_username',
            controller: 'friendCtrl'
        });

});
