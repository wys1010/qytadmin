/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../domains/uc-domains.ts"/>
var RoleIndexApp;
(function (RoleIndexApp) {
    'use strict';
    var RoleSelectController = (function () {
        function RoleSelectController($scope, k, ksEntityService, ksTip, $state) {
            this.$scope = $scope;
            this.k = k;
            this.ksEntityService = ksEntityService;
            this.ksTip = ksTip;
            this.$state = $state;
            this.testName = "角色管理";
            this.init();
        }
        RoleSelectController.prototype.init = function () {
            this.bindEvents();
            this.selectEntities();
        };
        RoleSelectController.prototype.selectEntities = function () {
            var me = this;
            this.ksEntityService.get(window.webRoot + '/uc/privileges/roles.do', {}, function (roles) {
                me.entities = roles;
                if (me.entities && me.entities.length > 0) {
                    me.entities[0].selected = true;
                    me.$scope.$emit("selectedRoleChange", me.entities[0]);
                }
            }, function () {
                me.ksTip.error("查询出错");
            });
        };
        RoleSelectController.prototype.update = function (row) {
            if (row.code) {
                this.ksTip.alert("系统角色，禁止编辑");
                return;
            }
            this.$state.go('index.editRole', { id: row.id });
        };
        RoleSelectController.prototype.deleteEntity = function (row) {
            var me = this;
            this.ksTip.confirm("确定删除【" + row.name + "】?").ok(function () {
                me.ksEntityService.delete(window.webRoot + "/uc/privileges/roles/delete/" + row.id + ".do").success(function () {
                    me.ksTip.success("删除成功");
                    me.selectEntities();
                }).error(function () {
                    me.ksTip.error("删除失败");
                });
            });
        };
        RoleSelectController.prototype.selectRow = function (row) {
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.selected = false;
            }
            row.selected = true;
            this.$scope.$emit("selectedRoleChange", row);
            this.selectedEntity = row;
        };
        RoleSelectController.prototype.autoFit = function () {
        };
        RoleSelectController.prototype.bindEvents = function () {
            var me = this;
            this.$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name === 'index' && fromParams.isChanged && fromState.name === 'index.editRole') {
                    me.selectEntities();
                }
            });
        };
        RoleSelectController.$injects = ['$scope', 'k', 'ksEntityService', 'ksTip', '$state'];
        return RoleSelectController;
    })();
    var app = angular.module('RoleIndexApp').controller("RoleSelectController", RoleSelectController);
})(RoleIndexApp || (RoleIndexApp = {}));
//# sourceMappingURL=role_select.js.map