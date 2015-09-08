/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../domains/uc-domains.ts"/>
var RoleIndexApp;
(function (RoleIndexApp) {
    'use strict';
    var IndexController = (function () {
        function IndexController($scope, k) {
            this.$scope = $scope;
            this.webRoot = window.webRoot;
            this.testName = "测试";
            this.k = k;
            this.init();
        }
        IndexController.prototype.init = function () {
            this.bindEvents();
        };
        IndexController.prototype.autoFit = function () {
            var winHeight = this.k.getWinHeight() - 20;
            $("#staffsPermissionsWrap").height(winHeight);
            $("#rolesWrap").height(winHeight);
            $("#rolesGrid").height(winHeight - 90);
            var staffsGridWrapHeight = winHeight - 85;
            $("#staffsGridWrap").height(staffsGridWrapHeight);
            $("#staffsGrid").height(staffsGridWrapHeight - 40);
            $("#rolesGrid .body").height(winHeight - 125);
            $("#staffsGrid .body").height(staffsGridWrapHeight - 80);
            $("#permissionTreeWrap").height(winHeight - 125);
        };
        IndexController.prototype.bindEvents = function () {
            var me = this;
            this.autoFit();
            setTimeout(function () {
                me.autoFit();
            }, 1000);
            setTimeout(function () {
                me.autoFit();
            }, 2000);
            $(window).resize(function () {
                me.autoFit();
            });
            this.$scope.$on('selectedRoleChange', function (event, msg) {
                if (event.targetScope !== event.currentScope) {
                    me.$scope.$broadcast('selectedRoleChange', msg);
                    event.stopPropagation(); // 一定要阻止冒泡，否则会执行多遍
                }
            });
        };
        IndexController.$injects = ['$scope', 'k'];
        return IndexController;
    })();
    var app = angular.module('RoleIndexApp', ['ks.all']).controller("IndexController", IndexController);
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
            data: {
                isChanged: false
            },
            url: '/:id',
            onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                // 返回查询状态，处理参数
                var backToItems = function () {
                    $stateParams.isChanged = $state.current.data.isChanged;
                    return $state.transitionTo("index");
                };
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
            data: {
                isChanged: false
            },
            url: '/addStaff/:roleId',
            onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                // 返回查询状态，处理参数
                var backToItems = function () {
                    $stateParams.isChanged = $state.current.data.isChanged;
                    return $state.transitionTo("index");
                };
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
})(RoleIndexApp || (RoleIndexApp = {}));
//# sourceMappingURL=index_roles.js.map