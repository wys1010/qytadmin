/// <reference path="../../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../../uc/domains/uc-domains.ts"/>
var RoleIndexApp;
(function (RoleIndexApp) {
    'use strict';
    var StaffAddController = (function () {
        function StaffAddController($scope, k, ksEntityService, ksTip, $state, $stateParams) {
            this.$scope = $scope;
            this.k = k;
            this.ksEntityService = ksEntityService;
            this.ksTip = ksTip;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.queryCondition = new ks.PagingQueryCondition();
            $state.current.data.isChanged = false;
            this.selectedRoleId = $stateParams.roleId;
            this.init();
        }
        /**
         * 全选/去选
         * @param e
         */
        StaffAddController.prototype.toggleCheck = function () {
            var me = this;
            for (var i = 0; i < me.entities.length; i++) {
                var entity = me.entities[i];
                entity.checked = me.allChecked;
            }
        };
        StaffAddController.prototype.init = function () {
            this.queryCondition.limit = 10;
            this.bindEvents();
            this.selectEntities(true);
        };
        StaffAddController.prototype.dismiss = function () {
            this.$scope.$dismiss();
        };
        StaffAddController.prototype.selectEntities = function (isGotoPageFirst) {
            var me = this;
            if (isGotoPageFirst) {
                me.queryCondition.start = 0;
            }
            var url = window.webRoot + '/uc/privileges/users_not_in/' + me.selectedRoleId + ".do?";
            this.ksEntityService.get(url, angular.copy(me.queryCondition)).success(function (data) {
                me.entities = data.rows;
                me.queryCondition.results = data.results;
            }).error(function () {
                me.ksTip.error("查询出错");
            });
        };
        StaffAddController.prototype.save = function () {
            var me = this;
            var ids = [];
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
            me.ksEntityService.post(window.webRoot + '/uc/privileges/roles/add_users.do', { ids: ids.join(","), roleId: me.selectedRoleId }).success(function () {
                me.$state.current.data.isChanged = true;
                me.ksTip.success("保存成功");
                me.dismiss();
            }).error(function () {
                me.ksTip.error("保存失败");
            });
        };
        StaffAddController.prototype.bindEvents = function () {
            var me = this;
        };
        StaffAddController.$injects = ['$scope', 'k', 'ksEntityService', 'ksTip', '$state', '$stateParams'];
        return StaffAddController;
    })();
    RoleIndexApp.StaffAddController = StaffAddController;
})(RoleIndexApp || (RoleIndexApp = {}));
//# sourceMappingURL=staff_add.js.map