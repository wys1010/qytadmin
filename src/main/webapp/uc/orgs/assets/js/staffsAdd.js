var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts" />
/// <reference path="../../../../platform/resource/ks/ts/nk.ts"/>
/// <reference path="../../../../uc/domains/uc-domains.ts"/>
var OrganizationIndexApp;
(function (OrganizationIndexApp) {
    var AddStaffsController = (function (_super) {
        __extends(AddStaffsController, _super);
        function AddStaffsController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.queryCondition = new nk.PagingQueryCondition();
            this.selectEntities(true);
        }
        AddStaffsController.prototype.onBackToRoot = function (data) {
            if (data.isChanged) {
                this.selectEntities(true);
            }
        };
        AddStaffsController.prototype.selectEntities = function (isToFirstPage) {
            var me = this;
            this.allChecked = false;
            if (isToFirstPage) {
                this.queryCondition.start = 0;
            }
            var qc = angular.copy(this.queryCondition);
            this.ksEntityService.get(this.webRoot + '/uc/orgs/queryStaffs.do', qc).success(function (data) {
                me.queryCondition.results = data.results;
                me.entities = data.rows;
            }).error(function () {
                console.log("查询失败");
            });
        };
        AddStaffsController.prototype.resetForm = function () {
            this.queryCondition.start = 0;
            this.queryCondition.orgId = null;
            this.queryCondition.name = null;
            this.queryCondition.hasOrgs = "";
        };
        /**
         * 全选/去选
         * @param e
         */
        AddStaffsController.prototype.toggleCheck = function (e) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].checked = this.allChecked;
            }
        };
        AddStaffsController.prototype.onSave = function () {
            var checkedStaffs = [];
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].checked) {
                    var entity = {};
                    entity.id = this.entities[i].id;
                    entity.orgId = this.getAppCache("currentOrgs").id;
                    entity.roleIds = this.entities[i].roleIds;
                    checkedStaffs.push(entity);
                }
            }
            if (checkedStaffs.length == 0) {
                this.ksTip.alert('请选择员工');
                return;
            }
            this.batchUpdate(checkedStaffs);
        };
        AddStaffsController.prototype.batchUpdate = function (checkedStaffs) {
            var _this = this;
            var me = this;
            var json = JSON.stringify(checkedStaffs);
            var url = this.webRoot + '/uc/user/staffs/batch_update.do';
            this.ksEntityService.post(url, { staffJson: json }).success(function () {
                me.ksTip.success('操作成功');
                me.$state.current.data.isChanged = true;
                me.dismiss();
            }).error(function () {
                _this.ksTip.error('系统内部错误');
            });
        };
        AddStaffsController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return AddStaffsController;
    })(nk.PopUpController);
    k.getApp("OrganizationIndexApp").registerController("addStaffs", AddStaffsController);
})(OrganizationIndexApp || (OrganizationIndexApp = {}));
//# sourceMappingURL=staffsAdd.js.map