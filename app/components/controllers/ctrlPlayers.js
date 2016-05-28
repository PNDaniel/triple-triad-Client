(function () {

    'use strict';

    // Created the controller to the players component
    var CtrlPlayers = function ($scope, $rootScope, $window, $location, srvcAuth, srvcSocket, cssInjector) {

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

        // Get socket object to listen to specific channels
        var socket = srvcSocket.socket();

        // Changing status to online
        srvcSocket.status('online');

        // Get online users
        socket.on('users', function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id === user._id) {
                    data.splice(i, 1);
                }
            }
            $scope.players = data;
            $scope.$apply();
        });

        $scope.invite = {};
        $scope.invite.show = false;

        // Receive an invite
        socket.on('invite', function (data) {
            $scope.invite = {
                show: true,
                user: data.user,
                title: 'Invite from ' + data.user.name,
                body: 'If you accept you will be redirected to a game.',
                buttons: [{
                    label: 'Accept',
                    classes: 'btn btn-primary',
                    action: 'accept'
                }, {
                        label: 'Decline',
                        classes: 'btn btn-danger',
                        action: 'decline'
                    }]
            };
            $scope.$apply();
        });

        // Decline an invite
        socket.on('decline', function (data) {
            $scope.invite = {
                show: false,
                user: null,
                title: '',
                body: '',
                buttons: []
            };
            $scope.$apply();
        });

        // Invite a player to play
        $scope.invite = function (player) {
            $scope.invite = {
                show: true,
                title: 'Inviting ' + player.name,
                body: 'Waiting for answer...',
                buttons: []
            };
            socket.emit('invite', {
                id: player._id
            });
        };

        // Accept invite from a player
        $scope.accept = function () {
            socket.emit('accept', {
                id: $scope.invite.user._id
            });
        };

        // Decline invite from a player
        $scope.decline = function () {
            socket.emit('decline', {
                id: $scope.invite.user._id
            });
        };

        // On a game event
        socket.on('game', function (data) {
            $rootScope.$apply(function () {
                $location.path('/game/' + data.game._id);
            });
        });

        // Change status to offline when window close
        $window.onbeforeunload = function () {
            srvcSocket.status('offline');
        };

        // Interface Handlers
        $(".tt-players-menu").click(function () {
            $(".tt-players-list").toggle();
        });
    };

    // Injecting modules used for better minifing later on
    CtrlPlayers.$inject = ['$scope', '$rootScope', '$window', '$location', 'srvcAuth', 'srvcSocket', 'cssInjector'];

    // Enabling the component in the app
    angular.module('triple-triad').component('players', {
        templateUrl: 'app/components/views/players.html',
        controller: CtrlPlayers
    });

} ());
