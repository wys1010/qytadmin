/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../domains/management/uc-domains.ts"/>
var OrganizationIndexApp;
(function (OrganizationIndexApp) {
    'use strict';
    var OrgsSelectController = (function () {
        function OrgsSelectController($scope, k, ksEntityService, ksTip, $state) {
            this.$scope = $scope;
            this.k = k;
            this.ksEntityService = ksEntityService;
            this.ksTip = ksTip;
            this.$state = $state;
            this.init();
        }
        OrgsSelectController.prototype.init = function () {
            this.bindEvents();
            this.selectEntities();
        };
        OrgsSelectController.prototype.selectEntities = function () {
            var me = this;
        };
        OrgsSelectController.prototype.update = function (row) {
            if (row.code) {
                this.ksTip.alert("系统角色，禁止编辑");
                return;
            }
            this.$state.go('index.editRole', { id: row.id });
        };
        OrgsSelectController.prototype.deleteEntity = function (row) {
            var me = this;
            this.ksTip.confirm("确定删除【" + row.name + "】?").ok(function () {
                me.ksEntityService.delete(window.webRoot + "/management/uc/privileges/roles/delete/" + row.id + ".do").success(function () {
                    me.ksTip.success("删除成功");
                    me.selectEntities();
                }).error(function () {
                    me.ksTip.error("删除失败");
                });
            });
        };
        OrgsSelectController.prototype.selectRow = function (row) {
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.selected = false;
            }
            row.selected = true;
            this.$scope.$emit("selectedOrgChange", row);
            this.selectedEntity = row;
        };
        OrgsSelectController.prototype.bindEvents = function () {
            var me = this;
            this.$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name === 'index' && fromParams.isChanged && fromState.name === 'index.editOrgs') {
                    me.selectEntities();
                }
            });
        };
        OrgsSelectController.$injects = ['$scope', 'k', 'ksEntityService', 'ksTip', '$state'];
        return OrgsSelectController;
    })();
    var app = angular.module('OrganizationIndexApp').controller("OrgsSelectController", OrgsSelectController);
})(OrganizationIndexApp || (OrganizationIndexApp = {}));
//# sourceMappingURL=orgs_query.js.map