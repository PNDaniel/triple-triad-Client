(function () {

    'use strict';

    // Created the controller to the game view
    var CtrlGame = function () {

        // Message log to check if game view was loaded (delete for deploy)
        console.log('Game controller loaded.');

    };

    // Injecting modules used for better minifing later on
    CtrlGame.$inject = [];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlGame', CtrlGame);

} ());