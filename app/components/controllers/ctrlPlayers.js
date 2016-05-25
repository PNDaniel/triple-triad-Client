(function () {

    'use strict';

    // Created the controller to the players component
    var CtrlPlayers = function (cssInjector) {

        // Message log to check if players component was loaded
        console.log('Players component controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/players.css');
        
        // Interface Handlers
        
        $(".tt-players-menu").click(function(){
            $(".tt-players-list").toggle();
        });
    };

    // Injecting modules used for better minifing later on
    CtrlPlayers.$inject = ['cssInjector'];

    // Enabling the component in the app
    angular.module('triple-triad').component('players', {
        templateUrl: 'app/components/views/players.html',
        controller: CtrlPlayers
    });

} ());
