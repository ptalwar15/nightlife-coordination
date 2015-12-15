// js/services/todos.js
//angular.module('barlist', [])
    
    nightlife.service('barService',function($cookieStore,$rootScope) {
        this.barList = [];
        this.location="";
        
    });
    // super simple service
    // each function returns a promise object 
    nightlife.factory('barList', function($http) {
        return {
            get : function(location) {
                return $http.get('/api/bars',{params:{location}});
            },
            populate : function(location) {
                return $http.post('/api/bars',location);
            },
            subscribe: function(location,username,bar_index,bar_id) {
                return $http.put('/api/bars',{location:location,username:username,bar_index:bar_index,bar_id:bar_id});
            },
            delete : function(id) {
                return $http.delete('/api/bars/' + id);
            }
        }
    });