(function () {

    'use strict';

    // Created the status services (for test and example purposes) 
    var srvcStatus = function ($q, $http) {

        var deferred = $q.defer();

        this.getStatus = function () {
            return $http.get('/api/status')
                .success(function (res) {
                    deferred.resolve(res);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

        };

    };

    // Injecting modules used for better minifing later on
    srvcStatus.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('triple-triad').service('srvcStatus', srvcStatus);

} ());