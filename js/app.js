/**
 * Created by Sunny on 2018/7/17.
 */
var myApp = angular.module('myApp', ['ui.router', 'myApp.controllers']);
myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/main');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })

        .state('admin', {
            url: '/admin',
            templateUrl: 'templates/admin.html',
            controller: 'adminCtrl'
        })

        .state('main', {
            url: '/main',
            templateUrl: 'templates/main.html',
            controller: 'mainCtrl'
        })
}]);