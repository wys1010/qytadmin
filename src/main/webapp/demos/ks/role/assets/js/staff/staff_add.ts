/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../../../uc/domains/uc-domains.ts"/>

module RoleIndexApp {
    'use strict'

    export  class StaffAddController {

        allChecked:boolean;
        selectedRoleId:number;
        checkedIds:Array<number>;
        entities:Array<ks.domains.uc.Staff>;
        queryCondition:ks.PagingQueryCondition = new ks.PagingQueryCondition();
        selectedRole:ks.domains.uc.Role;
        static $injects = ['$scope', 'k', 'ksEntityService', 'ksTip', '$state', '$stateParams']

        constructor(private $scope:ng.IScope, private k, private ksEntityService, private ksTip, private $state, private $stateParams) {
            $state.current.data.isChanged = false;
            this.selectedRoleId = $stateParams.roleId;
            this.init();
        }

        /**
         * 全选/去选
         * @param e
         */
        toggleCheck() {
            var me = this;
            for (var i = 0; i < me.entities.length; i++) {
                var entity = me.entities[i];
                entity.checked = me.allChecked;
            }
        }

        init() {
            this.queryCondition.limit = 10;
            this.bindEvents();
            this.selectEntities(true)
        }

        dismiss() {
            this.$scope.$dismiss();
        }

        selectEntities(isGotoPageFirst) {

            var me = this;
            if(isGotoPageFirst){
                me.queryCondition.start = 0;
            }
            var url = window.webRoot + '/uc/privileges/users_not_in/' + me.selectedRoleId + ".do?";
            this.ksEntityService.get(url, angular.copy(me.queryCondition))
                .success(function (data) {
                    me.entities = data.rows;
                    me.queryCondition.results = data.results;
                }).error(function () {
                    me.ksTip.error("查询出错");
                });
        }


        save(){
            var me = this;
            var ids = [];
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

            me.ksEntityService.post(window.webRoot + '/uc/privileges/roles/add_users.do',{ids:ids.join(","),roleId:me.selectedRoleId})
                .success(function(){
                    me.$state.current.data.isChanged = true;
                    me.ksTip.success("保存成功");
                    me.dismiss();
                })
                .error(function(){
                    me.ksTip.error("保存失败");
                })

        }

        bindEvents() {
            var me = this;
        }
    }

}