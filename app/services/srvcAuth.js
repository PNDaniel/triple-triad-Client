(function () {

    'use strict';

    // Created the authentication services 
    var srvcAuth = function ($q, $http, $location, $cookies) {

        var deferred = $q.defer();

        this.validate = function () {
            $http.get('/api/auth/validate')
                .success(function (res) {
                    $location.path('/lobby');
                })
                .error(function (err) {
                    if ($location.path() != '/') {
                        $location.path('/403');
                    }
                });
        };

        this.login = function (user) {
            $http.post('/api/auth/login', user)
                .success(function (res) {
                    $location.path('/lobby');
                })
                .error(function (err) {
                    console.log(err);
                });
        };

        this.logout = function () {
            $http.post('/api/auth/logout')
                .success(function (res) {
                    $location.path('/');
                })
                .error(function (err) {
                    $location.path('/lobby');
                });
        }

        this.register = function (user) {
            return $http.post('/api/auth/register', user)
                .success(function () {
                    deferred.resolve();
                })
                .error(function (err) {
                    deferred.reject(err);
                });
        };

    };

    // Injecting modules used for better minifing later on
    srvcAuth.$inject = ['$q', '$http', '$location', '$cookies'];

    // Enabling the service in the app
    angular.module('triple-triad').service('srvcAuth', srvcAuth);

} ());