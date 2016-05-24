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

        $scope.logout = function () {
            srvcAuth.logout();
        };

    };

    // Injecting modules used for better minifing later on
    CtrlLobby.$inject = ['$scope', 'cssInjector', 'srvcAuth', 'srvcStatus'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlLobby', CtrlLobby);

} ());