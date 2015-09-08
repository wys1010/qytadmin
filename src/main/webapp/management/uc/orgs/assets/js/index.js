/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../domains/management/uc-domains.ts"/>
var OrganizationIndexApp;
(function (OrganizationIndexApp) {
    'use strict';
    var IndexController = (function () {
        function IndexController($scope, k) {
            this.$scope = $scope;
            this.k = k;
            this.webRoot = window.webRoot;
            this.init();
        }
        IndexController.prototype.init = function () {
            this.bindEvents();
        };
        IndexController.prototype.bindEvents = function () {
            var me = this;
            this.$scope.$on('selectedOrgChange', function (event, msg) {
                if (event.targetScope !== event.currentScope) {
                    me.$scope.$broadcast('selectedRoleChange', msg);
                    event.stopPropagation(); // 一定要阻止冒泡，否则会执行多遍
                }
            });
        };
        IndexController.$injects = ['$scope', 'k'];
        return IndexController;
    })();
    var app = angular.module('OrganizationIndexApp', ['ks.all']).controller("IndexController", IndexController);
    app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('index', {
            url: '/',
            templateUrl: window.webRoot + '/management/uc/orgs/tpl_index.html'
        });
        $stateProvider.state('index.editOrg', {
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
                    templateUrl: window.webRoot + '/management/uc/orgs/tpl_orgs_edit.html',
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
                    templateUrl: window.webRoot + '/management/uc/orgs/tpl_orgs_staffs_add.html',
                    size: 'lg'
                }).result.then(function (result) {
                    return backToItems();
                }, function (result) {
                    return backToItems();
                });
            }]
        });
    }]);
})(OrganizationIndexApp || (OrganizationIndexApp = {}));
//# sourceMappingURL=index.js.map