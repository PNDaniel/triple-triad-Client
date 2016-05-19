(function () {

    'use strict';

    // Created the controller to the navbar component
    var CtrlNavbar = function (cssInjector) {

        // Message log to check if navbar component was loaded (delete for deploy)
        console.log('Navbar component controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/navbar.css');

    };

    // Injecting modules used for better minifing later on
    CtrlNavbar.$inject = ['cssInjector'];

    // Enabling the component in the app
    angular.module('triple-triad').component('navbar', {
        templateUrl: 'app/components/views/navbar.html',
        controller: CtrlNavbar
    });

} ());