(function () {

    'use strict';

    // Creation of the app, named 'triple-triad'
    var app = angular.module('triple-triad', ['ngRoute', 'ngCookies']);

    app.config(function ($routeProvider, $locationProvider) {

        // Definition of the view routes

        $routeProvider
            .when('/', {
                controller: 'HWCtrl',
                templateUrl: 'app/views/helloworld.html'
            })
            .otherwise({
                redirectTo: '/'
            });


        // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        $locationProvider.html5Mode(true);

    });

} ());