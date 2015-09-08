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
    var EditController = (function (_super) {
        __extends(EditController, _super);
        function EditController($scope, $state, $stateParams, ksEntityService) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.dlgTitle = "新增";
            this.selectedId = $stateParams.id;
        }
        EditController.prototype.saveEntity = function () {
            console.log("saveEntity in edit:");
            this.pushParam("isChanged", true);
            this.pushParam("data", { age: 11 });
            this.dismiss();
        };
        EditController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService'];
        return EditController;
    })(nk.PopUpController);
    k.getApp("MyApp").registerController("edit", EditController);
})(MyApp || (MyApp = {}));
//# sourceMappingURL=/edit.js.map
//# sourceMappingURL=edit.js.map