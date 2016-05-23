(function () {

    'use strict';

    // Created the controller to the 403 view
    var Ctrl403 = function (cssInjector) {

        // Message log to check if 403 view was loaded (delete for deploy)
        console.log('403 controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/403.css');

    };

    // Injecting modules used for better minifing later on
    Ctrl403.$inject = ['cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('Ctrl403', Ctrl403);

} ());