/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

module profileIndexApp {
    'use strict'

    class StaffQueryCondition extends ks.QueryCondition {
    }

    class StaffEntity {
        id: number
        orgId: number
        loginName: string
        name: string
        englishName: string
        gender: number
        disable: number
        email: string
        phone: string
        wechat: string
        qq: string
        manager: number
        districts: string
        lastLoginTime: Date
        remark: string
        createdAt: Date
        updatedAt: Date
        createdBy: number
        updatedBy: number
        purchaseCategoryGroups: string
        sellCategoryGroups: string

        orgName: string
        roleIds: string
        roleNames: string

        oldPassword:string
        newPassword:string
        password:string
    }

    class QueryController extends ks.CommonQueryController<StaffQueryCondition, StaffEntity> {
        entity:StaffEntity
        isUpdate:boolean = false;

        ready(){

            this.selectEntity();

        }

        selectEntity(){
            var url = ks.Window.WebRoot + "/management.uc/user/staffs/getProfile.do";
            this.ksEntityService.get(url,null,(data)=>{
                this.entity = data;
            },()=>{
                this.ksTip.error('系统内部错误');
            })
        }

        save(){
            var entity = angular.copy(this.entity);
            delete entity.lastLoginTime;
            delete entity.createdAt;
            delete entity.updatedAt;

            var self = this;
            this.ksEntityService.save(entity, ()=> {
                self.isUpdate = false;
                self.selectEntity();
                self.ksTip.success("保存成功")
            }, (entity)=> {
                if(typeof entity === "object"){
                    for (var key in entity) {
                        var errorMsg = entity[key]
                        self.ksTip.error(errorMsg);
                    }
                }else{
                    self.ksTip.error("保存出错");
                }
            })

        }

    }


    class EditPassController extends ks.CommonEditController<StaffEntity>{
        entity:StaffEntity = new StaffEntity();

        beforeSave(entity: StaffEntity): string {

            if(entity.newPassword!=entity.password){
                return '两次输入的密码必须一致'
            }
        }


        doSave(entity: StaffEntity){
            var self = this;
            var url = ks.Window.WebRoot + '/management.uc/user/staffs/updatePassword.do';
            var param:any = {
                oldPassword:entity.oldPassword,
                password:entity.password
            }
            this.ksEntityService.post(url,param,(isSuccess)=>{
                if(!isSuccess){
                    self.ksTip.alert('旧密码不正确');
                }else{
                    self.ksTip.success('密码修改成功');
                }
            },()=>{
                self.ksTip.alert('系统错误');
            })
        }



    }

    var states = [
        {
            name: ks.RouterName.Select,
            url: '/',
            templateUrl: ks.Window.WebRoot + '/management.uc/user/profile/tpl_profile_index.html',
            controller: 'QueryController'
        },
        {
            name: ks.RouterName.Edit,
            url: '/:id',
            templateUrl: ks.Window.WebRoot + '/management.uc/user/profile/tpl_profile_editpass.html',
            controller: 'EditPassController'
        }
    ]

    var app = angular.module('profileIndexApp', ['ks.all'])
        .controller("QueryController", QueryController)
        .controller("EditPassController", EditPassController)
        .config(["ksEntityServiceProvider", p => {
            p.config({url: ks.Window.WebRoot + '/management.uc/user/staffs/:id.do'})
        }])
        .config(["ksDictsProvider", p => p.config()])
        .config(ks.RouterConfig.factory(states))
}