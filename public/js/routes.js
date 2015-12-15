nightlife.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
     //$locationProvider.html5Mode(true);
    $stateProvider.state('home',{
        url:'/',
        templateUrl:'views/home.html',
        controller: 'MainController',
        controllerAs: 'main'

    })
    .state('signup',{
        url:'/',
        templateUrl:'views/signup.html',
        controller: 'userCreateController',
        controllerAs: 'user'
    })
    .state('login',{
        url:'/',
        templateUrl:'views/login.html',
        controller: 'MainController',
        controllerAs: 'login'
    })
    .state('searchResults',{
        url:'/',
        controller:'MainController',
        controllerAs: 'main',
        templateUrl:'views/searchResults.html',
         params : {
            location : "",
            barList: []
        }
        
    })
    .state('subscribing',{
        url:"/",
        controller:'Main2Controller',
        templateUrl:'views/home.html'
        
    });
     $urlRouterProvider.otherwise('/');
});