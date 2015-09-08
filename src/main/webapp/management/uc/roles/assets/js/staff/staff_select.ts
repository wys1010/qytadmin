/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../domains/uc-domains.ts"/>


/// <reference path="../../../../domains/uc-domains.ts"/>

module RoleIndexApp {
    'use strict'

    class StaffSelectController {

        entities:Array<ks.domains.uc.Staff>;
        allChecked:boolean;
        testName:string = "员工管理";
        queryCondition:ks.PagingQueryCondition = new ks.PagingQueryCondition();

        selectedRole:ks.domains.uc.Role;
        static $injects = ['$scope', 'k', 'ksEntityService', 'ksTip','$state','$stateParams']

        constructor(private $scope:ng.IScope, private k, private ksEntityService, private ksTip,private $state,private $stateParams) {
            this.init();
        }

        init() {
            this.bindEvents();
        }



        selectEntities(isGotoPageFirst) {

            var me = this;
            if(isGotoPageFirst){
                me.queryCondition.start = 0;
            }
            var url = window.webRoot + '/management/uc/privileges/users/' + me.selectedRole.id + ".do?a=1";
            this.ksEntityService.get(url, angular.copy(me.queryCondition))
                .success(function (data) {
                    me.entities = data.rows;
                    me.queryCondition.results = data.results;
                }).error(function () {
                    me.ksTip.error("查询出错");
                });

        }

        /**
         * 全选/去选
         * @param e
         */
        toggleCheck() {
            var me = this;
            if(!me.entities){
                return;
            }
            for (var i = 0; i < me.entities.length; i++) {
                var entity = me.entities[i];
                entity.checked = me.allChecked;
            }
        }


        deleteEntity(row){
            var me = this;
            me.ksTip.confirm("确定将员工【" + row.name + "】从角色【" + me.selectedRole.name + "】中移除?")
                .ok(function(){
                    me.ksEntityService.delete(window.webRoot + '/management/uc/privileges/roles/delete_users.do',{ids:row.id + "",roleId:me.selectedRole.id})
                        .success(function(){
                            me.ksTip.success("保存成功");
                            me.selectEntities(true);
                        })
                        .error(function(){
                            me.ksTip.error("保存失败");
                        })
                })
        }

        batchRemove(){
            var me = this;
            var ids = [];
            if(!me.selectedRole){
                me.ksTip.alert("请先选择一个角色!");
                return;
            }

            for (var i = 0; i < me.entities.length; i++) {
                var entity = me.entities[i];
                if(entity.checked){
                    ids.push(entity.id);
                }
            }

            if(ids.length < 1){
                me.ksTip.alert("请至少选择一条记录");
                return;
            }

           me.ksTip.confirm("确定移除选中员工?")
                .ok(function(){
                    me.ksEntityService.delete(window.webRoot + '/management/uc/privileges/roles/delete_users.do',{ids:ids.join(","),roleId:me.selectedRole.id})
                        .success(function(){
                            me.ksTip.success("保存成功");
                            me.selectEntities(true);
                        })
                        .error(function(){
                            me.ksTip.error("保存失败");
                        })
                })



        }

        addStaffs(){
            if(!this.selectedRole){
                this.ksTip.alert("请先选择角色");
                return;
            }
            this.$state.go('index.addStaff',{roleId:this.selectedRole.id});
        }


        bindEvents() {
            var me = this;
            this.$scope.$on('selectedRoleChange', function (event, msg) {
                me.selectedRole = msg;
                me.selectEntities(true);
            })

            this.$scope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if (toState.name === 'index' && fromParams.isChanged && fromState.name === 'index.addStaff') {
                        me.selectEntities(true);
                    }
                })
        }
    }


    var app = angular.module('RoleIndexApp')
        .controller("StaffSelectController", StaffSelectController)
}