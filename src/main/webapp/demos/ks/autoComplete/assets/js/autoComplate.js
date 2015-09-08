/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KsDemo;
(function (KsDemo) {
    'use strict';
    var AutoCompleteController = (function (_super) {
        __extends(AutoCompleteController, _super);
        function AutoCompleteController($scope) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _super.call(this, $scope, args);
            this.selectedValue = "";
            this.selectedValue1 = "";
            this.datas = {};
            this.entities = {};
            this.columnInfos = [];
            this.url = "http://localhost:8081/kuaisuadmin/crm/buyers/pickerByKeyword.do";
            this.$scope = $scope;
            this.datas = {
                rows: [
                    { id: 1, customerName: "王经理", customerPhone: 18692009420, customerCompany: "KLKLKLK" },
                    { id: 2, customerName: "bbc", customerPhone: 13748747895, customerCompany: "KLKLKLK" },
                    { id: 3, customerName: "cce", customerPhone: 13810021458, customerCompany: "KLKLKLK" },
                    { id: 4, customerName: "ddy", customerPhone: 4, customerCompany: "KLKLKLK" },
                    { id: 5, customerName: "ee b", customerPhone: 5, customerCompany: "KLKLKLK" },
                    { id: 6, customerName: "ffc", customerPhone: 6, customerCompany: "KLKLKLK" },
                    { id: 7, customerName: "ggh", customerPhone: 7, customerCompany: "KLKLKLK" },
                    { id: 1, customerName: "王经理", customerPhone: 18692009420, customerCompany: "KLKLKLK" },
                    { id: 2, customerName: "bbc", customerPhone: 13748747895, customerCompany: "KLKLKLK" },
                    { id: 3, customerName: "cce", customerPhone: 13810021458, customerCompany: "KLKLKLK" },
                    { id: 4, customerName: "ddy", customerPhone: 4, customerCompany: "KLKLKLK" },
                    { id: 5, customerName: "ee b", customerPhone: 5, customerCompany: "KLKLKLK" },
                    { id: 6, customerName: "ffc", customerPhone: 6, customerCompany: "KLKLKLK" },
                    { id: 7, customerName: "ggh", customerPhone: 7, customerCompany: "KLKLKLK" }
                ],
                total: 3999
            };
            this.entities = [{ id: 1, name: "王经理" }, { id: 2, name: "bbc" }, { id: 3, name: "cce" }, { id: 4, name: "ddy" }, { id: 5, name: "ee b" }, { id: 6, name: "ffc" }, { id: 7, name: "ggh" }, { id: 8, name: "王经理" }, { id: 9, name: "bbc" }, { id: 10, name: "cce" }, { id: 11, name: "ddy" }, { id: 12, name: "ee b" }, { id: 13, name: "ffc" }, { id: 14, name: "ggh" }];
            //this.datas = [];
            this.columnInfos = [
                { field: "customerName", label: "客户姓名", width: 150, align: 'left' },
                { field: "customerPhone", label: "客户电话", width: 150, align: 'left' }
            ];
        }
        AutoCompleteController.prototype.fn = function () {
            console.info("FN....");
        };
        AutoCompleteController.prototype.reset = function () {
            this.selectedValue = null;
        };
        AutoCompleteController.$inject = ['$scope', 'ksEntityService', 'ksTip'];
        return AutoCompleteController;
    })(ks.BaseController);
    var app = angular.module("DemoApp", ['ks.all']);
    app.controller('AutoCompleteController', AutoCompleteController);
})(KsDemo || (KsDemo = {}));
//# sourceMappingURL=autoComplate.js.map