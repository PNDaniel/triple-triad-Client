(function () {

    'use strict';

    // Created the controller to the players component
    var CtrlPlayers = function ($scope, $window, srvcAuth, srvcSocket, cssInjector) {

        // Message log to check if players component was loaded
        console.log('Players component controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/players.css');

        var user;

        // Get the details of current user
        srvcAuth.whoami()
            .then(function (res) {
                user = res.data;
            })
            .catch(function (err) {
                console.log(err);
            });

        var socket = srvcSocket.socket();

        srvcSocket.status('online');

        socket.on('users', function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id === user._id) {
                    data.splice(i, 1);
                }
            }
            $scope.players = data;
            $scope.$apply();
        });

        $window.onbeforeunload = function () {
            console.log('bbye');
            srvcSocket.status('offline');
        };

        // Interface Handlers
        $(".tt-players-menu").click(function () {
            $(".tt-players-list").toggle();
        });
    };

    // Injecting modules used for better minifing later on
    CtrlPlayers.$inject = ['$scope', '$window', 'srvcAuth', 'srvcSocket', 'cssInjector'];

    // Enabling the component in the app
    angular.module('triple-triad').component('players', {
        templateUrl: 'app/components/views/players.html',
        controller: CtrlPlayers
    });

} ());
