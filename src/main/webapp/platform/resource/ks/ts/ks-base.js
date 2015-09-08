/// <reference path="ks-ts-all.ts"/>
/// <reference path="../../../../ts-lib/angularjs/angular.d.ts" />
var ks;
(function (ks) {
    var BaseController = (function () {
        function BaseController($scope) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.init();
        }
        BaseController.prototype.init = function () {
        };
        return BaseController;
    })();
    ks.BaseController = BaseController;
    var Controller = (function () {
        function Controller() {
            this.webRoot = window.webRoot;
        }
        return Controller;
    })();
    ks.Controller = Controller;
    var __extends = function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        __.prototype = b.prototype;
        d.prototype = new __();
    };
    function makeModule(name, m, injects) {
        console.log("makeModule--->", m.toString());
        var app = angular.module(name, injects);
        for (var ctrlName in m) {
            console.log("ctrl:", ctrlName);
            var ctrl = m[ctrlName];
            var proto = ctrl.prototype;
            var injectsNum = ctrl.$injects.length;
            var constructStr = ctrl.toString();
            var bodyStr = constructStr.substring(constructStr.indexOf("{"));
            var realConstructor = eval("(function(" + ctrl.$injects.join(",") + ")" + bodyStr + ")");
            console.log("realConstructor:", realConstructor);
            realConstructor.$injects = ctrl.$injects;
            realConstructor.prototype = ctrl.prototype;
            app.controller(ctrlName, realConstructor);
        }
    }
    ks.makeModule = makeModule;
})(ks || (ks = {}));
//# sourceMappingURL=ks-base.js.map