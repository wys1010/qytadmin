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
var warehouseApp;
(function (warehouseApp) {
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
        }
        EditController.prototype.onBackToRoot = function (data) {
        };
        EditController.prototype.selectEntityById = function (id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/warehouses/' + id + '.do').success(function (data) {
                me.entity = data;
                if (me.isOrder)
                    me.entity.surplusNum = data.stockNum;
            });
        };
        EditController.prototype.save = function () {
            var data = angular.copy(this.entity);
            delete data.updatedAt;
            delete data.createdAt;
            console.log(data);
            if (!data.attendantId || data.attendantId == 0) {
                this.ksTip.alert("管理员不能为空");
                return;
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
            this.ksEntityService.post(this.webRoot + "/pdm/warehouses/add.do", data, function () {
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
                    me.ksTip.error("保存出错," + entity);
                }
            });
        };
        EditController.prototype.update = function (data) {
            var _this = this;
            var me = this;
            this.ksEntityService.put(this.webRoot + "/pdm/warehouses/update.do", data, function () {
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
                    me.ksTip.error("保存出错," + entity);
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
    k.getApp("warehouseApp").registerController("edit", EditController);
})(warehouseApp || (warehouseApp = {}));
//# sourceMappingURL=edit.js.map