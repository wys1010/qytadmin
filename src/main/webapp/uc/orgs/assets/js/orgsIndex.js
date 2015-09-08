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
    var TreeItem = (function () {
        function TreeItem() {
            this._expanded = true;
        }
        return TreeItem;
    })();
    OrganizationIndexApp.TreeItem = TreeItem;
    var SelectOrgsController = (function (_super) {
        __extends(SelectOrgsController, _super);
        function SelectOrgsController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.queryCondition = new nk.PagingQueryCondition();
            this.baseUrl = this.webRoot + '/uc/orgs';
            this.showDetail = true;
            this.showRemoveBtn = false;
            this.selectOrgs();
            this.resizeLayout();
        }
        SelectOrgsController.prototype.resizeLayout = function () {
            $("#treeWrap").height(window.innerHeight - 45);
        };
        SelectOrgsController.prototype.onBackToRoot = function (data) {
            if (data.isChanged) {
                this.selectOrgs();
            }
        };
        SelectOrgsController.prototype.selectOrgs = function () {
            var me = this;
            this.ksEntityService.get(this.baseUrl + '/allOrganizations.do', null).success(function (organizations) {
                var ds = [];
                for (var key in organizations) {
                    var organization = organizations[key];
                    if (organization.parentId == null) {
                        var treeItem = new TreeItem();
                        treeItem.id = organization.id;
                        treeItem.text = organization.name;
                        treeItem._iconCls = "uc-icon-module";
                        treeItem.children = [];
                        treeItem.organization = organization;
                        me.findTreeItems(organizations, organization, treeItem.children);
                        ds.push(treeItem);
                    }
                }
                me.treeData = ds;
            }).error(function () {
                console.log("查询失败");
            });
        };
        SelectOrgsController.prototype.findTreeItems = function (organizations, organization, treeItems) {
            for (var key in organizations) {
                var current = organizations[key];
                if (current.parentId == organization.id) {
                    var treeItem = new TreeItem();
                    treeItem.id = current.id;
                    treeItem._iconCls = "uc-icon-leaf";
                    treeItem.text = current.name;
                    treeItem.organization = current;
                    treeItem.children = [];
                    treeItems.push(treeItem);
                    this.findTreeItems(organizations, current, treeItem.children);
                    if (treeItem.children.length <= 0)
                        treeItem.children = null;
                }
            }
        };
        SelectOrgsController.prototype.doDelete = function () {
            var me = this;
            this.ksTip.confirm("确定删除" + this.selectedItem.organization.name + "吗？").ok(function () {
                var url = me.baseUrl + '/delete/' + me.selectedItem.organization.id + '.do';
                me.ksEntityService.delete(url).success(function () {
                    me.selectOrgs();
                }).error(function (error) {
                    if (error == undefined) {
                        me.ksTip.error("糟糕系统异常,请稍后再试！");
                    }
                    else {
                        me.ksTip.error(error);
                    }
                });
            });
        };
        SelectOrgsController.prototype.onTreeNodeSelected = function () {
            this.showRemoveBtn = true;
            this.putAppCache("currentOrgs", this.selectedItem.organization);
            this.emit("selectedOrgsChange", this.selectedItem.organization);
            this.$scope.$digest();
        };
        SelectOrgsController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return SelectOrgsController;
    })(nk.BaseController);
    k.getApp("OrganizationIndexApp").registerController("selectOrgs", SelectOrgsController);
})(OrganizationIndexApp || (OrganizationIndexApp = {}));
//# sourceMappingURL=orgsIndex.js.map