(function () {

    'use strict';

    // Creation of the app, named 'triple-triad'
    var app = angular.module('triple-triad', ['ngRoute', 'ngCookies', 'angular.css.injector']);

    // Configuration of routes
    app.config(function ($routeProvider, $locationProvider, $httpProvider, cssInjectorProvider) {

        // Definition of the view routes
        $routeProvider
            .when('/', {
                controller: 'CtrlHome',
                templateUrl: 'app/views/home.html'
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

        // Enabling Cross Origin Requests Sharing
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        $locationProvider.html5Mode(true);

        // To remove all added CSS files when the page change
        cssInjectorProvider.setSinglePageMode(true);

    });

    // Code run everytime someones pushes F5 or changes the URL in the browser
    // TODO HERE: Verify is user has permissions to access the page that he wants
    app.run(function () {

    });

} ());