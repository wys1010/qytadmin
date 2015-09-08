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
    var SelectStaffController = (function (_super) {
        __extends(SelectStaffController, _super);
        function SelectStaffController($scope, $state, $stateParams, ksEntityService, $filter) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            console.log("select staff---");
        }
        SelectStaffController.prototype.onSelectedRoleChange = function (roleSelected) {
            console.log("onSelectedRoleChange in selectStaff");
            this.selectedRole = roleSelected;
        };
        SelectStaffController.prototype.testCache = function () {
            console.log(this.getAppCache("roles"));
        };
        SelectStaffController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter'];
        return SelectStaffController;
    })(nk.BaseController);
    k.getApp("MyApp").registerController("selectStaff", SelectStaffController);
})(MyApp || (MyApp = {}));
//# sourceMappingURL=selectStaff.js.map