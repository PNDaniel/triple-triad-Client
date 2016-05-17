(function () {

    'use strict';

    // Created the controller to the navbar component
    var CtrlNavbar = function () {

        // Message log to check if navbar component was loaded (delete for deploy)
        console.log('Navbar component controller loaded.');

    };

    // Injecting modules used for better minifing later on
    CtrlNavbar.$inject = [];

    // Enabling the component in the app
    angular.module('triple-triad').component('navbar', {
        templateUrl: 'app/components/views/navbar.html',
        controller: CtrlNavbar
    });

} ());