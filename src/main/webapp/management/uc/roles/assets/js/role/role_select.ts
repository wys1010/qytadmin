/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../domains/uc-domains.ts"/>


/// <reference path="../../../../domains/uc-domains.ts"/>

module RoleIndexApp {
    'use strict'

    class RoleSelectController{

        entities:Array<ks.domains.uc.Role>;
        testName:string = "角色管理";

        selectedEntity:ks.domains.uc.Role;
        static $injects = ['$scope','k','ksEntityService','ksTip','$state']
        constructor(private $scope:ng.IScope,private k,private ksEntityService,private ksTip,private $state){
            this.init();
        }

        init(){
            this.bindEvents();
            this.selectEntities();
        }

        selectEntities(){
            var me = this;
            this.ksEntityService.get(window.webRoot + '/management/uc/privileges/roles.do',{},function(roles){
                me.entities = roles;
                if(me.entities && me.entities.length > 0){
                    me.entities[0].selected = true;
                    me.$scope.$emit("selectedRoleChange", me.entities[0]);
                }
            },function(){
                me.ksTip.error("查询出错");
            });
        }

        update(row){
            if(row.code){
                this.ksTip.alert("系统角色，禁止编辑");
                return;
            }
            this.$state.go('index.editRole',{id: row.id })
        }


        deleteEntity(row){
            var me = this;
            this.ksTip.confirm("确定删除【" + row.name + "】?")
                .ok(function(){
                    me.ksEntityService.delete(window.webRoot +  "/management/uc/privileges/roles/delete/"+row.id+".do")
                        .success(function(){
                            me.ksTip.success("删除成功");
                            me.selectEntities();
                        })
                        .error(function(){
                            me.ksTip.error("删除失败");
                        })
                })
        }

        selectRow(row:ks.domains.uc.Role){
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.selected = false;
            }
            row.selected = true;
            this.emit("selectedRoleChange", row);
            this.selectedEntity = row;
        }

        autoFit(){

        }

        bindEvents(){
            var me = this;
            this.$scope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if (toState.name === 'index' && fromParams.isChanged && fromState.name === 'index.editRole') {
                        me.selectEntities();
                    }
                })
        }
    }


    var app = angular.module('RoleIndexApp')
        .controller("RoleSelectController", RoleSelectController)
}