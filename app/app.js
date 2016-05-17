(function () {

    'use strict';

    // Creation of the app, named 'triple-triad'
    var app = angular.module('triple-triad', ['ngRoute', 'ngCookies']);

    // Configuration of routes
    app.config(function ($routeProvider, $locationProvider) {

        // Definition of the view routes

        $routeProvider
            .when('/', {
                controller: 'CtrlHome',
                templateUrl: 'app/views/home.html'
            })
            .when('/auth', {
                controller: 'CtrlAuth',
                templateUrl: 'app/views/auth.html'
            })
            .when('/lobby', {
                controller: 'CtrlLobby',
                templateUrl: 'app/views/lobby.html'
            })
            .when('/game', {
                controller: 'CtrlGame',
                templateUrl: 'app/views/game.html'
            })
            .when('/404', {
                controller: 'Ctrl404',
                templateUrl: 'app/views/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });

        // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        $locationProvider.html5Mode(true);

    });

    // Code run everytime someones pushes F5 or changes the URL in the browser
    // TODO HERE: Verify is user has permissions to access the page that he wants
    app.run(function () {

    });

} ());