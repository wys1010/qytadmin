/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../../uc/domains/uc-domains.ts"/>
var RoleIndexApp;
(function (RoleIndexApp) {
    'use strict';
    var PermissionController = (function () {
        function PermissionController($scope, k, ksEntityService, ksTip) {
            this.$scope = $scope;
            this.k = k;
            this.ksEntityService = ksEntityService;
            this.ksTip = ksTip;
            this.init();
        }
        PermissionController.prototype.init = function () {
            this.bindEvents();
            this.selectPermissionTree();
        };
        PermissionController.prototype.convertData = function (permissions) {
            var results = [];
            var treeMap = {};
            for (var i = 0; i < permissions.length; i++) {
                var sysRole = {};
                var role = permissions[i];
                var subSys = role.subSys;
                var subModule = role.subModule;
                if (role.menu) {
                    role.text = role.name + "（菜单）";
                }
                else {
                    role.text = role.name;
                }
                role.id = role.id;
                if (!treeMap[subSys]) {
                    treeMap[subSys] = {};
                    sysRole = {};
                    sysRole.text = subSys;
                    sysRole.id = subSys;
                    sysRole.children = [];
                    sysRole.expanded = true;
                    results.push(sysRole);
                    treeMap[subSys].roleData = sysRole;
                }
                else {
                    sysRole = treeMap[subSys].roleData;
                }
                var sysMap = treeMap[subSys];
                var moduleRole = {};
                if (!sysMap[subModule]) {
                    sysMap[subModule] = [];
                    moduleRole.text = subModule;
                    moduleRole.id = subModule;
                    moduleRole.children = [];
                    moduleRole.expanded = true;
                    sysMap[subModule].roleData = moduleRole;
                    sysRole.children.push(moduleRole);
                }
                else {
                    moduleRole = sysMap[subModule].roleData;
                }
                moduleRole.children.push(role);
            }
            return results;
        };
        PermissionController.prototype.selectPermissionTree = function () {
            var me = this;
            this.ksEntityService.get(window.webRoot + '/uc/privileges/permissions.do', {}, function (permissions) {
                me.permissions = me.convertData(permissions);
            });
        };
        PermissionController.prototype.selectEntities = function () {
            var me = this;
            if (!me.selectedRole) {
                me.checkedIds = null;
                return;
            }
            this.ksEntityService.get(window.webRoot + '/uc/privileges/permissions/' + me.selectedRole.id + '.do', null).success(function (data) {
                me.checkedIds = data;
            }).error(function () {
                me.ksTip.error("查询权限出错");
            });
        };
        PermissionController.prototype.save = function () {
            var me = this;
            if (!me.selectedRole) {
                me.ksTip.alert("请先选择一个角色");
                return;
            }
            me.ksEntityService.put(window.webRoot + '/uc/privileges/update_permissions.do', { permissions: me.checkedIds.join(","), roleId: me.selectedRole.id }).success(function () {
                me.ksTip.success("保存成功");
            }).error(function () {
                me.ksTip.error("保存失败");
            });
        };
        PermissionController.prototype.bindEvents = function () {
            var me = this;
            this.$scope.$on('selectedRoleChange', function (event, role) {
                me.selectedRole = role;
                me.selectEntities();
            });
        };
        PermissionController.$injects = ['$scope', 'k', 'ksEntityService', 'ksTip'];
        return PermissionController;
    })();
    RoleIndexApp.PermissionController = PermissionController;
})(RoleIndexApp || (RoleIndexApp = {}));
//# sourceMappingURL=permission_manager.js.map