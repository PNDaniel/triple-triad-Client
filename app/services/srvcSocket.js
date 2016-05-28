(function () {

    'use strict';

    // Created the socket services
    var srvcSocket = function () {

        var socket = io.connect('http://localhost/', {
            transports: ['websocket']
        });

        this.socket = function () {
            return socket;
        };

        this.status = function (status) {
            socket.emit('status', {
                status: status
            });
        };

    };

    // Injecting modules used for better minifing later on
    srvcSocket.$inject = [];

    // Enabling the service in the app
    angular.module('triple-triad').service('srvcSocket', srvcSocket);

} ());