/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
var StaffIndexApp;
(function (StaffIndexApp) {
    'use strict';
    var StaffRole = (function () {
        function StaffRole() {
            this.hasUpdateRole = ks.Role.hasRole('ROLE_UC_STAFFS_UPDATE');
        }
        return StaffRole;
    })();
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
        QueryController.prototype.beforeQuery = function (entity) {
            this.role = new StaffRole();
            return null;
        };
        QueryController.prototype.resetPassword = function (entity) {
            var _this = this;
            var self = this;
            this.ksTip.confirm("确定重置密码?").ok(function () {
                var data = {
                    staffId: entity.id
                };
                _this.ksEntityService.post(ks.Window.WebRoot + '/management.uc/user/staffs/resetPassword.do', data, function (data) {
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
            this.$http.post(ks.Window.WebRoot + '/management.uc/user/staffs/isExist.do', data).success(function (backData) {
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
    var TransferController = (function (_super) {
        __extends(TransferController, _super);
        function TransferController() {
            _super.apply(this, arguments);
        }
        TransferController.prototype.selectEntities = function (isGotoPageFirst) {
            var _this = this;
            var me = this;
            this.entityId = this.$stateParams.id;
            if (isGotoPageFirst) {
                me.queryCondition.start = 0;
            }
            var qc = angular.copy(me.queryCondition);
            $.extend(qc, { staffId: this.entityId }, true);
            var url = ks.Window.WebRoot + '/crm/crallocation/getAllCustomerInCurrStaff.do';
            this.$http({ url: url, params: qc, method: "GET" }).success(function (data) {
                _this.queryCondition.results = data.results;
                _this.rows = data.rows;
            }).error(function () {
                _this.ksTip.error('系统内部错误');
            });
        };
        TransferController.prototype.init = function () {
            this.queryCondition = new ks.PagingQueryCondition();
            this.queryCondition.limit = 10;
            this.dialogTitle = '客户转移';
            this.selectEntities(true);
        };
        TransferController.prototype.transferCustomer = function (row, index) {
            var self = this;
            if (!this.staffs[index]) {
                this.ksTip.alert('请选择要转入的员工');
                return;
            }
            if (this.entityId == this.staffs[index]) {
                this.ksTip.alert('请转入非当前员工');
                return;
            }
            var data = {
                oldStaffId: this.entityId,
                transferStaffId: this.staffs[index],
                customerId: row.customerId,
                relType: row.relType,
                categoryGroupCode: row.categoryGroupCode,
                districtCode: row.districtCode
            };
            this.ksEntityService.post(ks.Window.WebRoot + '/crm/crallocation/transferCustomer.do', data, function (data) {
                self.ksTip.success("转移客户成功");
                self.selectEntities(true);
                self.staffs = [];
            }, function (data, status, headers, config) {
                self.ksTip.error("转移客户失败" + data);
            });
        };
        return TransferController;
    })(ks.CommonEditController);
    var states = [
        {
            name: ks.RouterName.Select,
            url: '/',
            templateUrl: ks.Window.WebRoot + '/management.uc/user/staffs/tpl_staffs_select.html',
            controller: 'QueryController'
        },
        {
            name: ks.RouterName.Edit,
            url: '/:id',
            templateUrl: ks.Window.WebRoot + '/management.uc/user/staffs/tpl_staffs_edit.html',
            controller: 'EditController'
        },
        {
            name: 'select.transfer',
            url: '/:id',
            templateUrl: ks.Window.WebRoot + '/management.uc/user/staffs/tpl_staffs_transfer.html',
            controller: 'TransferController'
        }
    ];
    var app = angular.module('staffIndexApp', ['ks.all']).controller("QueryController", QueryController).controller("EditController", EditController).controller("TransferController", TransferController).config(["ksEntityServiceProvider", function (p) {
        p.config({ url: ks.Window.WebRoot + '/management.uc/user/staffs/:id.do' });
    }]).config(["ksDictsProvider", function (p) { return p.config(); }]).config(ks.RouterConfig.factory(states));
})(StaffIndexApp || (StaffIndexApp = {}));
//# sourceMappingURL=staff.js.map