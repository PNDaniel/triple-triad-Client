(function () {

    'use strict';

    // Created the controller to the lobby view
    var CtrlLobby = function (cssInjector) {

        // Message log to check if lobby view was loaded (delete for deploy)
        console.log('Lobby controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/lobby.css');

    };

    // Injecting modules used for better minifing later on
    CtrlLobby.$inject = ['cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlLobby', CtrlLobby);

} ());