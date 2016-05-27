(function () {

    'use strict';

    // Created the authentication services 
    var srvcGame = function ($q, $http) {

        var deferred = $q.defer();

        this.validate = function (id) {
            $http.get('/api/game/validate/' + id)
                .success(function (res) {
                    console.log(res);
                })
                .error(function (err) {
                    console.log(err);
                });
        };

    };

    // Injecting modules used for better minifing later on
    srvcGame.$inject = ['$q', '$http'];

    // Enabling the service in the app
    angular.module('triple-triad').service('srvcGame', srvcGame);

} ());