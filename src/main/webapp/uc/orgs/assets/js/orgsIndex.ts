/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts" />
/// <reference path="../../../../platform/resource/ks/ts/nk.ts"/>
/// <reference path="../../../../uc/domains/uc-domains.ts"/>
module OrganizationIndexApp {

    export class TreeItem {
        id:number
        _iconCls:string
        text:string
        _expanded = true
        children:Array<TreeItem>
        organization:ks.domains.uc.Organization
    }

    class SelectOrgsController extends nk.BaseController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition();
        entities:Array<any>;
        baseUrl:string = this.webRoot + '/uc/orgs';

        selectedItem:TreeItem;// 选中的节点
        showDetail = true;
        treeData:Array<TreeItem>;
        showRemoveBtn:boolean = false;

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.selectOrgs();
            this.resizeLayout();
        }

        resizeLayout(){
            $("#treeWrap").height(window.innerHeight - 45);
        }

        onBackToRoot(data) {
            if (data.isChanged) {
                this.selectOrgs();
            }
        }


        selectOrgs() {

            var me = this;
            this.ksEntityService.get(this.baseUrl + '/allOrganizations.do', null)
                .success(function (organizations) {

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
                    console.log("查询失败")
                })
        }


        findTreeItems(organizations:Array<ks.domains.uc.Organization>,
                      organization:ks.domains.uc.Organization,
                      treeItems:Array<TreeItem>):void {
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
        }


        doDelete() {
            var me = this;
            this.ksTip.confirm("确定删除" + this.selectedItem.organization.name + "吗？").ok(function () {
                var url = me.baseUrl + '/delete/' + me.selectedItem.organization.id + '.do';
                me.ksEntityService.delete(url).success(()=> {
                    me.selectOrgs();
                }).error((error)=> {
                    if (error == undefined) {
                        me.ksTip.error("糟糕系统异常,请稍后再试！");
                    } else {
                        me.ksTip.error(error);
                    }
                });

            });
        }


        onTreeNodeSelected() {
            this.showRemoveBtn = true;
            this.putAppCache("currentOrgs", this.selectedItem.organization);
            this.emit("selectedOrgsChange", this.selectedItem.organization);
            this.$scope.$digest();
        }

    }

    k.getApp("OrganizationIndexApp").registerController("selectOrgs", SelectOrgsController);
}


