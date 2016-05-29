(function () {

    'use strict';

    // Created the controller to the game view
    var CtrlGame = function ($scope, $routeParams, $rootScope, $location, $window, srvcAuth, srvcGame, srvcSocket, cssInjector) {

        // Message log to check if game view was loaded (delete for deploy)
        console.log('Game controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/game.css');

        // Verify if session (cookie) exists and is valid.
        srvcGame.validate($routeParams.id);

        // Changing status to ingame
        srvcSocket.status('ingame');

        // Get socket object to listen to specific channels
        var socket = srvcSocket.socket();

        var room = $routeParams.id;

        // Get the details of current user
        srvcAuth.whoami()
            .then(function (res) {
                $scope.user = res.data;
            })
            .catch(function (err) {
                console.log(err);
            });

        $scope.own = function (msg) {
            if ($scope.user._id === msg.author) {
                return true;
            } else {
                return false;
            }
        }

        // Enter game room
        socket.emit('game', {
            game: room
        });

        $scope.iWasInvited = false;

        // Receive game update
        socket.on('game', function (data) {
            $scope.game = data.game;
            if ($scope.user._id === $scope.game.invited) {
                $scope.iWasInvited = true;
            } else {
                $scope.iWasInvited = false;
            }
            $scope.$apply();
        });

        // Send message to chat
        $scope.send = function (msg) {
            socket.emit('msg', {
                room: room,
                msg: msg
            });
        };

        // Receive messages
        socket.on('chat', function (data) {
            $scope.messages = data.game.chat;
            $scope.$apply();
        });

        socket.on('disconnect', function (data) {
            $rootScope.$apply(function () {
                $location.path('/lobby');
            });
        });

        // Change status to offline when window close
        $window.onbeforeunload = function () {
            srvcSocket.status('offline');
        };

    };

    // Injecting modules used for better minifing later on
    CtrlGame.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$window', 'srvcAuth', 'srvcGame', 'srvcSocket', 'cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlGame', CtrlGame);

} ());