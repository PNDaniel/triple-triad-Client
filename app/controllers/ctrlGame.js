(function () {

    'use strict';

    // Created the controller to the game view
    var CtrlGame = function ($scope, $routeParams, $window, srvcAuth, srvcGame, srvcSocket, cssInjector) {

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
            game: $routeParams.id
        })

        // Send message to chat
        $scope.send = function (msg) {
            socket.emit('msg', {
                room: $routeParams.id,
                msg: msg
            });
        };

        // Receive messages
        socket.on('chat', function (data) {
            $scope.messages = data.game.chat;
            $scope.$apply();
        });

        // Change status to offline when window close
        $window.onbeforeunload = function () {
            srvcSocket.status('offline');
        };

    };

    // Injecting modules used for better minifing later on
    CtrlGame.$inject = ['$scope', '$routeParams', '$window', 'srvcAuth', 'srvcGame', 'srvcSocket', 'cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlGame', CtrlGame);

} ());