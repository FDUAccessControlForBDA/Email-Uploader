/**
 * Created by Sunny on 2018/7/17.
 */
angular.module('myApp.controllers', [])
.controller('loginCtrl', function($scope, $rootScope, $http){
    $scope.submitLoginForm = function () {
        if ($scope.signInForm.$invalid){
            alert("请检查您的信息！");
        }else{
            $http({
                method:'POST',
                url  : $rootScope.hostUrl + 'signin',
                data: {
                    userName: $scope.logindata.username,
                    password: $scope.logindata.password
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest:  $rootScope.transformRequest
            })
                .success(function(ret) {
                    if(ret != null && ret.result == 'true'){
                        $rootScope.user = true;
                        window.location.href='#admin';
                    }else {
                        alert('登录失败，请检查用户名和密码');
                    }
                })
                .error(function() {
                    alert('登录失败，因网络原因无法登录');
                });
        }
    }
})
.controller('adminCtrl', function ($scope, $rootScope, $http) {
    // $scope.studentList = [
    //     {
    //         name:"上传者",
    //         id:"0",
    //         s_id: "000"
    //     },
    //     {
    //         name: "一",
    //         id: "1",
    //         s_id: "111"
    //     },
    //     {
    //         name: "二",
    //         id: "2",
    //         s_id: "222"
    //     },
    //     {
    //         name: "三",
    //         id: "3",
    //         s_id: "333"
    //     },
    //     {
    //         name: "四",
    //         id: "4",
    //         s_id: "444"
    //     }
    // ];
    $scope.getStudents();

    $scope.getStudents = function (){
        $http({
            method: 'GET',
            url: $rootScope.hostUrl + 'getStudents',
            data: {status: 2}
        }).success(function(ret){
            if(ret != null && ret.studentList != null){
                $scope.studentList = ret.studentList;
            }else{
                $scope.studentList = [];
            }
        }).error(function () {
            alert('因网络问题无法获取名单');
        })
    }

    $scope.deleteStudent = function (id) {
        var confirm = window.confirm('确认删除该记录？');
        if(confirm){
            $http({
                method:'POST',
                url  : $rootScope.hostUrl + 'delete',
                data: {id: id}
            }).success(function (ret) {
                if(ret != null && ret == 'success'){
                    alert('删除成功！');
                    $scope.getStudents();
                }
            }).error(function () {
                alert('因网络问题无法删除');
            });
        }
    };
    
    $scope.addNewStudent = function () {
        var confirm = window.confirm('确认添加' + $scope.addStudent.name + '(' + $scope.addStudent.s_id +')?');
        if(confirm){
            $http({
                method:'POST',
                url  : $rootScope.hostUrl + 'addNew',
                data: {name: $scope.addStudent.name, s_id: $scope.addStudent.s_id}
            }).success(function (ret) {
                if(ret != null && ret == 'success'){
                    alert('添加成功！');
                    $scope.getStudents();
                }
            }).error(function () {
                alert('因网络问题无法添加');
            });
            $scope.addStudent.s_id = '';
            $scope.addStudent.name = '';
        }
    }
    
    $scope.logOut = function () {
        $rootScope.user = false;
        window.location.href='#main';
    }
})
.controller('mainCtrl',function ($scope, $rootScope, $http) {
    $rootScope.hostUrl = "http://localhost:8080/";
    $scope.file = null;
    $scope.hasFile = false;
    $scope.getNameList(0);

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

    $scope.getNameList = function(status){
        $http({
            method: 'GET',
            url: $rootScope.hostUrl + 'getStudents',
            data: {status: status}
        }).success(function(ret){
            if(ret != null && ret.studentList != null){
                if(status == 0)
                    $scope.nameList0 = ret.studentList;
                else
                    $scope.nameList1 = ret.studentList;
            }else{
                if(status == 0)
                    $scope.nameList0 = [];
                else
                    $scope.nameList1 = [];
            }
        }).error(function () {
            alert('因网络问题无法获取名单');
        })
    };

    $scope.getFile = function (files) {
        if(files.length == 1)
            $scope.file = files[0];
        angular.element('#changeState').triggerHandler('click');
    };

    $scope.showFile = function() {
        if( $scope.file != null)
            $scope.hasFile = true;
    }
    
    $scope.uploadFile = function() {
        var fd = new FormData();

        fd.append("files", $scope.file);
        fd.append("id", $scope.selectedPerson.id);
        $http({
            method:'POST',
            url  : $rootScope.hostUrl + 'upload',
            data: fd,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity
        }).success(function (ret) {
            if(ret != null){
                alert('上传成功！');
                $scope.cancelUpload();
            }
        }).error(function () {
            alert('因网络问题无法上传文件');
        });
    }
    
    $scope.cancelUpload = function () {
        $scope.file = null;
        $scope.hasFile = false;
    }
})