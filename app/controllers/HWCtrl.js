(function () {

    'use strict';

    // Created the controller to the dashboard view
    var HWCtrl = function ($scope, testServices) {

        // Message log to check if forbidden view was loaded (delete for deploy)
        console.log('HWCtrl loaded.');
        
        $scope.msg = "";

        testServices.test()
            .then(function (res) {
                $scope.msg = res.data;
                console.log(res.data);
                console.log($scope.msg);
            })
            .catch(function (err) {
                $scope.msg = err;
                console.log(err);
            });

    };

    // Injecting modules used for better minifing later on
    HWCtrl.$inject = ['$scope', 'testServices'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('HWCtrl', HWCtrl);

} ());