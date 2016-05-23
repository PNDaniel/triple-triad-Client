(function () {

    'use strict';

    // Created the authentication services 
    var srvcAuth = function ($q, $http) {

        var deferred = $q.defer();

        this.login_fb = function () {
            return $http.get('/api/auth/facebook')
                .success(function (res) {
                    console.log(res);
                    deferred.resolve(res);
                })
                .error(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });

        };

    };

    // Injecting modules used for better minifing later on
    srvcAuth.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('triple-triad').service('srvcAuth', srvcAuth);

} ());