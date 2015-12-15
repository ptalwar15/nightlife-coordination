// js/controllers/main.js
//angular.module('nightlifecontroller', [])

    nightlife.controller('MainController',function($scope,$rootScope,$http,$alert,$state,barList,barService,Auth,$previousState,userInfo) {
        var vm = this;
        //get info if a person is logged in
    vm.loggedIn = userInfo.loggedIn;
    console.log(vm.loggedIn);
    vm.state = $state;
    vm.barList = barService.barList;
    vm.location=""||barService.location;
    //function to handle login form
    vm.doLogin = function() {
        vm.processing = true;
        Auth.login(vm.loginData.username,vm.loginData.password)
            .success(function(data){
                vm.processing = false;
                //if a user successfully logs in, redirect to users page
                if(data.success) {
                    var previous = $previousState.get(); //Gets a reference to the previous state.
                    $state.go(previous.state,{parmas:previous.params});
                    //$state.go('home');
                }
                                                     
                else {
                    vm.error = data.message;
                    vm.loginData.password="";
                }
        });
    };

    // function to handle logging out
   vm.doLogout = function() {
     Auth.logout();
     // reset all user info
     vm.user = {};
     vm.location="";
    //$state.go('home');
    var previous = $previousState.get(); //Gets a reference to the previous state.
    $state.go(previous.state,{parmas:previous.params});
    };
        vm.state = $state;
        vm.barList = barService.barList;
        vm.location=""||barService.location;
        
        vm.search = function() {
            barList.get({location:vm.location})
                .success(function(data,status,headers){
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    //data = null;
                    if(data===null||data===undefined||data.length==0) { 
                        barList.populate({location: vm.location})
                        .success(function(data) {
                            barService.barList = data.businesses;
                            barService.location = vm.location;
                            console.log(barService.barList);
                            if($state.current.name==='searchResults')
                                    $state.reload();
                            else {
                                $state.go('searchResults');
                            }
                                
                        });
                    } else if(data!==null) {
                        barService.barList = data.businesses;
                        barService.location = vm.location;
                        console.log(barService.barList);
                           if($state.current.name==='searchResults')
                                    $state.reload();
                            else {
                                $state.go('searchResults');
                            }
                    }
                })
                .error(function(data) {
                    console.log(data);
                });
            };

                vm.subscribe = function(bar_index,bar_id) {
                     barList.subscribe(vm.location,userInfo.user.username,bar_index,bar_id).then(function(response){
                        vm.message = response.data.message;
                        console.log(vm.message);
                        barService.barList = response.data.barList;
                          vm.myAlert = $alert({
                                    content: vm.message,
                                    placement: 'top-right',
                                    type: 'success',
                                    show: true,
                                    controller: 'MainController',
                                    controllerAs:'main',
                                    duration: 10
                                  });
                        //console.log(vm.myAlert);
                        //vm.myAlert.$promise.then(function(d) {
                            //console.log(d);
                            //d.show();
                        //});

                        vm.search();

                     });
                };
        })
        
        
        
        //vm.loading = true;
        
    // GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
        /*
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});
    
        // CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
        */
	
    
    
    nightlife.controller('Main2Controller', function($scope,$http,$state,barList,barService,$window) {
        $window.location.href = 'http://127.0.0.1:3000/auth/twitter';
        $state.go('searchResults')
          $scope.$state = $state;
        $scope.barList = barService.barList;
        $scope.location=""||barService.location;
        
        
        
             $scope.search = function() {
            barList.get({location:$scope.location})
                .success(function(data,status){
                    console.log(data);
                    //data = null;
                    if(data===null||data===undefined||data.length==0) { 
                        barList.populate({location: $scope.location})
                        .success(function(data) {
                            barService.barList = data.businesses;
                            barService.location = $scope.location;
                            console.log(barService.barList);
                            $state.reload();
                        });
                    } else if(data!==null) {
                        barService.barList = data.businesses;
                        barService.location = $scope.location;
                        console.log(barService.barList);
                        $state.reload();
                    }
                })
                .error(function(data) {
                    console.log(data);
                });
            }; 
    });
           