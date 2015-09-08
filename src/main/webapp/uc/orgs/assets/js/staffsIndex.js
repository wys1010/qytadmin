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
    var SelectStaffsController = (function (_super) {
        __extends(SelectStaffsController, _super);
        function SelectStaffsController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.queryCondition = new nk.PagingQueryCondition();
            this.showDetail = true;
            this.resizeLayout();
            this.queryCondition.limit = 15;
        }
        SelectStaffsController.prototype.resizeLayout = function () {
            setTimeout(function () {
                $("#infosWrap").height(window.innerHeight - 45);
            }, 500);
        };
        SelectStaffsController.prototype.onBackToRoot = function (data) {
            if (data.isChanged) {
                this.selectStaffs(true);
                this.resizeLayout();
            }
        };
        SelectStaffsController.prototype.selectStaffs = function (isToFirstPage) {
            var me = this;
            if (isToFirstPage) {
                this.queryCondition.start = 0;
            }
            this.queryCondition.orgId = this.selectedOrgs.id;
            this.ksEntityService.get(this.webRoot + '/uc/orgs/queryStaffs.do', this.queryCondition).success(function (data) {
                me.queryCondition.results = data.results;
                me.entities = data.rows;
            }).error(function () {
                console.log("查询失败");
            });
        };
        SelectStaffsController.prototype.onSelectedOrgsChange = function (msg) {
            var me = this;
            me.selectedOrgs = msg;
            this.selectStaffs(true);
            this.resizeLayout();
            this.$scope.$digest();
        };
        SelectStaffsController.prototype.toggleCheck = function () {
            if (this.entities != null) {
                for (var i = 0; i < this.entities.length; i++) {
                    this.entities[i].checked = this.allChecked;
                }
            }
        };
        SelectStaffsController.prototype.del = function (row) {
            var self = this;
            var ids = row.id;
            var url = ks.Window.WebRoot + '/uc/user/staffs/deleteStaffInOrgs.do';
            this.ksTip.confirm('确定移除选中员工?').ok(function () {
                self.ksEntityService.delete(url, { ids: ids }).success(function () {
                    self.ksTip.success('移除成功');
                    var newIds = [ids];
                    self.refresh(newIds);
                }).error(function (error, errorCode) {
                    if (errorCode == 403) {
                        self.ksTip.error('无权操作');
                    }
                    else {
                        self.ksTip.error('移除失败');
                    }
                });
            });
        };
        SelectStaffsController.prototype.batchDel = function () {
            var me = this;
            var ids = [];
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                if (entity.checked) {
                    ids.push(entity.id);
                }
            }
            if (ids.length < 1) {
                me.ksTip.alert("请至少选择一条记录");
                return;
            }
            me.ksTip.confirm("确定移除选中员工?").ok(function () {
                var url = me.webRoot + '/uc/user/staffs/deleteStaffInOrgs.do';
                me.ksEntityService.delete(url, { ids: ids.join(",") }).success(function () {
                    me.ksTip.success("移除成功");
                    me.refresh(ids);
                    me.allChecked = false;
                }).error(function () {
                    me.ksTip.error("移除失败");
                });
            });
        };
        SelectStaffsController.prototype.refresh = function (ids) {
            var newStaffs = [];
            var oldStaffs = this.entities;
            for (var key2 in oldStaffs) {
                var has = false;
                for (var key1 in ids) {
                    if (ids[key1] == (oldStaffs[key2].id + '')) {
                        has = true;
                        break;
                    }
                }
                if (has == false)
                    newStaffs.push(oldStaffs[key2]);
            }
            this.entities = newStaffs;
        };
        SelectStaffsController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return SelectStaffsController;
    })(nk.BaseController);
    k.getApp("OrganizationIndexApp").registerController("selectStaffs", SelectStaffsController);
})(OrganizationIndexApp || (OrganizationIndexApp = {}));
//# sourceMappingURL=staffsIndex.js.map