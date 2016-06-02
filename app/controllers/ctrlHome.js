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
                $scope.port = res.data.port;
            })
            .catch(function (err) {
                $scope.msg = 'Server doesn\'t reply.';
            });

        $scope.login = function (user) {
            srvcAuth.login(user);
        };
        
        $scope.register_error = '';

        $scope.register = function (user) {
            srvcAuth.register(user)
                .then(function () {
                    srvcAuth.login(user);
                })
                .catch(function (err) {
                    console.log(err);
                    $scope.register_error = err.data.message;
                })
        };

        // Verify if session (cookie) exists and is valid.
        srvcAuth.validate();


        // Interface Handlers
        $scope.switchForm = function (form1, form2) {
            $(form2).slideToggle(400, function () {
                $(form1).slideToggle(400);
            });
        }
    };

    // Injecting modules used for better minifing later on
    CtrlHome.$inject = ['$scope', 'srvcStatus', 'srvcAuth', 'cssInjector'];

    // Enabling the controller in the app
    angular.module('triple-triad').controller('CtrlHome', CtrlHome);

} ());