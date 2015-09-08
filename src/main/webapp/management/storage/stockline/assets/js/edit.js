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
var stocklineApp;
(function (stocklineApp) {
    var EditController = (function (_super) {
        __extends(EditController, _super);
        function EditController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.queryCondition = new nk.PagingQueryCondition();
            this.entity = {};
            this.isOrder = false;
            this.id = $stateParams.id;
            this.op = $stateParams.op;
            if (this.id || this.isOrder) {
                this.selectEntityById(this.id);
                this.dialogTitle = "编辑";
            }
            else {
                this.dialogTitle = "新增";
                this.entity.type = 1;
                this.selectWarehouseByType();
            }
            if (this.op == 'order') {
                this.isOrder = true;
                this.dialogTitle = "下单";
            }
        }
        EditController.prototype.onBackToRoot = function (data) {
        };
        EditController.prototype.selectWarehouseByType = function () {
            this.queryCondition.type = 1;
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/warehouses.do', this.queryCondition).success(function (data) {
                me.entity.warehouseId = data.rows[0].id;
            });
        };
        EditController.prototype.selectEntityById = function (id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/stock_line/' + id + '.do').success(function (data) {
                me.entity = data;
            });
        };
        EditController.prototype.save = function () {
            var data = angular.copy(this.entity);
            delete data.updatedAt;
            delete data.createdAt;
            if (!data.productId) {
                this.ksTip.alert("请选择产品");
                return;
            }
            if (!data.warehouseId) {
                this.ksTip.alert("请选择仓库");
                return;
            }
            if (data.num <= 0) {
                this.ksTip.alert("数量必须大于0");
                return;
            }
            if (!data.applyStatus) {
                data.applyStatus = 1;
            }
            if (data.id) {
                this.update(data);
            }
            else {
                this.insert(data);
            }
        };
        EditController.prototype.insert = function (data) {
            var _this = this;
            var me = this;
            this.ksEntityService.post(this.webRoot + "/pdm/stock_line/add.do", data, function () {
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
        EditController.prototype.update = function (data) {
            var _this = this;
            var me = this;
            this.ksEntityService.put(this.webRoot + "/pdm/stock_line/update.do", data, function () {
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
        EditController.prototype.outNumChanged = function () {
            if (this.entity.outNum) {
                this.entity.surplusNum = this.entity.stockNum - this.entity.outNum;
            }
            else {
                this.entity.surplusNum = this.entity.stockNum;
            }
        };
        EditController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return EditController;
    })(nk.PopUpController);
    k.getApp("stocklineApp").registerController("edit", EditController);
})(stocklineApp || (stocklineApp = {}));
//# sourceMappingURL=edit.js.map