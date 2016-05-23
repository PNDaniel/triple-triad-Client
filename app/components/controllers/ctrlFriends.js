(function () {

    'use strict';

    // Created the controller to the friends component
    var CtrlFriends = function (cssInjector) {

        // Message log to check if friends component was loaded
        console.log('Friends component controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/friends.css');

    };

    // Injecting modules used for better minifing later on
    CtrlFriends.$inject = ['cssInjector'];

    // Enabling the component in the app
    angular.module('triple-triad').component('friends', {
        templateUrl: 'app/components/views/friends.html',
        controller: CtrlFriends
    });

} ());
