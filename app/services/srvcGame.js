(function () {

    'use strict';

    // Created the authentication services 
    var srvcGame = function ($q, $http, $location) {

        var deferred = $q.defer();

        this.validate = function (id) {
            $http.get('/api/game/validate/' + id)
                .error(function (err) {
                    console.log(err);
                    $location.path('/lobby');
                });
        };

        this.games_ongoing = function () {
            return $http.get('/api/games')
                .success(function (res) {
                    deferred.resolve(res);
                });
        };

        this.ranking = function () {
            return $http.get('/api/users')
                .success(function (res) {
                    deferred.resolve(res);
                });
        };

    };

    // Injecting modules used for better minifing later on
    srvcGame.$inject = ['$q', '$http', '$location'];

    // Enabling the service in the app
    angular.module('triple-triad').service('srvcGame', srvcGame);

} ());