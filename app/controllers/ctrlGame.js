(function () {

    'use strict';

    // Created the controller to the game view
    var CtrlGame = function (cssInjector) {

        // Message log to check if game view was loaded (delete for deploy)
        console.log('Game controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/game.css');

    };

    // Injecting modules used for better minifing later on
    CtrlGame.$inject = ['cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlGame', CtrlGame);

} ());