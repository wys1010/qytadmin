/// <reference path="../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/**
 * @author Wangyiqun
 * @date 2015年03月04日
 */
module ks.domains {
    export module uc {

        /**
         * 角色
         */
        export class Role extends ks.BaseDomain {
            id:number;
            name:string;
            code:string;
            remark:string;
            dataAreas:string;
            subSys:string;
        }

        /**
         * 角色权限关联关系
         */
        export class RolePermission {
            roleId:number;
            permissionId:number;
        }

        /**
         * 授权
         */
        export class Permission {
            id:number;
            name:string;
            code:string;
            menu:boolean;
            subModule:string;
            subSys:string;
        }

        /**
         * 角色
         */
        export class Organization extends ks.BaseDomain {
            id:number;
            parentId:number;
            name:string;
            code:string;
            type:number;
            disable:boolean;
            createdByName:string;
            updatedByName:string;
        }

        /**
         * 员工
         */
        export class Staff extends ks.BaseDomain {
            id:number;
            orgId:number;
            loginName:string;
            name:string;
            englishName:string;
            gender:number;
            disable:number;
            email:string;
            phone:string;
            wechat:string;
            qq:string;
            manager:number;
            districts:string;
            lastLoginTime:Date;
            remark:string;
            orgName:string;
            roleNames:string;

            checked:boolean;

            hasOrgs:string;
        }


        /**
         * 员工角色
         */
        export class StaffRole {
            staffId:number;
            roleId:number;
            dataAreas:string;
        }


    }
}
