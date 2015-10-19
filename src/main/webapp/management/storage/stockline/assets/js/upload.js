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
    var UploadController = (function (_super) {
        __extends(UploadController, _super);
        function UploadController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.warehouseId = 0;
        }
        UploadController.prototype.onBackToRoot = function (data) {
        };
        UploadController.prototype.upload = function () {
            var _this = this;
            var me = this;
            this.ksEntityService.post(this.webRoot + "/pdm/stock_line/upload.do", { warehouseId: this.warehouseId }, function () {
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
        UploadController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return UploadController;
    })(nk.PopUpController);
    k.getApp("stocklineApp").registerController("upload", UploadController);
})(stocklineApp || (stocklineApp = {}));
//# sourceMappingURL=upload.js.map