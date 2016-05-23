(function () {

    'use strict';

    // Created the controller to the home view
    var CtrlHome = function ($scope, srvcStatus, srvcAuth, cssInjector) {

        // Message log to check if home view was loaded (delete for deploy)
        console.log('Home controller loaded.');

        // Inject CSS file dynamically
        cssInjector.add('styles/home.css');

        srvcStatus.getStatus()
            .then(function (res) {
                $scope.msg = res.data;
            })
            .catch(function (err) {
                $scope.msg = 'Server doesn\'t reply.';
            });

        srvcAuth.validate();

    };

    // Injecting modules used for better minifing later on
    CtrlHome.$inject = ['$scope', 'srvcStatus', 'srvcAuth', 'cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlHome', CtrlHome);

} ());