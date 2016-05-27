(function () {

    'use strict';

    // Created the controller to the game view
    var CtrlGame = function ($routeParams, srvcGame, srvcSocket, cssInjector) {

        // Message log to check if game view was loaded (delete for deploy)
        console.log('Game controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/game.css');

        // Verify if session (cookie) exists and is valid.
        srvcGame.validate($routeParams.id);

    };

    // Injecting modules used for better minifing later on
    CtrlGame.$inject = ['$routeParams', 'srvcGame', 'srvcSocket', 'cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlGame', CtrlGame);

} ());