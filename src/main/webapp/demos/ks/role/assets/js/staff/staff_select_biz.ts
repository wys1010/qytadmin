/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../../../uc/domains/uc-domains.ts"/>

/// <reference path="staff_select.ts"/>

module RoleIndexApp {
    'use strict'


    export  class StaffSelectBizController extends RoleIndexApp.StaffSelectController{

        allChecked:boolean;

        static $injects = ['$scope', 'k', 'ksEntityService', 'ksTip','$state','$stateParams']

        constructor(private $scope:ng.IScope, private k, private ksEntityService, private ksTip,private $state,private $stateParams) {
            super($scope,k,ksEntityService,ksTip,$state,$stateParams);
            this.init();
        }

        init() {
            this.bindEvents();
        }


        addStaffs(){
            super.addStaffs();
        }


        selectEntities(isGotoPageFirst) {
            var me = this;
            if(isGotoPageFirst){
                me.queryCondition.start = 0;
            }
            var url = me.webRoot + '/uc/privileges/users/' + me.selectedRole.id + ".do?a=1";
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

            me.ksEntityService.delete(me.webRoot + '/uc/privileges/roles/delete_users.do',{ids:ids.join(","),roleId:me.selectedRole.id})
                .success(function(){
                    me.ksTip.success("保存成功");
                    me.selectEntities(true);
                })
                .error(function(){
                    me.ksTip.error("保存失败");
                })

        }


    }
}