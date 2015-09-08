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
    var SelectRoleController = (function (_super) {
        __extends(SelectRoleController, _super);
        function SelectRoleController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.selectEntities(true);
        }
        SelectRoleController.prototype.onBackToRoot = function (data) {
        };
        SelectRoleController.prototype.selectRow = function (row) {
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.selected = false;
            }
            row.selected = true;
            this.emit("selectedRoleChange", row);
        };
        SelectRoleController.prototype.selectEntities = function (resetPaging) {
            var me = this;
            this.ksEntityService.get(me.webRoot + '/uc/privileges/roles.do', {}, function (roles) {
                me.entities = roles;
                if (me.entities && me.entities.length > 0) {
                    me.entities[0].selected = true;
                    me.$scope.$emit("selectedRoleChange", me.entities[0]);
                }
                me.putAppCache("roles", angular.copy(roles));
            }, function () {
                me.ksTip.error("查询出错");
            });
        };
        SelectRoleController.prototype.onSelectedChange = function () {
        };
        SelectRoleController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return SelectRoleController;
    })(nk.BaseController);
    k.getApp("MyApp").registerController("selectRole", SelectRoleController);
})(MyApp || (MyApp = {}));
//# sourceMappingURL=selectRole.js.map