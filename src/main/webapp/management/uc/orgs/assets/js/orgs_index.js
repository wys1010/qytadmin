/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../domains/management/uc-domains.ts"/>
var OrganizationIndexApp;
(function (OrganizationIndexApp) {
    'use strict';
    var OrgIndexController = (function () {
        function OrgIndexController($scope, k, ksCache, ksEntityService) {
            this.$scope = $scope;
            this.k = k;
            this.ksCache = ksCache;
            this.ksEntityService = ksEntityService;
            this.webRoot = window.webRoot;
            this.init();
        }
        OrgIndexController.prototype.init = function () {
            this.bindEvents();
            this.selectEntities();
        };
        OrgIndexController.prototype.selectEntities = function () {
            var me = this;
            this.ksEntityService.get(window.webRoot + '/management/uc/orgs/allOrganizations.do').success(function (data) {
                me.orgs = me.k.convertOrgTreeData(data);
            });
        };
        OrgIndexController.prototype.bindEvents = function () {
            var me = this;
            this.$scope.$on('selectedOrgChange', function (event, msg) {
                if (event.targetScope !== event.currentScope) {
                    me.$scope.$broadcast('selectedRoleChange', msg);
                    event.stopPropagation(); // 一定要阻止冒泡，否则会执行多遍
                }
            });
        };
        OrgIndexController.$injects = ['$scope', 'k', 'ksCache', 'ksEntityService'];
        return OrgIndexController;
    })();
    var app = angular.module('OrganizationIndexApp').controller("OrgIndexController", OrgIndexController);
})(OrganizationIndexApp || (OrganizationIndexApp = {}));
//# sourceMappingURL=orgs_index.js.map