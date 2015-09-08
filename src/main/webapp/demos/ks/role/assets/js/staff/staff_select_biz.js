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
/// <reference path="../../../../../../uc/domains/uc-domains.ts"/>
/// <reference path="staff_select.ts"/>
var RoleIndexApp;
(function (RoleIndexApp) {
    'use strict';
    var StaffSelectBizController = (function (_super) {
        __extends(StaffSelectBizController, _super);
        function StaffSelectBizController($scope, k, ksEntityService, ksTip, $state, $stateParams) {
            _super.call(this, $scope, k, ksEntityService, ksTip, $state, $stateParams);
            this.$scope = $scope;
            this.k = k;
            this.ksEntityService = ksEntityService;
            this.ksTip = ksTip;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.init();
        }
        StaffSelectBizController.prototype.init = function () {
            this.bindEvents();
        };
        StaffSelectBizController.prototype.addStaffs = function () {
            _super.prototype.addStaffs.call(this);
        };
        StaffSelectBizController.prototype.selectEntities = function (isGotoPageFirst) {
            var me = this;
            if (isGotoPageFirst) {
                me.queryCondition.start = 0;
            }
            var url = me.webRoot + '/uc/privileges/users/' + me.selectedRole.id + ".do?a=1";
            this.ksEntityService.get(url, angular.copy(me.queryCondition)).success(function (data) {
                me.entities = data.rows;
                me.queryCondition.results = data.results;
            }).error(function () {
                me.ksTip.error("查询出错");
            });
        };
        /**
         * 全选/去选
         * @param e
         */
        StaffSelectBizController.prototype.toggleCheck = function () {
            var me = this;
            if (!me.entities) {
                return;
            }
            for (var i = 0; i < me.entities.length; i++) {
                var entity = me.entities[i];
                entity.checked = me.allChecked;
            }
        };
        StaffSelectBizController.prototype.batchRemove = function () {
            var me = this;
            var ids = [];
            if (!me.selectedRole) {
                me.ksTip.alert("请先选择一个角色!");
                return;
            }
            for (var i = 0; i < me.entities.length; i++) {
                var entity = me.entities[i];
                if (entity.checked) {
                    ids.push(entity.id);
                }
            }
            if (ids.length < 1) {
                me.ksTip.alert("请至少选择一条记录");
                return;
            }
            me.ksEntityService.delete(me.webRoot + '/uc/privileges/roles/delete_users.do', { ids: ids.join(","), roleId: me.selectedRole.id }).success(function () {
                me.ksTip.success("保存成功");
                me.selectEntities(true);
            }).error(function () {
                me.ksTip.error("保存失败");
            });
        };
        StaffSelectBizController.$injects = ['$scope', 'k', 'ksEntityService', 'ksTip', '$state', '$stateParams'];
        return StaffSelectBizController;
    })(RoleIndexApp.StaffSelectController);
    RoleIndexApp.StaffSelectBizController = StaffSelectBizController;
})(RoleIndexApp || (RoleIndexApp = {}));
//# sourceMappingURL=staff_select_biz.js.map