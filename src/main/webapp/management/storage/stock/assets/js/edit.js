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
            }
            if (this.op == 'order') {
                this.isOrder = true;
                this.dialogTitle = "下单";
            }
        }
        EditController.prototype.onBackToRoot = function (data) {
        };
        EditController.prototype.selectEntityById = function (id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/stock/' + id + '.do').success(function (data) {
                me.entity = data;
                if (me.isOrder) {
                    me.entity.surplusNum = data.num;
                    me.entity.warehouseId = null;
                }
            });
        };
        EditController.prototype.save = function () {
            var data = angular.copy(this.entity);
            delete data.updatedAt;
            delete data.createdAt;
            if (!data.applyStatus) {
                data.applyStatus = 1;
            }
            if (this.isOrder) {
                this.order(data);
            }
            else {
                if (data.id) {
                    this.update(data);
                }
                else {
                    this.insert(data);
                }
            }
        };
        EditController.prototype.order = function (data) {
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
                _this.ksTip.success("亲,下单成功,快去订单信息列表看看吧！");
                var me = _this;
                setTimeout(function () {
                    me.dismiss();
                    me.pushParam('changed', true);
                }, 200);
            }, function (error) {
                _this.ksTip.error(error);
            });
        };
        EditController.prototype.insert = function (data) {
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
        EditController.prototype.update = function (data) {
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
        EditController.prototype.outNumChanged = function () {
            if (this.entity.outNum) {
                this.entity.surplusNum = this.entity.num - this.entity.outNum;
            }
            else {
                this.entity.surplusNum = this.entity.num;
            }
        };
        EditController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return EditController;
    })(nk.PopUpController);
    k.getApp("stockApp").registerController("edit", EditController);
})(stockApp || (stockApp = {}));
//# sourceMappingURL=edit.js.map