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

        $scope.iWasInvited = false;

        // Enter game room
        socket.emit('game', {
            game: $routeParams.id
        });

        $scope.game = undefined;

        var tid = setTimeout(getGame, 500);
        function getGame() {
            socket.emit('getGame', {
                game: $routeParams.id
            });
            //console.log('repeat ' + $routeParams.id);
            tid = setTimeout(getGame, 500);
        };

        // Receive game update
        socket.on('game', function (data) {
            $scope.game = data.game;
            for (var i = 0; i < $scope.game.cards.invited.lentgh; i++) {
                $scope.game.cards.invited[i].selected = false;
            }
            for (var i = 0; i < $scope.game.cards.creator.lentgh; i++) {
                $scope.game.cards.creator[i].selected = false;
            }
            if ($scope.user._id === $scope.game.invited) {
                $scope.iWasInvited = true;
            } else {
                $scope.iWasInvited = false;
            }
            if (($scope.game.creator_playing === true && $scope.iWasInvited == false) ||
                ($scope.game.creator_playing === false && $scope.iWasInvited == true)) {
                $scope.tip = 'Select a card.';
            } else {
                $scope.tip = 'It\'s the other player time.';
            }
            clearTimeout(tid);
            $scope.$apply();
        });

        $scope.winner = false;

        socket.on('endGame', function (data) {
            $scope.win_msg = JSON.stringify(data.winner.name) + ' has won the game.';
            $scope.winner = true;
            $scope.$apply();
        });

        var selected = {};

        $scope.selectCard = function (card) {
            if (($scope.game.creator_playing === true && $scope.iWasInvited == false) ||
                ($scope.game.creator_playing === false && $scope.iWasInvited == true)) {
                if (selected === null) {
                    selected = card;
                } else {
                    selected.selected = false;
                }
                card.selected = true;
                selected = card;
                $scope.tip = 'Select a empty slot on the board.';
            } else {
                selected = null;
                $scope.tip = 'It\'s the other player time. Be patient.';
            }
        };

        $scope.selectSlot = function (id) {
            if (($scope.game.creator_playing === true && $scope.iWasInvited == false) ||
                ($scope.game.creator_playing === false && $scope.iWasInvited == true)) {
                if ($scope.game.board[id] === undefined || $scope.game.board[id].id === undefined) {
                    $scope.game.board[id] = selected;
                    // Send updated board
                    socket.emit('board', {
                        game: $scope.game
                    });
                } else {
                    $scope.tip = 'Slot not empty. Try again.';
                }
            } else {
                selected = null;
                $scope.tip = 'It\'s the other player time. Be patient.';
            }
        };

        $scope.player1Card = function (id) {
            if ($scope.game !== undefined && $scope.game.board !== undefined && $scope.game.board[id] !== undefined) {
                if ($scope.iWasInvited === false && $scope.game.board[id].creator === true) {
                    return true;
                } else {
                    return false;
                }
            }
        };

        $scope.player2Card = function (id) {
            if ($scope.game !== undefined && $scope.game.board !== undefined && $scope.game.board[id] !== undefined) {
                if ($scope.iWasInvited === true && $scope.game.board[id].invited === true) {
                    return true;
                } else {
                    return false;
                }
            }
        };

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