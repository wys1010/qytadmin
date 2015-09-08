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
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
var warehouseApp;
(function (warehouseApp) {
    var WarehouseRole = (function () {
        function WarehouseRole() {
            this.hasDeleteRole = ks.Role.hasRole('ROLE_UC_WAREHOUSES_DELETE');
            this.hasEditRole = ks.Role.hasRole('ROLE_UC_WAREHOUSES_EDIT');
        }
        return WarehouseRole;
    })();
    var IndexController = (function (_super) {
        __extends(IndexController, _super);
        function IndexController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.queryCondition = new nk.PagingQueryCondition();
            this.selectEntities(true);
            this.role = new WarehouseRole();
        }
        IndexController.prototype.onBackToRoot = function (data) {
            if (data.changed) {
                this.selectEntities(true);
            }
        };
        IndexController.prototype.resetForm = function () {
            this.queryCondition = new nk.PagingQueryCondition();
            this.selectEntities(true);
        };
        IndexController.prototype.selectEntities = function (isToFirstPage) {
            var me = this;
            if (isToFirstPage)
                me.queryCondition.start = 0;
            this.ksEntityService.get(me.webRoot + '/pdm/warehouses.do', me.queryCondition).success(function (data) {
                me.entities = data.rows;
                me.queryCondition.results = data.results;
            });
        };
        IndexController.prototype.edit = function (row) {
            this.go('root.edit', { id: row.id, op: '' });
        };
        IndexController.prototype.deleteEntity = function (row) {
            var me = this;
            this.ksTip.confirm("确定要删除?").ok(function () {
                var url = me.webRoot + '/pdm/warehouses/delete/' + row.id + '.do';
                me.ksEntityService.delete(url, {}).success(function (data) {
                    me.ksTip.success('操作成功');
                    me.selectEntities(true);
                }).error(function () {
                    me.ksTip.error('操作失败');
                });
            });
        };
        IndexController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return IndexController;
    })(nk.BaseController);
    k.getApp("warehouseApp").registerController("index", IndexController);
})(warehouseApp || (warehouseApp = {}));
//# sourceMappingURL=index.js.map