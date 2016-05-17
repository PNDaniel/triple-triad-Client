(function () {

    'use strict';

    // Created the controller to the home view
    var CtrlHome = function ($scope, srvcStatus) {

        // Message log to check if home view was loaded (delete for deploy)
        console.log('Home controller loaded.');

        srvcStatus.getStatus()
            .then(function (res) {
                $scope.msg = res.data;
            })
            .catch(function (err) {
                $scope.msg = err;
            });

    };

    // Injecting modules used for better minifing later on
    CtrlHome.$inject = ['$scope', 'srvcStatus'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlHome', CtrlHome);

} ());