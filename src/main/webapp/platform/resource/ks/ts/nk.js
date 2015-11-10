/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var nk;
(function (nk) {
    var BaseDomain = (function () {
        function BaseDomain() {
        }
        return BaseDomain;
    })();
    nk.BaseDomain = BaseDomain;
    var PagingQueryCondition = (function () {
        function PagingQueryCondition() {
            this.start = 0;
            this.pageSize = 0;
            this.limit = 10;
            this.results = 0;
            this.pageIndex = 0;
        }
        return PagingQueryCondition;
    })();
    nk.PagingQueryCondition = PagingQueryCondition;
    var BaseController = (function () {
        function BaseController($scope, $state, $stateParams) {
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.webRoot = window.webRoot;
            this.version = window.version;
            this.layer = window.layer; //layer弹窗
            var me = this;
            //  自定义ctrl之间的事件
            this.$scope.$on("KsEvent", function (event, msg) {
                if (me.ksName === msg.controller) {
                    return;
                }
                var name = msg.name.replace(/[\w]/, function ($) {
                    return $.toUpperCase();
                });
                var data = msg.data;
                var handler = me["on" + name];
                if (handler) {
                    handler.call(me, angular.copy(data));
                }
            });
            // state切换事件
            $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name === 'root') {
                    var handler = me.onBackToRoot;
                    if (handler) {
                        me.onBackToRoot.call(me, fromState.data);
                    }
                }
            });
        }
        BaseController.prototype.onBackToRoot = function (data) {
        };
        BaseController.prototype.go = function (name, data) {
            this.$state.go(name, data);
        };
        BaseController.prototype.putAppCache = function (key, value) {
            var page = this.ksPage;
            if (!page) {
                alert("putCache失败!");
                return;
            }
            var app = page.app;
            if (!app) {
                alert("putCache失败!");
                return;
            }
            if (!app.cache) {
                alert("putCache失败!");
                return;
            }
            app.cache[key] = value;
        };
        BaseController.prototype.getAppCache = function (key) {
            var page = this.ksPage;
            if (!page) {
                alert("putCache失败!");
                return;
            }
            var app = page.app;
            if (!app) {
                alert("putCache失败!");
                return;
            }
            if (!app.cache) {
                alert("putCache失败!");
                return;
            }
            return app.cache[key];
        };
        //会被k.Controller 覆盖，用以注入内部处理需要的信息
        BaseController.prototype._getCtrlInfo = function () {
        };
        BaseController.prototype.emit = function (name, data) {
            this.$scope.$emit("KsEvent", { name: name, data: data, controller: this.ksName });
        };
        return BaseController;
    })();
    nk.BaseController = BaseController;
    var PopUpController = (function (_super) {
        __extends(PopUpController, _super);
        function PopUpController($scope, $state, $stateParams) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this._resetParam();
        }
        PopUpController.prototype.dismiss = function () {
            this.$scope.$dismiss();
        };
        PopUpController.prototype.pushParam = function (key, value) {
            this.$state.current.data[key] = value;
        };
        PopUpController.prototype.deleteParam = function (key) {
            delete this.$state.current.data[key];
        };
        PopUpController.prototype._resetParam = function () {
            this.$state.current.data = {};
        };
        return PopUpController;
    })(BaseController);
    nk.PopUpController = PopUpController;
})(nk || (nk = {}));
//# sourceMappingURL=nk.js.map