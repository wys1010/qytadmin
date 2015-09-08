/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

module StaffIndexApp {
    'use strict'

    class StaffQueryCondition extends ks.QueryCondition {
        name:string
        orgId:number
        manager:string
    }

    class StaffEntity {
        id:number
        orgId:number
        loginName:string
        name:string
        englishName:string
        gender:number
        disable:number
        email:string
        phone:string
        wechat:string
        qq:string
        manager:number
        districts:string
        lastLoginTime:Date
        remark:string
        createdAt:Date
        updatedAt:Date
        createdBy:number
        updatedBy:number
        purchaseCategoryGroups:string
        sellCategoryGroups:string

        orgName:string
        roleIds:string
        roleNames:string
    }

    class QueryController extends ks.CommonQueryController<StaffQueryCondition, StaffEntity> {

        resetPassword(entity:StaffEntity) {

            var self = this
            this.ksTip.confirm("确定重置密码?").ok(()=> {
                var data = {
                    staffId: entity.id
                }

                this.ksEntityService.post(ks.Window.WebRoot + '/uc/user/staffs/resetPassword.do', data, function (data) {
                    self.ksTip.success("重置密码成功");
                }, function (data, status, headers, config) {
                    self.ksTip.error("重置密码失败" + data);
                });
            });

        }
    }

    class EditController extends ks.CommonEditController<StaffEntity> {

        initEntity() {
            this.entity = new StaffEntity()
            this.entity.disable = 0
            this.entity.manager = 0
            this.entity.gender = 1
        }

        save() {
            var data:StaffEntity = angular.copy(this.entity)
            delete data.updatedAt;
            delete data.createdAt;

            this.$http.post(ks.Window.WebRoot + '/uc/user/staffs/isExist.do', data).success(backData=> {
                if (backData == true && !this.isUpdate) {
                    this.ksTip.alert('该用户名已经存在');
                } else {
                    this.doSave(data)
                }
            }).error(data=> {
                this.ksTip.error(data);
            });
        }
    }


    var states = [
        {
            name: ks.RouterName.Select,
            url: '/',
            templateUrl: ks.Window.WebRoot + '/uc/user/staffs/tpl_staffs_select.html',
            controller: 'QueryController'
        },
        {
            name: ks.RouterName.Edit,
            url: '/:id',
            templateUrl: ks.Window.WebRoot + '/uc/user/staffs/tpl_staffs_edit.html',
            controller: 'EditController'
        }
        ,
        {
            name: 'select.transfer',
            url: '/:id',
            templateUrl: ks.Window.WebRoot + '/uc/user/staffs/tpl_staffs_transfer.html',
            controller: 'TransferController'
        }
    ]

    var app = angular.module('staffIndexApp', ['ks.all'])
        .controller("QueryController", QueryController)
        .controller("EditController", EditController)
        .config(["ksEntityServiceProvider", p => {
            p.config({url: ks.Window.WebRoot + '/uc/user/staffs/:id.do'})
        }])
        .config(["ksDictsProvider", p => p.config()])
        .config(ks.RouterConfig.factory(states))
}