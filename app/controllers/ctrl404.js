(function () {

    'use strict';

    // Created the controller to the 404 view
    var Ctrl404 = function () {

        // Message log to check if 404 view was loaded (delete for deploy)
        console.log('404 controller loaded.');

    };

    // Injecting modules used for better minifing later on
    Ctrl404.$inject = [];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('Ctrl404', Ctrl404);

} ());