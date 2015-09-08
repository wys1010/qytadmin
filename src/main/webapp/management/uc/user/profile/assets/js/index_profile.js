/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
var profileIndexApp;
(function (profileIndexApp) {
    'use strict';
    var StaffQueryCondition = (function (_super) {
        __extends(StaffQueryCondition, _super);
        function StaffQueryCondition() {
            _super.apply(this, arguments);
        }
        return StaffQueryCondition;
    })(ks.QueryCondition);
    var StaffEntity = (function () {
        function StaffEntity() {
        }
        return StaffEntity;
    })();
    var QueryController = (function (_super) {
        __extends(QueryController, _super);
        function QueryController() {
            _super.apply(this, arguments);
            this.isUpdate = false;
        }
        QueryController.prototype.ready = function () {
            this.selectEntity();
        };
        QueryController.prototype.selectEntity = function () {
            var _this = this;
            var url = ks.Window.WebRoot + "/management/uc/user/staffs/getProfile.do";
            this.ksEntityService.get(url, null, function (data) {
                _this.entity = data;
            }, function () {
                _this.ksTip.error('系统内部错误');
            });
        };
        QueryController.prototype.save = function () {
            var entity = angular.copy(this.entity);
            delete entity.lastLoginTime;
            delete entity.createdAt;
            delete entity.updatedAt;
            var self = this;
            this.ksEntityService.save(entity, function () {
                self.isUpdate = false;
                self.selectEntity();
                self.ksTip.success("保存成功");
            }, function (entity) {
                if (typeof entity === "object") {
                    for (var key in entity) {
                        var errorMsg = entity[key];
                        self.ksTip.error(errorMsg);
                    }
                }
                else {
                    self.ksTip.error("保存出错");
                }
            });
        };
        return QueryController;
    })(ks.CommonQueryController);
    var EditPassController = (function (_super) {
        __extends(EditPassController, _super);
        function EditPassController() {
            _super.apply(this, arguments);
            this.entity = new StaffEntity();
        }
        EditPassController.prototype.beforeSave = function (entity) {
            if (entity.newPassword != entity.password) {
                return '两次输入的密码必须一致';
            }
        };
        EditPassController.prototype.doSave = function (entity) {
            var self = this;
            var url = ks.Window.WebRoot + '/management/uc/user/staffs/updatePassword.do';
            var param = {
                oldPassword: entity.oldPassword,
                password: entity.password
            };
            this.ksEntityService.post(url, param, function (isSuccess) {
                if (!isSuccess) {
                    self.ksTip.alert('旧密码不正确');
                }
                else {
                    self.ksTip.success('密码修改成功');
                }
            }, function () {
                self.ksTip.alert('系统错误');
            });
        };
        return EditPassController;
    })(ks.CommonEditController);
    var states = [
        {
            name: ks.RouterName.Select,
            url: '/',
            templateUrl: ks.Window.WebRoot + '/management/uc/user/profile/tpl_profile_index.html',
            controller: 'QueryController'
        },
        {
            name: ks.RouterName.Edit,
            url: '/:id',
            templateUrl: ks.Window.WebRoot + '/management/uc/user/profile/tpl_profile_editpass.html',
            controller: 'EditPassController'
        }
    ];
    var app = angular.module('profileIndexApp', ['ks.all']).controller("QueryController", QueryController).controller("EditPassController", EditPassController).config(["ksEntityServiceProvider", function (p) {
        p.config({ url: ks.Window.WebRoot + '/management/uc/user/staffs/:id.do' });
    }]).config(["ksDictsProvider", function (p) { return p.config(); }]).config(ks.RouterConfig.factory(states));
})(profileIndexApp || (profileIndexApp = {}));
//# sourceMappingURL=index_profile.js.map