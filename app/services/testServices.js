(function () {

    'use strict';

    // Created the services related to users
    var testServices = function ($q, $http) {

        var deferred = $q.defer();

        this.test = function () {
            return $http.get('/api/test')
                .success(function (res) {
                    deferred.resolve(res);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

        };

    };

    // Injecting modules used for better minifing later on
    testServices.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('triple-triad').service('testServices', testServices);

} ());