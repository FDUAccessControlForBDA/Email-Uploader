/**
 * Created by Sunny on 2018/7/17.
 */
angular.module('myApp.controllers', [])
.controller('loginCtrl', function($scope, $rootScope, $http){

})
.controller('adminCtrl', function () {
    
})
.controller('mainCtrl',function ($scope, $rootScope, $http) {
    $scope.file = null;
    $scope.hasFile = false;

    var target = $(".upload-window")[0];
    target.addEventListener("dragenter", function () {
        target.style.borderColor = "#3D9EE5";
    });
    target.addEventListener("dragleave", function () {
        target.style.borderColor = "rgba(51, 122, 183, 0.5)";
    });
    target.addEventListener("dragover", function (event) {
        event.stopPropagation();
        event.preventDefault();
        target.style.borderColor = "#3D9EE5";
    });
    target.addEventListener("drop", function (event) {
        event.stopPropagation();
        event.preventDefault();
        $scope.getFile(event.dataTransfer.files);
        target.style.borderColor = "rgba(51, 122, 183, 0.5)";
    });

    $scope.getFile = function (files) {
        if(files.length == 1)
            $scope.file = files[0];
        angular.element('#changeState').triggerHandler('click');
    };

    $scope.showFile = function() {
        if( $scope.file != null)
            $scope.hasFile = true;
    }
})