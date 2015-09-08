/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../domains/uc-domains.ts"/>

module RoleIndexApp {
    'use strict'

    class PermissionController{

        readOnly:boolean = true;
        checkedIds:Array<number>;
        permissions;
        rawPermissions;
        selectedItem;
        checkedItems;
        permissionsOwn:Array<any>;
        selectedRole:ks.domains.uc.Role;
        static $injects = ['$scope', 'k', 'ksEntityService', 'ksTip']

        constructor(private $scope:ng.IScope, private k, private ksEntityService, private ksTip) {
            this.init();
        }

        init() {
            this.bindEvents();
            this.selectPermissionTree();
        }

        convertData(permissions){
            var results = [];
            var treeMap = {};
            for (var i = 0; i < permissions.length; i++) {
                var sysRole = {};
                var role = permissions[i];
                var subSys = role.subSys;
                var subModule = role.subModule;
                if(role.menu){
                    role.text = role.name + "（菜单）";
                }else{
                    role.text = role.name;
                }
                role.id = role.id;
                if(!treeMap[subSys]){
                    treeMap[subSys] = {};
                    sysRole = {};
                    sysRole.text = subSys;
                    sysRole.id = subSys;
                    sysRole.children = [];
                    sysRole.expanded = true;
                    results.push(sysRole);
                    treeMap[subSys].roleData = sysRole;

                }else{
                    sysRole = treeMap[subSys].roleData
                }
                var sysMap = treeMap[subSys];
                var moduleRole = {};
                if(!sysMap[subModule]){
                    sysMap[subModule] = [];
                    moduleRole.text = subModule;
                    moduleRole.id = subModule;
                    moduleRole.children = [];
                    moduleRole.expanded = true;
                    sysMap[subModule].roleData =  moduleRole;
                    sysRole.children.push(moduleRole);
                }else{
                    moduleRole = sysMap[subModule].roleData;
                }

                moduleRole.children.push(role);
            }
            return results;
        }

        filterPermissionsOwn(permissionIds){
            var permissions = angular.copy(this.rawPermissions);
            for (var i = 0; i < permissions.length; i++) {
                var permission = permissions[i];
                if(permissionIds.indexOf(permission.id) < 0){
                    permissions.splice(i,1);
                    i--;
                }
            }
            this.permissionsOwn = this.convertData(permissions);
        }

        selectPermissionTree(){
            var me = this;
            this.ksEntityService.get(window.webRoot + '/management/uc/privileges/permissions.do',{},function(permissions){
                me.rawPermissions = permissions;
                me.permissions = me.convertData(permissions);
            });
        }

        selectEntities() {
            var me = this;
            if(!me.selectedRole){
                me.checkedIds = null;
                return;
            }
            this.ksEntityService.get(window.webRoot + '/management/uc/privileges/permissions/'+me.selectedRole.id+'.do',null)
                .success(function(data){
                        me.checkedIds = data;
                        me.filterPermissionsOwn(data);
                })
                .error(function(){
                    me.ksTip.error("查询权限出错");
                });
        }

        save(){
            var me = this;
            if(!me.selectedRole){
                me.ksTip.alert("请先选择一个角色");
                return;
            }

            me.ksEntityService.put(window.webRoot + '/management/uc/privileges/update_permissions.do',{permissions:me.checkedIds.join(","),roleId:me.selectedRole.id})
            .success(function(){
                    me.ksTip.success("保存成功");
                    me.selectEntities();
                })
            .error(function(){
                    me.ksTip.error("保存失败");
                });

        }

        bindEvents() {
            var me = this;
            this.$scope.$on('selectedRoleChange', function (event, role) {
                me.selectedRole = role;
                me.selectEntities();
            })
        }
    }

    var app = angular.module('RoleIndexApp')
        .controller("PermissionController", PermissionController)
}