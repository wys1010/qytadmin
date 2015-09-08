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
/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../uc/domains/uc-domains.ts"/>
var RoleIndexApp;
(function (RoleIndexApp) {
    'use strict';
    var IndexController = (function (_super) {
        __extends(IndexController, _super);
        function IndexController($scope, k) {
            _super.call(this);
            this.$scope = $scope;
            this.k = k;
        }
        IndexController.prototype.autoFit = function () {
            var winHeight = this.k.getWinHeight() - 20;
            $("#staffsPermissionsWrap").height(winHeight);
            $("#rolesWrap").height(winHeight);
            $("#rolesGrid").height(winHeight - 90);
            var staffsGridWrapHeight = winHeight - 85;
            $("#staffsGridWrap").height(staffsGridWrapHeight);
            $("#staffsGrid").height(staffsGridWrapHeight - 40);
            $("#rolesGrid .body").height(winHeight - 125);
            $("#staffsGrid .body").height(staffsGridWrapHeight - 80);
            $("#permissionTreeWrap").height(winHeight - 125);
        };
        IndexController.prototype.bindEvents = function () {
            var me = this;
            this.autoFit();
            setTimeout(function () {
                me.autoFit();
            }, 1000);
            setTimeout(function () {
                me.autoFit();
            }, 2000);
            $(window).resize(function () {
                me.autoFit();
            });
        };
        return IndexController;
    })(ks.Controller);
    RoleIndexApp.IndexController = IndexController;
})(RoleIndexApp || (RoleIndexApp = {}));
//# sourceMappingURL=index_roles.js.map