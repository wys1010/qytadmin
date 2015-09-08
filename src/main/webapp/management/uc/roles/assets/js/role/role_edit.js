/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../domains/management/uc-domains.ts"/>
var RoleIndexApp;
(function (RoleIndexApp) {
    'use strict';
    var RoleEditController = (function () {
        function RoleEditController($scope, ksEntityService, $state, $stateParams, ksTip) {
            this.$scope = $scope;
            this.ksEntityService = ksEntityService;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksTip = ksTip;
            this.dialogTitle = "新增角色";
            this.selectSuccess = true;
            $state.current.data.isChanged = false;
            this.isUpdate = $stateParams && $stateParams.id && $stateParams.id > 0, this.init();
        }
        RoleEditController.prototype.init = function () {
            this.dialogTitle = this.isUpdate ? "编辑角色" : '新增角色';
            if (this.isUpdate) {
                this.selectEntity(this.$stateParams.id);
            }
        };
        RoleEditController.prototype.dismiss = function () {
            this.$scope.$dismiss();
        };
        RoleEditController.prototype.selectEntity = function (id) {
            var me = this;
            this.ksEntityService.get(window.webRoot + '/management/uc/privileges/roles/' + id + ".do").success(function (data) {
                me.selectSuccess = true;
                me.entity = data;
            }).error(function () {
                me.selectSuccess = false;
                me.ksTip.error("查询失败");
            });
        };
        RoleEditController.prototype.save = function () {
            var me = this;
            ;
            var data = angular.copy(this.entity);
            delete data.createdAt;
            delete data.createdBy;
            delete data.updatedAt;
            delete data.updatedBy;
            delete data.createdByName;
            delete data.updatedByName;
            if (!data.id || data.id < 1) {
                this.ksEntityService.post(webRoot + '/management/uc/privileges/roles/add.do', data).success(function () {
                    me.$state.current.data.isChanged = true;
                    me.ksTip.success("保存成功");
                    me.dismiss();
                }).error(function (msg) {
                    me.ksTip.error("保存失败:" + msg);
                });
            }
            else {
                this.ksEntityService.put(webRoot + '/management/uc/privileges/roles/update.do', data).success(function () {
                    me.$state.current.data.isChanged = true;
                    me.ksTip.success("保存成功");
                    me.dismiss();
                }).error(function (msg) {
                    me.ksTip.error("保存失败:" + msg);
                });
            }
        };
        RoleEditController.$injects = ['$scope', 'ksEntityService', '$state', '$stateParams', 'ksTip'];
        return RoleEditController;
    })();
    var app = angular.module('RoleIndexApp').controller("RoleEditController", RoleEditController);
})(RoleIndexApp || (RoleIndexApp = {}));
//# sourceMappingURL=role_edit.js.map