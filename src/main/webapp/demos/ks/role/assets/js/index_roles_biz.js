/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../uc/domains/uc-domains.ts"/>
/// <reference path="index_roles.ts"/>
var RoleIndexApp;
(function (RoleIndexApp) {
    'use strict';
    var IndexBizController = (function (_super) {
        __extends(IndexBizController, _super);
        function IndexBizController($scope, k) {
            _super.call(this, $scope, k);
            this.$scope = $scope;
            this.k = k;
            this.init();
        }
        IndexBizController.prototype.init = function () {
            this.bindEvents();
        };
        IndexBizController.prototype.bindEvents = function () {
            _super.prototype.bindEvents.call(this);
            var me = this;
            this.$scope.$on('selectedRoleChange', function (event, msg) {
                if (event.targetScope !== event.currentScope) {
                    me.$scope.$broadcast('selectedRoleChange', msg);
                    event.stopPropagation(); // 一定要阻止冒泡，否则会执行多遍
                }
            });
        };
        IndexBizController.$injects = ['$scope', 'k'];
        return IndexBizController;
    })(RoleIndexApp.IndexController);
    RoleIndexApp.IndexBizController = IndexBizController;
    var app = angular.module('RoleIndexApp', ['ks.all']).controller("IndexController", IndexBizController).controller("RoleEditController", RoleIndexApp.RoleEditController).controller("PermissionController", RoleIndexApp.PermissionController).controller("RoleSelectController", RoleIndexApp.RoleSelectController).controller("StaffAddController", RoleIndexApp.StaffAddController).controller("StaffSelectController", RoleIndexApp.StaffSelectController);
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
//# sourceMappingURL=index_roles_biz.js.map