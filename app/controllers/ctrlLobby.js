(function () {

    'use strict';

    // Created the controller to the lobby view
    var CtrlLobby = function () {

        // Message log to check if lobby view was loaded (delete for deploy)
        console.log('Lobby controller loaded.');

    };

    // Injecting modules used for better minifing later on
    CtrlLobby.$inject = [];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlLobby', CtrlLobby);

} ());