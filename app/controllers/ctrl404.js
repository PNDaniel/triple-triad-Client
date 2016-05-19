(function () {

    'use strict';

    // Created the controller to the 404 view
    var Ctrl404 = function (cssInjector) {

        // Message log to check if 404 view was loaded (delete for deploy)
        console.log('404 controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/404.css');

    };

    // Injecting modules used for better minifing later on
    Ctrl404.$inject = ['cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('Ctrl404', Ctrl404);

} ());