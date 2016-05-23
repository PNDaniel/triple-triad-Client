(function () {

    'use strict';

    // Created the authentication services 
    var srvcAuth = function ($http, $location) {

        this.validate = function () {
            console.log('validate');
            return $http.get('/api/auth/validate')
                .success(function (res) {
                    $location.path('/lobby');
                });
        };

    };

    // Injecting modules used for better minifing later on
    srvcAuth.$inject = ['$http', '$location'];

    // Enabling the service in the app
    angular.module('triple-triad').service('srvcAuth', srvcAuth);

} ());