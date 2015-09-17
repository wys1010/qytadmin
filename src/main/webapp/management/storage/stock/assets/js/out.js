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
                me.entity.warehouseId = null;
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
            me.ksEntityService.post(me.webRoot + "/pdm/stock/add.do", data, function () {
                _this.ksTip.success("保存成功");
                var me = _this;
                setTimeout(function () {
                    me.dismiss();
                    me.pushParam('changed', true);
                }, 200);
            }, function (error) {
                _this.ksTip.error(error);
            });
        };
        OutController.prototype.order = function (data) {
            var _this = this;
            var me = this;
            data.stockId = data.id;
            data.num = data.outNum;
            data.status = 2;
            data.id = null;
            if (!data.warehouseId) {
                this.ksTip.alert('请选择仓库');
                return;
            }
            me.ksEntityService.post(me.webRoot + "/pdm/orders/add.do", data, function () {
                _this.ksTip.success("保存成功");
                var me = _this;
                setTimeout(function () {
                    me.dismiss();
                    me.pushParam('changed', true);
                }, 200);
            }, function (error) {
                _this.ksTip.error(error);
            });
        };
        OutController.prototype.insert = function (data) {
            var _this = this;
            var me = this;
            this.ksEntityService.post(this.webRoot + "/pdm/stock/add.do", data, function () {
                _this.ksTip.success("保存成功");
                var me = _this;
                setTimeout(function () {
                    me.dismiss();
                    me.pushParam('changed', true);
                }, 200);
            }, function (entity) {
                if (typeof entity === "object") {
                    for (var key in entity) {
                        var errorMsg = entity[key];
                        me.ksTip.error(errorMsg);
                    }
                }
                else {
                    me.ksTip.error("保存出错");
                }
            });
        };
        OutController.prototype.update = function (data) {
            var _this = this;
            var me = this;
            this.ksEntityService.put(this.webRoot + "/pdm/stock/update.do", data, function () {
                _this.ksTip.success("保存成功");
                var me = _this;
                setTimeout(function () {
                    me.dismiss();
                    me.pushParam('changed', true);
                }, 200);
            }, function (entity) {
                if (typeof entity === "object") {
                    for (var key in entity) {
                        var errorMsg = entity[key];
                        me.ksTip.error(errorMsg);
                    }
                }
                else {
                    me.ksTip.error("保存出错");
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