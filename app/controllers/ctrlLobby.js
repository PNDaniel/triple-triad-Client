(function () {

    'use strict';

    // Created the controller to the lobby view
    var CtrlLobby = function ($scope, cssInjector, srvcAuth, srvcStatus) {

        // Message log to check if lobby view was loaded (delete for deploy)
        console.log('Lobby controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/lobby.css');

        srvcStatus.clearHash();

        // Verify if session (cookie) exists and is valid.
        srvcAuth.validate();

        // Get the details of current user
        srvcAuth.whoami()
            .then(function (res) {
                $scope.user = res.data;
            })
            .catch(function (err) {
                console.log(err);
            });

        $scope.logout = function () {
            srvcAuth.logout();
        };

        // Interface Handlers
        var notificationTimeout;

        $scope.notification = function (message) {
            $(".tt-players-notification").html("<span class='glyphicon glyphicon-comment' aria-hidden='true'></span>" + " " + message);
            $(".tt-players-notification").slideDown(250);
            clearTimeout(notificationTimeout);
            notificationTimeout = setTimeout(function () {
                $(".tt-players-notification").slideUp(250);
            }, 5000);
        }
    };

    // Injecting modules used for better minifing later on
    CtrlLobby.$inject = ['$scope', 'cssInjector', 'srvcAuth', 'srvcStatus'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlLobby', CtrlLobby);

} ());