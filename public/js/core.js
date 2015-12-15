// js/core.js

var nightlife = angular.module('nightlife', ['ngResource','ngMessages','ngCookies','ui.router','ct.ui.router.extras','mgcrea.ngStrap','mgcrea.ngStrap.modal', 'mgcrea.ngStrap.alert','authService','userService','userCtrl']);

//application configuration to integrate token into requests
 nightlife.config(function($httpProvider){
 	//attach our auth interceptor to the http requests
 	$httpProvider.interceptors.push('AuthInterceptor');
 })
nightlife.config(function($alertProvider) {
	angular.extend($alertProvider.defaults, {
            animation: 'am-fade-and-slide-top',
            placement: 'top', 
            duration: 2,
            container: 'header',
            keyboard: 'true',
            show: true,
        });
});
 //The httpProvider will now attach the token to each request.
nightlife.run(function($rootScope,userInfo,Auth,barService){
	//check to see if user is logged in on every request
    $rootScope.$on("$stateChangeStart",
    function (event, toState, toParams, fromState, fromParams) {
        userInfo.loggedIn = Auth.isLoggedIn();
        //get user info on route change
        Auth.getUser().then(function(response){
        		console.log(response);
                userInfo.user = response.data;
                console.log(userInfo.user);
        });
        if(toState=='searchResults') {
        	toParams = {
        	location: barService.location,
        	barList: barService.barList
        	}
        }
        
    });
})
nightlife.run(['$state',function($state){$state.go('home');}]);

nightlife.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

