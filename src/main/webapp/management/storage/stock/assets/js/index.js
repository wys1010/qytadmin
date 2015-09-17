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
var stockApp;
(function (stockApp) {
    var StockRole = (function () {
        function StockRole() {
            this.hasOrderRole = ks.Role.hasRole('ROLE_UC_STOCK_ORDER');
        }
        return StockRole;
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
            this.stockMin = window.stockMin;
            this.selectEntities(true);
            this.role = new StockRole();
            this.selectAllEntities();
        }
        IndexController.prototype.onBackToRoot = function (data) {
            if (data.changed) {
                this.selectEntities(true);
            }
        };
        IndexController.prototype.selectAllEntities = function () {
            var me = this;
            var warnStr = "<span style='font-style:italic'>以下库存数量不足,请及时入库:</span><br>";
            this.ksEntityService.get(me.webRoot + '/pdm/stock/selectAllEntities.do', null).success(function (data) {
                if (data && data.length > 0) {
                    var show = false;
                    for (var i = 0; i < data.length; i++) {
                        var entity = data[i];
                        if (entity.num < entity.minNumber) {
                            show = true;
                            warnStr += "<span style='font-weight:bold'>" + entity.productName + " - " + entity.warehouseName + "</span><br>";
                        }
                    }
                    if (show) {
                        window.layer.alert(warnStr, { icon: 0 });
                    }
                }
            });
        };
        IndexController.prototype.resetForm = function () {
            this.queryCondition = new nk.PagingQueryCondition();
            this.selectEntities(true);
        };
        IndexController.prototype.selectEntities = function (isToFirstPage) {
            var me = this;
            if (isToFirstPage)
                me.queryCondition.start = 0;
            this.ksEntityService.get(me.webRoot + '/pdm/stock.do', me.queryCondition).success(function (data) {
                me.entities = data.rows;
                me.queryCondition.results = data.results;
            });
        };
        IndexController.prototype.edit = function (id) {
            this.go('root.edit', { id: id });
        };
        IndexController.prototype.order = function (row) {
            this.go('root.edit', { id: row.id, op: 'order' });
        };
        IndexController.prototype.record = function (row) {
            this.go('root.record', { id: row.id });
        };
        IndexController.prototype.outStock = function (row) {
            this.go('root.out', { id: row.id });
        };
        IndexController.prototype.deleteEntity = function (row) {
            var me = this;
            this.ksTip.confirm("确定要删除?").ok(function () {
                var url = me.webRoot + '/pdm/stock/delete/' + row.id + '.do';
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
    k.getApp("stockApp").registerController("index", IndexController);
})(stockApp || (stockApp = {}));
//# sourceMappingURL=index.js.map