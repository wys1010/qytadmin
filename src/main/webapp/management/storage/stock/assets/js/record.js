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
    var RecordController = (function (_super) {
        __extends(RecordController, _super);
        function RecordController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.entities = [];
            this.dialogTitle = "库存记录";
            this.id = $stateParams.id;
            console.info(this.id);
            this.selectEntityById(this.id);
        }
        RecordController.prototype.onBackToRoot = function (data) {
        };
        RecordController.prototype.selectEntityById = function (id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/stock_line/getStockLineByStockId/' + id + '.do').success(function (data) {
                me.entities = data;
            });
        };
        RecordController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return RecordController;
    })(nk.PopUpController);
    k.getApp("stockApp").registerController("record", RecordController);
})(stockApp || (stockApp = {}));
//# sourceMappingURL=record.js.map