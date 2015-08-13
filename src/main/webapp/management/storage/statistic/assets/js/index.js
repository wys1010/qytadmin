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
var statisticApp;
(function (statisticApp) {
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
            this.dateFormat = 'yyyy-MM';
            this.cycleType = 2;
            this.selectEntities(true);
        }
        IndexController.prototype.onBackToRoot = function (data) {
            if (data.changed) {
                this.selectEntities(true);
            }
        };
        IndexController.prototype.resetForm = function () {
            this.queryCondition = new nk.PagingQueryCondition();
            this.selectEntities(true);
        };
        IndexController.prototype.selectEntities = function (isToFirstPage) {
            var me = this;
            if (isToFirstPage)
                me.queryCondition.start = 0;
            if (this.cycleType == 3) {
                if (this.queryCondition.dateBegin) {
                    this.queryCondition.createdAtBegin = new Date(this.queryCondition.dateBegin).getTime();
                }
                if (this.queryCondition.dateEnd) {
                    this.queryCondition.createdAtEnd = new Date(this.queryCondition.dateEnd).getTime();
                }
            }
            this.ksEntityService.get(me.webRoot + '/pdm/stock_line.do', me.queryCondition).success(function (data) {
                me.entities = data.rows;
                me.queryCondition.results = data.results;
            });
        };
        IndexController.prototype.switchCycleType = function (type) {
            if (type == 1) {
                this.dateFormat = 'yyyy';
            }
            else if (type == 2) {
                this.dateFormat = 'yyyy-MM';
            }
            else {
                this.dateFormat = 'yyyy-MM-dd';
            }
            this.queryCondition.year = null;
            this.queryCondition.month = null;
            this.queryCondition.createdAtBegin = null;
            this.queryCondition.createdAtEnd = null;
            this.queryCondition.dateBegin = null;
            this.queryCondition.dateEnd = null;
        };
        IndexController.prototype.exportExcel = function () {
            var me = this;
            var url = me.webRoot + '/pdm/stock_line/export.do?_=1';
            if (this.cycleType == 3) {
                if (this.queryCondition.dateBegin) {
                    this.queryCondition.createdAtBegin = new Date(this.queryCondition.dateBegin).getTime();
                }
                if (this.queryCondition.dateEnd) {
                    this.queryCondition.createdAtEnd = new Date(this.queryCondition.dateEnd).getTime();
                }
            }
            var params = angular.copy(me.queryCondition);
            var queryStr = "";
            for (var p in params) {
                if (!params[p]) {
                    continue;
                }
                queryStr += '&' + p + "=" + params[p];
            }
            window.open(url + queryStr);
        };
        IndexController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return IndexController;
    })(nk.BaseController);
    k.getApp("statisticApp").registerController("index", IndexController);
})(statisticApp || (statisticApp = {}));
//# sourceMappingURL=index.js.map