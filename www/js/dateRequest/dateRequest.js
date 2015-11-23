var dateRequestModule = angular.module('dateRequestModule', []);
dateRequestModule.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        //.state('dateRequest', {
        //    url: '/date-request',
        //    templateUrl: 'templates/dateRequest.html',
        //    controller: 'dateReqIndexCtrl'
        //})

        .state('tab2', {
            url: '/tab2',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tab2.dateRequest', {
            url: '/date-request',
            views: {
                'tab-dateReq': {
                    templateUrl: 'templates/dateRequest.html',
                    controller: 'dateReqIndexCtrl'
                }
            }
        })

        //
        //.state('signup', {
        //    url: '/signup',
        //    templateUrl: 'templates/signup.html',
        //    controller: 'welcomeRegistrationCtrl'
        //})
});


var dateReqCtrls = angular.module('dateRequestModule.controllers', ([]));
dateReqCtrls.controller('dateReqIndexCtrl', function ($scope, $http, $localstorage, $ionicPopup, $location, $state) {
    // LOGIN
    console.log("DATE PAGE");
});