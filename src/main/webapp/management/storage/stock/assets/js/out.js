var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
var stockApp;
(function (stockApp) {
    var OutController = (function (_super) {
        __extends(OutController, _super);
        function OutController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.queryCondition = new nk.PagingQueryCondition();
            this.entity = {};
            this.dialogTitle = "出库";
            this.isOrder = false;
            this.id = $stateParams.id;
            this.warehouseId = $stateParams.warehouseId;
            if (this.id) {
                this.selectEntityById(this.id);
            }
        }
        OutController.prototype.onBackToRoot = function (data) {
        };
        OutController.prototype.selectEntityById = function (id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/stock/' + id + '.do').success(function (data) {
                me.entity = data;
                me.entity.surplusNum = data.num;
                me.entity.warehouseId = me.warehouseId;
                me.entity.usage = 1;
            });
        };
        OutController.prototype.warehouseSelected = function (warehouse) {
            if (warehouse) {
                if (warehouse.type == 1) {
                    this.ksTip.alert('不能选择总仓库');
                    this.invalid = false;
                }
                else {
                    this.invalid = true;
                }
            }
        };
        OutController.prototype.save = function () {
            var _this = this;
            var me = this;
            var data = angular.copy(this.entity);
            delete data.updatedAt;
            delete data.createdAt;
            data.type = 2;
            me.ksEntityService.post(me.webRoot + "/pdm/stock_line/add.do", data, function () {
                _this.ksTip.success("操作成功");
                setTimeout(function () {
                    me.dismiss();
                    me.pushParam('changed', true);
                }, 200);
            }, function (error) {
                if (typeof error === "object") {
                    for (var key in error) {
                        var errorMsg = error[key];
                        me.ksTip.error(errorMsg);
                    }
                }
                else {
                    me.ksTip.error("系统出错");
                }
            });
        };
        OutController.prototype.outNumChanged = function () {
            if (this.entity.outNum) {
                this.entity.surplusNum = this.entity.num - this.entity.outNum;
            }
            else {
                this.entity.surplusNum = this.entity.num;
            }
        };
        OutController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return OutController;
    })(nk.PopUpController);
    k.getApp("stockApp").registerController("out", OutController);
})(stockApp || (stockApp = {}));
//# sourceMappingURL=out.js.map