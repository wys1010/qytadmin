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
var StaffIndexApp;
(function (StaffIndexApp) {
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
        }
        QueryController.prototype.resetPassword = function (entity) {
            var _this = this;
            var self = this;
            this.ksTip.confirm("确定重置密码?").ok(function () {
                var data = {
                    staffId: entity.id
                };
                _this.ksEntityService.post(ks.Window.WebRoot + '/uc/user/staffs/resetPassword.do', data, function (data) {
                    self.ksTip.success("重置密码成功");
                }, function (data, status, headers, config) {
                    self.ksTip.error("重置密码失败" + data);
                });
            });
        };
        return QueryController;
    })(ks.CommonQueryController);
    var EditController = (function (_super) {
        __extends(EditController, _super);
        function EditController() {
            _super.apply(this, arguments);
        }
        EditController.prototype.initEntity = function () {
            this.entity = new StaffEntity();
            this.entity.disable = 0;
            this.entity.manager = 0;
            this.entity.gender = 1;
        };
        EditController.prototype.save = function () {
            var _this = this;
            var data = angular.copy(this.entity);
            delete data.updatedAt;
            delete data.createdAt;
            this.$http.post(ks.Window.WebRoot + '/uc/user/staffs/isExist.do', data).success(function (backData) {
                if (backData == true && !_this.isUpdate) {
                    _this.ksTip.alert('该用户名已经存在');
                }
                else {
                    _this.doSave(data);
                }
            }).error(function (data) {
                _this.ksTip.error(data);
            });
        };
        return EditController;
    })(ks.CommonEditController);
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
        },
        {
            name: 'select.transfer',
            url: '/:id',
            templateUrl: ks.Window.WebRoot + '/uc/user/staffs/tpl_staffs_transfer.html',
            controller: 'TransferController'
        }
    ];
    var app = angular.module('staffIndexApp', ['ks.all']).controller("QueryController", QueryController).controller("EditController", EditController).config(["ksEntityServiceProvider", function (p) {
        p.config({ url: ks.Window.WebRoot + '/uc/user/staffs/:id.do' });
    }]).config(["ksDictsProvider", function (p) { return p.config(); }]).config(ks.RouterConfig.factory(states));
})(StaffIndexApp || (StaffIndexApp = {}));
//# sourceMappingURL=staff.js.map