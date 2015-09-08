var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts" />
/// <reference path="../../../../platform/resource/ks/ts/nk.ts"/>
/// <reference path="../../../../uc/domains/uc-domains.ts"/>
var OrganizationIndexApp;
(function (OrganizationIndexApp) {
    var EditOrgsController = (function (_super) {
        __extends(EditOrgsController, _super);
        function EditOrgsController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.baseUrl = this.webRoot + '/uc/orgs';
            this.isAdd = $stateParams.id ? false : true;
            this.selectOrgsById($stateParams.id);
        }
        EditOrgsController.prototype.onBackToRoot = function (data) {
        };
        EditOrgsController.prototype.selectOrgsById = function (id) {
            if (this.isAdd) {
                this.currentOrganization = new ks.domains.uc.Organization();
                this.currentOrganization.code = "";
                this.currentOrganization.disable = false;
            }
            else {
                this.currentOrganization = this.getAppCache("currentOrgs");
                this.currentOrganization.createdAt = null;
                this.currentOrganization.updatedAt = null;
            }
        };
        EditOrgsController.prototype.onSave = function () {
            var optype = this.isAdd ? "/add.do" : "/update.do";
            var url = this.baseUrl + optype;
            var me = this;
            this.ksEntityService.post(url, this.currentOrganization).success(function (data) {
                me.ksTip.success('操作成功');
                me.$state.current.data.isChanged = true;
                me.dismiss();
            }).error(function () {
                me.ksTip.error('系统内部错误');
            });
        };
        EditOrgsController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return EditOrgsController;
    })(nk.PopUpController);
    k.getApp("OrganizationIndexApp").registerController("editOrgs", EditOrgsController);
})(OrganizationIndexApp || (OrganizationIndexApp = {}));
//# sourceMappingURL=orgsEdit.js.map