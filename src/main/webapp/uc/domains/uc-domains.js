/// <reference path="../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../platform/resource/ks/ts/ks-ts-all.ts"/>
/**
 * @author Wangyiqun
 * @date 2015年03月04日
 */
var ks;
(function (ks) {
    var domains;
    (function (domains) {
        var uc;
        (function (uc) {
            /**
             * 角色
             */
            var Role = (function (_super) {
                __extends(Role, _super);
                function Role() {
                    _super.apply(this, arguments);
                }
                return Role;
            })(ks.BaseDomain);
            uc.Role = Role;
            /**
             * 角色权限关联关系
             */
            var RolePermission = (function () {
                function RolePermission() {
                }
                return RolePermission;
            })();
            uc.RolePermission = RolePermission;
            /**
             * 授权
             */
            var Permission = (function () {
                function Permission() {
                }
                return Permission;
            })();
            uc.Permission = Permission;
            /**
             * 角色
             */
            var Organization = (function (_super) {
                __extends(Organization, _super);
                function Organization() {
                    _super.apply(this, arguments);
                }
                return Organization;
            })(ks.BaseDomain);
            uc.Organization = Organization;
            /**
             * 员工
             */
            var Staff = (function (_super) {
                __extends(Staff, _super);
                function Staff() {
                    _super.apply(this, arguments);
                }
                return Staff;
            })(ks.BaseDomain);
            uc.Staff = Staff;
            /**
             * 员工角色
             */
            var StaffRole = (function () {
                function StaffRole() {
                }
                return StaffRole;
            })();
            uc.StaffRole = StaffRole;
        })(uc = domains.uc || (domains.uc = {}));
    })(domains = ks.domains || (ks.domains = {}));
})(ks || (ks = {}));
