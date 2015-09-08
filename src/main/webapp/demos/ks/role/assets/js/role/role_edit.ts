/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../../../uc/domains/uc-domains.ts"/>

module RoleIndexApp {
    'use strict'


    export  class RoleEditController{
        dialogTitle:string = "新增角色";

        entity:ks.domains.uc.Role;
        selectSuccess:boolean = true;
        isUpdate:boolean;
        static $injects = ['$scope','ksEntityService','$state','$stateParams','ksTip']
        constructor(private $scope:ng.IScope,private ksEntityService, private $state,private $stateParams,private ksTip){
            $state.current.data.isChanged = false;
            this.isUpdate = $stateParams && $stateParams.id && $stateParams.id > 0,
            this.init();
        }

        init(){
            this.dialogTitle = this.isUpdate ? "编辑角色" : '新增角色';
            if(this.isUpdate){
                this.selectEntity(this.$stateParams.id);
            }
        }

        dismiss() {
            this.$scope.$dismiss();
        }

        selectEntity(id){
            var me = this;
            this.ksEntityService.get(window.webRoot + '/uc/privileges/roles/' + id + ".do")
                .success(function(data){
                    me.selectSuccess = true;
                    me.entity = data;
                }).error(function(){
                    me.selectSuccess = false;
                    me.ksTip.error("查询失败");
                });
        }

        save(){
            var me = this;;
            var data = angular.copy(this.entity);
            delete data.createdAt;
            delete data.createdBy;
            delete data.updatedAt;
            delete data.updatedBy;
            delete data.createdByName;
            delete data.updatedByName;

            if(!data.id || data.id < 1){
                this.ksEntityService.post(webRoot + '/uc/privileges/roles/add.do',data)
                    .success(function(){
                        me.$state.current.data.isChanged = true;
                        me.ksTip.success("保存成功");
                        me.dismiss();
                    })
                    .error(function(){
                        me.ksTip.error("保存失败");
                    });
            }else{
                this.ksEntityService.put(webRoot + '/uc/privileges/roles/update.do',data)
                    .success(function(){
                        me.$state.current.data.isChanged = true;
                        me.ksTip.success("保存成功");
                        me.dismiss();
                    })
                    .error(function(){
                        me.ksTip.error("保存失败");

                    });
            }
        }



    }

    //var app = angular.module('RoleIndexApp')
    //    .controller("RoleEditController", RoleEditController)
}