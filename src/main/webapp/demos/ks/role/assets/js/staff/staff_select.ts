/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../../../uc/domains/uc-domains.ts"/>

module RoleIndexApp {
    'use strict'

    export  class StaffSelectController extends ks.Controller{

        entities;
        queryCondition:ks.PagingQueryCondition = new ks.PagingQueryCondition();
        selectedRole:ks.domains.uc.Role;
        constructor(private $scope:ng.IScope, private k, private ksEntityService, private ksTip,private $state,private $stateParams) {
            super();
            this.init();
        }

        init(){
            this.bindEvents();
        }

        selectEntities(isGotoPageFirst) {
            var datas = {"field":null,"condition":null,"direction":null,"totalPage":null,"results":7,"result":null,"rows":[{"id":4,"orgId":7,"loginName":"liangqi","password":null,"name":"梁琪","englishName":"","gender":1,"disable":0,"email":"","phone":"13430261290","wechat":"","qq":"2851658052","manager":1,"districts":"","lastLoginTime":1423624965000,"remark":"","createdAt":1414077708000,"updatedAt":1418369904000,"createdBy":1,"createdByName":null,"updatedBy":1,"updatedByName":null,"purchaseCategoryGroups":"","sellCategoryGroups":"","orgName":null,"roleIds":null,"roleNames":null},{"id":178,"orgId":8,"loginName":"yufangfang","password":null,"name":"余芳芳","englishName":"Melody","gender":0,"disable":0,"email":"","phone":"15021863491","wechat":"","qq":"2851717840","manager":1,"districts":"","lastLoginTime":1418366129000,"remark":"","createdAt":1415106209000,"updatedAt":1420623063000,"createdBy":1,"createdByName":null,"updatedBy":1,"updatedByName":null,"purchaseCategoryGroups":"","sellCategoryGroups":"","orgName":null,"roleIds":null,"roleNames":null},{"id":250,"orgId":7,"loginName":"mtly.zhou","password":null,"name":"周少莲","englishName":"","gender":0,"disable":0,"email":"","phone":"13602442179","wechat":"","qq":"2851658062","manager":1,"districts":"","lastLoginTime":1420682761000,"remark":"","createdAt":1415258978000,"updatedAt":1420623174000,"createdBy":1,"createdByName":null,"updatedBy":1,"updatedByName":null,"purchaseCategoryGroups":"","sellCategoryGroups":"","orgName":null,"roleIds":null,"roleNames":null},{"id":791,"orgId":10,"loginName":"evonne.xu","password":null,"name":"徐吟","englishName":"","gender":1,"disable":0,"email":"","phone":"13761747992","wechat":"","qq":"2851717863","manager":0,"districts":"","lastLoginTime":1423729960000,"remark":"","createdAt":1416195307000,"updatedAt":1418709839000,"createdBy":1,"createdByName":null,"updatedBy":1,"updatedByName":null,"purchaseCategoryGroups":"","sellCategoryGroups":"","orgName":null,"roleIds":null,"roleNames":null},{"id":793,"orgId":6,"loginName":"huangyanhua","password":null,"name":"黄艳华","englishName":"","gender":1,"disable":0,"email":"","phone":"13642313738","wechat":"","qq":"2851717862","manager":0,"districts":"","lastLoginTime":1421809780000,"remark":"","createdAt":1416195476000,"updatedAt":1418710170000,"createdBy":1,"createdByName":null,"updatedBy":1,"updatedByName":null,"purchaseCategoryGroups":"","sellCategoryGroups":"","orgName":null,"roleIds":null,"roleNames":null},{"id":794,"orgId":10,"loginName":"miya.wu","password":null,"name":"吴亚梅","englishName":"","gender":1,"disable":0,"email":"","phone":"15986447678","wechat":"","qq":"2851717861","manager":0,"districts":"","lastLoginTime":1422339176000,"remark":"","createdAt":1416195522000,"updatedAt":1418709999000,"createdBy":1,"createdByName":null,"updatedBy":1,"updatedByName":null,"purchaseCategoryGroups":"","sellCategoryGroups":"","orgName":null,"roleIds":null,"roleNames":null},{"id":1281,"orgId":7,"loginName":"wushaozhi","password":null,"name":"吴少芝","englishName":"wushaozhi","gender":0,"disable":0,"email":"","phone":"15915885672","wechat":"","qq":"2851658061","manager":0,"districts":"","lastLoginTime":1421921479000,"remark":"","createdAt":1417488796000,"updatedAt":1418709981000,"createdBy":1,"createdByName":null,"updatedBy":1,"updatedByName":null,"purchaseCategoryGroups":"","sellCategoryGroups":"","orgName":null,"roleIds":null,"roleNames":null}],"start":0,"pageIndex":0,"limit":20,"sortInfo":null};
            this.entities = datas.rows;
            this.queryCondition.results = datas.results;
        }



        addStaffs(){
            if(!this.selectedRole){
                this.ksTip.alert("请先选择角色");
                return;
            }
            this.$state.go('index.addStaff',{roleId:this.selectedRole.id});
        }

        bindEvents(){
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

}