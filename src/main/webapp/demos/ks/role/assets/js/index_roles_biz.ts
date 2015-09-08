/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../../uc/domains/uc-domains.ts"/>
/// <reference path="index_roles.ts"/>

module RoleIndexApp {
    'use strict'

    export class IndexBizController extends RoleIndexApp.IndexController{


        static $injects = ['$scope','k']

        constructor(private $scope,private k){
            super($scope,k)
            this.init();
        }

        init(){
            this.bindEvents();
        }


        bindEvents(){
            super.bindEvents();
            var me:IndexBizController = this;

            this.$scope.$on('selectedRoleChange',function(event,msg){
                if(event.targetScope !== event.currentScope){
                    me.$scope.$broadcast('selectedRoleChange',msg);
                    event.stopPropagation(); // 一定要阻止冒泡，否则会执行多遍
                }
            })
        }
    }



    var app = angular.module('RoleIndexApp', ['ks.all'])
        .controller("IndexController", IndexBizController)
        .controller("RoleEditController", RoleIndexApp.RoleEditController)
        .controller("PermissionController", RoleIndexApp.PermissionController)
        .controller("RoleSelectController", RoleIndexApp.RoleSelectController)
        .controller("StaffAddController", RoleIndexApp.StaffAddController)
        .controller("StaffSelectController", RoleIndexApp.StaffSelectController)
        app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/');


            /**
             * 查询页面，状态为 items
             */
            $stateProvider.state('index', {
                url: '/',
                templateUrl: window.webRoot + '/uc/roles/tpl_index.html?version=' + ks.Window.Version
            });

            /**
             * 查询页面，状态为 items
             */
            $stateProvider.state('index.editRole', {
                data:{
                    isChanged:false
                },
                url: '/:id',
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {

                    // 返回查询状态，处理参数
                    var backToItems = function(){
                        $stateParams.isChanged = $state.current.data.isChanged;
                        return $state.transitionTo("index");
                    }

                    $modal.open({
                        backdrop: true,
                        templateUrl: window.webRoot + '/uc/roles/role/tpl_role_edit.html?version=' + ks.Window.Version,
                        size: 'lg'
                    }).result.then(function (result) {
                            return backToItems();
                        }, function (result) {
                            return backToItems();
                        });
                }]
            });

            $stateProvider.state('index.addStaff', {
                data:{
                    isChanged:false
                },
                url: '/addStaff/:roleId',
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {

                    // 返回查询状态，处理参数
                    var backToItems = function(){
                        $stateParams.isChanged = $state.current.data.isChanged;
                        return $state.transitionTo("index");
                    }

                    $modal.open({
                        backdrop: true,
                        templateUrl: window.webRoot + '/uc/roles/staff/tpl_staff_add.html?version=' + ks.Window.Version,
                        size: 'lg'
                    }).result.then(function (result) {
                            return backToItems();
                        }, function (result) {
                            return backToItems();
                        });
                }]
            });


        }]);
}
