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
var ordersApp;
(function (ordersApp) {
    var DeliverController = (function (_super) {
        __extends(DeliverController, _super);
        function DeliverController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.entity = {};
            this.dialogTitle = "发货";
            this.id = $stateParams.id;
            this.selectEntityById();
        }
        DeliverController.prototype.onBackToRoot = function (data) {
        };
        DeliverController.prototype.selectEntityById = function () {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/orders/' + this.id + '.do', {}).success(function (data) {
                me.entity = data;
                me.entity.actualDeliverNum = data.num;
            });
        };
        DeliverController.prototype.save = function () {
            var _this = this;
            var me = this;
            var data = angular.copy(this.entity);
            delete data.updatedAt;
            delete data.createdAt;
            this.ksEntityService.post(this.webRoot + "/pdm/orders/delivery.do", data, function () {
                _this.ksTip.success("操作成功");
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
                    me.ksTip.error("操作出错," + entity);
                }
            });
        };
        DeliverController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return DeliverController;
    })(nk.PopUpController);
    k.getApp("orderApp").registerController("deliver", DeliverController);
})(ordersApp || (ordersApp = {}));
//# sourceMappingURL=deliver.js.map