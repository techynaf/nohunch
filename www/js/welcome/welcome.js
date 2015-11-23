// Welcome Module

var welcomeModule = angular.module('welcomeModule', []);
welcomeModule.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'welcomeIndexCtrl'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'welcomeRegistrationCtrl'
        })
});


// Controllers

var welcomeCtrls = angular.module('welcomeModule.controllers', ([]));
welcomeCtrls.controller('welcomeIndexCtrl', function ($scope, $http, $localstorage, $ionicPopup, $location, $state) {
    // LOGIN
    console.log("Hello from the outside");

    $scope.spinnerShow = true;
    $scope.loginButtonClick = function(user) {

        $scope.spinnerShow = false;
        $scope.disableRegForm = "reduceOpacity";

        if (user && typeof(user.email) !== 'undefined' && typeof(user.password) !== 'undefined') {

            $http({
                method: 'POST',
                url: apiurl + '/authenticate',
                data: {
                    'email': user.email,
                    'password': user.password
                }
            }).then(function successCallback(response) {
                if (response.data.success == true) {
                    // LOGIN SUCCESSFUL
                    $localstorage.set('token', response.data.token);
                    console.log($localstorage.get('token'));
                    $scope.spinnerShow = true;
                    $scope.disableRegForm = "";
                    $location.path("/tab2/date-request");
                } else {
                    // Wrong info handle here
                    $scope.spinnerShow = true;
                    $scope.disableRegForm = "";

                    var alertPopup = $ionicPopup.alert({
                        title: 'Wrong email or password',
                        template: 'You have entered wrong info.'
                    });
                }

            }, function errorCallback(response) {
                // NETWORK DOWN
                $scope.spinnerShow = true;
                $scope.disableRegForm = "";
                var alertPopup = $ionicPopup.alert({
                    title: 'Server is down.',
                    template: 'Please try again later.'
                });
            });
        }else{
            // Empty form submission
            $scope.spinnerShow = true;
            $scope.disableRegForm = "";

            var alertPopup = $ionicPopup.alert({
                title: 'Check input data',
                template: 'Opps you made some mistake in the input.'
            });
        }
    };
});

welcomeCtrls.controller('welcomeRegistrationCtrl', function ($scope, $http, $ionicPopup, $location, $timeout) {
    $scope.spinnerShow = true;
    $scope.registrationButtonClick = function(user) {
        $scope.spinnerShow = false;
        $scope.disableRegForm = "reduceOpacity";
        //$scope.msg = user.email;
        if (user && typeof(user.name) !== 'undefined' && typeof(user.email) !== 'undefined' && typeof(user.password) !== 'undefined') {
            $http({
                method: 'POST',
                url: apiurl+'/register',
                data: {
                    'name': user.name,
                    'email': user.email,
                    'password': user.password,
                    'age': user.age
                }
            }).then(function successCallback(response) {
                if(response.data.success == true){

                    // REGISTRATION SUCCESSFUL
                    $scope.spinnerShow = true;
                    $scope.disableRegForm = "";

                    // An alert dialog
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success!',
                        template: 'You are now registered.'
                    });
                    alertPopup.then(function(res) {
                        $location.path("/"); //test if this is working or not
                    });
                }else{
                    // Validation Error handle here.
                    $scope.spinnerShow = true;
                    $scope.disableRegForm = "";
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error in input.',
                        template: 'Please try again later.'
                    });
                }
            }, function errorCallback(response) {
                $scope.spinnerShow = true;
                $scope.disableRegForm = "";
                var alertPopup = $ionicPopup.alert({
                    title: 'Server is down.',
                    template: 'Please try again later.'
                });
            });
        }else{
            // Empty form submission
            $scope.spinnerShow = true;
            $scope.disableRegForm = "";

            var alertPopup = $ionicPopup.alert({
                title: 'Check input data',
                template: 'Opps you made some mistake in the input.'
            });
        }
    };
});
