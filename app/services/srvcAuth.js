(function () {

    'use strict';

    // Created the authentication services 
    var srvcAuth = function ($http, $location, $cookies) {

        this.validate = function () {
            return $http.get('/api/auth/validate')
                .success(function (res) {
                    $location.path('/lobby');
                })
                .error(function (err) {
                    if ($location.path() != '/') {
                        $location.path('/403');
                    }
                });
        };

        this.logout = function () {
            console.log('Logout!');
            return $http.post('/api/auth/logout')
                .success(function (res) {
                    $location.path('/');
                })
                .error(function (err) {
                    $location.path('/lobby');
                });
        }

    };

    // Injecting modules used for better minifing later on
    srvcAuth.$inject = ['$http', '$location', '$cookies'];

    // Enabling the service in the app
    angular.module('triple-triad').service('srvcAuth', srvcAuth);

} ());