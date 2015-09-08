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
var MyApp;
(function (MyApp) {
    var SelectController = (function (_super) {
        __extends(SelectController, _super);
        function SelectController($scope, $state, $stateParams, ksEntityService, $filter) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.queryCondition = { limit: 20, start: 0, results: 0 };
            this.selectEntities(true);
        }
        SelectController.prototype.onBackToRoot = function (data) {
            console.log("backToRoot--->:", data);
        };
        SelectController.prototype.selectEntities = function (resetPaging) {
            var me = this;
            if (resetPaging) {
                this.queryCondition.start = 0;
            }
            var realQueryCondition = angular.copy(this.queryCondition);
            realQueryCondition.publishDateStart = this.$filter('date')(realQueryCondition.publishDateStart, "yyyy-MM-dd hh:mm:ss");
            realQueryCondition.publishDateEnd = this.$filter('date')(realQueryCondition.publishDateEnd, "yyyy-MM-dd hh:mm:ss");
            this.ksEntityService.get(me.webRoot + "/pdm/supplier_price.do", realQueryCondition).success(function (data) {
                // 重新设置 results
                me.queryCondition.results = data.results;
                me.entities = data.rows;
            });
        };
        SelectController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter'];
        return SelectController;
    })(nk.BaseController);
    k.getApp("MyApp").registerController("select", SelectController);
})(MyApp || (MyApp = {}));
//# sourceMappingURL=select.js.map