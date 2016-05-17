(function () {

    'use strict';

    // Created the controller to the Auth view
    var CtrlAuth = function () {

        // Message log to check if auth view was loaded (delete for deploy)
        console.log('Auth controller loaded.');

    };

    // Injecting modules used for better minifing later on
    CtrlAuth.$inject = [];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlAuth', CtrlAuth);

} ());