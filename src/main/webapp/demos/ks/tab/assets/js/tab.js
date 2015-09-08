// Author: Wangyiqun
// Date: 2015年02月25日
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts" />
var KsDemo;
(function (KsDemo) {
    'use strict';
    var CommonController = (function (_super) {
        __extends(CommonController, _super);
        function CommonController($scope) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _super.call(this, $scope, args);
            this.wordSelected = true;
            this.$scope = $scope;
        }
        CommonController.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        CommonController.$inject = ['$scope', 'ksEntityService', 'ksTip'];
        return CommonController;
    })(ks.BaseController);
    var app = angular.module("DemoApp", ['ks.all']);
    app.controller('CommonController', CommonController);
})(KsDemo || (KsDemo = {}));
//# sourceMappingURL=tab.js.map