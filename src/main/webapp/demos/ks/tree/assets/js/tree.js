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
            this.appName = '进度条demo';
            this.treeData = null;
            this.selectedItem = null;
            this.selectedItem2 = null;
            this.treeData2 = [
                { id: "testData", _iconCls: "ks-icon-leaf", text: "angularJs", _expanded: true, href: "/management/test_data/index.do" },
                { id: 'ucAs', text: "ks开发助手", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "tables", _iconCls: "ks-icon-leaf", text: "查看所有表", _expanded: true, href: "/platform/devassistant/pages/tables.do" },
                    { id: "single_table", _iconCls: "ks-icon-leaf", text: "单表模块", _expanded: true, href: "/platform/devassistant/pages/single_table.do" },
                    { id: "double_table", _iconCls: "ks-icon-leaf", text: "主子表模块", _expanded: true, href: "/platform/devassistant/pages/double_table.do" }
                ] },
                { id: 'sysM', text: "系统管理", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "users", _iconCls: "ks-icon-leaf", text: "用户管理", _expanded: true, href: "/platform/users/index.do" },
                    { id: "orgs", _iconCls: "ks-icon-leaf", text: "组织机构管理", _expanded: true, href: "/platform/orgs/index.do" },
                    { id: "duties", _iconCls: "ks-icon-leaf", text: "职位管理", _expanded: true, href: "/platform/duties/index.do" },
                    { id: "posts", _iconCls: "ks-icon-leaf", text: "岗位管理", _expanded: true, href: "/platform/posts/index.do" },
                    { id: "staffs", _iconCls: "ks-icon-leaf", text: "员工管理", _expanded: true, href: "/platform/staffs/index.do" },
                    { id: "roles", _iconCls: "ks-icon-leaf", text: "权限管理", _expanded: true, href: "/platform/privileges/index.do" },
                    { id: "dicts", _iconCls: "ks-icon-leaf", text: "字典管理", _expanded: true, href: "/platform/dicts/index.do" },
                    { id: "sys", _iconCls: "ks-icon-leaf", text: "系统监控", _expanded: true, href: "/platform/sys/index.do" }
                ] },
                { id: 'demoSys', text: "演示系统", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "single", _iconCls: "ks-icon-leaf", text: "restful-单表", _expanded: true, href: "/platform/users/index.do" },
                    { id: "complex", _iconCls: "ks-icon-leaf", text: "restful-主子表", _expanded: true, href: "/platform/users/index.do" },
                    { id: "gis", _iconCls: "ks-icon-leaf", text: "GIS地图", _expanded: true, href: "/platform/users/index.do" },
                    { id: "routes", _iconCls: "ks-icon-leaf", text: "routes", _expanded: true, href: "/management/demos/routes.do" }
                ] },
                { id: 'ssss', text: "ks框架开发帮助文档", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "ui", text: "前端UI", _expanded: true, children: [
                        { id: "tabbar", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件", _expanded: true, children: [
                            { id: "tabbar2", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件demo1", _expanded: true },
                            { id: "tabbar3", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件2", _expanded: true },
                            { id: "tabbar4", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件3", _expanded: true }
                        ] }
                    ] }
                ] }
            ];
            this.$scope = $scope;
            this.treeData = [
                { id: "testData", _iconCls: "ks-icon-leaf", text: "angularJs", _expanded: true, href: "/management/test_data/index.do" },
                { id: 'ucAs', text: "ks开发助手", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "tables", _iconCls: "ks-icon-leaf", text: "查看所有表", _expanded: true, href: "/platform/devassistant/pages/tables.do" },
                    { id: "single_table", _iconCls: "ks-icon-leaf", text: "单表模块", _expanded: true, href: "/platform/devassistant/pages/single_table.do" },
                    { id: "double_table", _iconCls: "ks-icon-leaf", text: "主子表模块", _expanded: true, href: "/platform/devassistant/pages/double_table.do" }
                ] },
                { id: 'sysM', text: "系统管理", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "users", _iconCls: "ks-icon-leaf", text: "用户管理", _expanded: true, href: "/platform/users/index.do" },
                    { id: "orgs", _iconCls: "ks-icon-leaf", text: "组织机构管理", _expanded: true, href: "/platform/orgs/index.do" },
                    { id: "duties", _iconCls: "ks-icon-leaf", text: "职位管理", _expanded: true, href: "/platform/duties/index.do" },
                    { id: "posts", _iconCls: "ks-icon-leaf", text: "岗位管理", _expanded: true, href: "/platform/posts/index.do" },
                    { id: "staffs", _iconCls: "ks-icon-leaf", text: "员工管理", _expanded: true, href: "/platform/staffs/index.do" },
                    { id: "roles", _iconCls: "ks-icon-leaf", text: "权限管理", _expanded: true, href: "/platform/privileges/index.do" },
                    { id: "dicts", _iconCls: "ks-icon-leaf", text: "字典管理", _expanded: true, href: "/platform/dicts/index.do" },
                    { id: "sys", _iconCls: "ks-icon-leaf", text: "系统监控", _expanded: true, href: "/platform/sys/index.do" }
                ] },
                { id: 'demoSys', text: "演示系统", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "single", _iconCls: "ks-icon-leaf", text: "restful-单表", _expanded: true, href: "/platform/users/index.do" },
                    { id: "complex", _iconCls: "ks-icon-leaf", text: "restful-主子表", _expanded: true, href: "/platform/users/index.do" },
                    { id: "gis", _iconCls: "ks-icon-leaf", text: "GIS地图", _expanded: true, href: "/platform/users/index.do" },
                    { id: "routes", _iconCls: "ks-icon-leaf", text: "routes", _expanded: true, href: "/management/demos/routes.do" }
                ] },
                { id: 'ssss', text: "ks框架开发帮助文档", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "ui", text: "前端UI", _expanded: true, children: [
                        { id: "tabbar", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件", _expanded: true, children: [
                            { id: "tabbar2", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件demo1", _expanded: true },
                            { id: "tabbar3", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件2", _expanded: true },
                            { id: "tabbar4", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件3", _expanded: true }
                        ] }
                    ] }
                ] }
            ];
        }
        CommonController.prototype.clearSelectedItem = function () {
            this.selectedItem = null;
        };
        CommonController.prototype.clearCheckedItems = function () {
            this.checkedItems = null;
        };
        CommonController.prototype.refreshData = function () {
            this.treeData = [
                { id: "testData", _iconCls: "ks-icon-leaf", text: "angularJs", _expanded: true, href: "/management/test_data/index.do" },
                { id: 'ucAs', text: "ks开发助手", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "tables", _iconCls: "ks-icon-leaf", text: "查看所有表", _expanded: true, href: "/platform/devassistant/pages/tables.do" },
                    { id: "single_table", _iconCls: "ks-icon-leaf", text: "单表模块", _expanded: true, href: "/platform/devassistant/pages/single_table.do" },
                    { id: "double_table", _iconCls: "ks-icon-leaf", text: "主子表模块", _expanded: true, href: "/platform/devassistant/pages/double_table.do" }
                ] },
                { id: 'sysM', text: "系统管理", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "users", _iconCls: "ks-icon-leaf", text: "用户管理", _expanded: true, href: "/platform/users/index.do" },
                    { id: "orgs", _iconCls: "ks-icon-leaf", text: "组织机构管理", _expanded: true, href: "/platform/orgs/index.do" },
                    { id: "duties", _iconCls: "ks-icon-leaf", text: "职位管理", _expanded: true, href: "/platform/duties/index.do" },
                    { id: "posts", _iconCls: "ks-icon-leaf", text: "岗位管理", _expanded: true, href: "/platform/posts/index.do" },
                    { id: "staffs", _iconCls: "ks-icon-leaf", text: "员工管理", _expanded: true, href: "/platform/staffs/index.do" },
                    { id: "roles", _iconCls: "ks-icon-leaf", text: "权限管理", _expanded: true, href: "/platform/privileges/index.do" },
                    { id: "dicts", _iconCls: "ks-icon-leaf", text: "字典管理", _expanded: true, href: "/platform/dicts/index.do" },
                    { id: "sys", _iconCls: "ks-icon-leaf", text: "系统监控", _expanded: true, href: "/platform/sys/index.do" }
                ] },
                { id: 'demoSys', text: "演示系统", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "single", _iconCls: "ks-icon-leaf", text: "restful-单表", _expanded: true, href: "/platform/users/index.do" },
                    { id: "complex", _iconCls: "ks-icon-leaf", text: "restful-主子表", _expanded: true, href: "/platform/users/index.do" },
                    { id: "gis", _iconCls: "ks-icon-leaf", text: "GIS地图", _expanded: true, href: "/platform/users/index.do" },
                    { id: "routes", _iconCls: "ks-icon-leaf", text: "routes", _expanded: true, href: "/management/demos/routes.do" }
                ] },
                { id: 'ssss', text: "ks框架开发帮助文档", _iconCls: "ks-icon-module", _expanded: true, children: [
                    { id: "ui", text: "前端UI", _expanded: true, children: [
                        { id: "tabbar", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件", _expanded: true, children: [
                            { id: "tabbar2", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件demo1", _expanded: true },
                            { id: "tabbar3", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件2", _expanded: true },
                            { id: "tabbar4", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件3", _expanded: true }
                        ] }
                    ] }
                ] }
            ];
        };
        CommonController.prototype.onTreeNodeSelected = function () {
            console.log("selectedItem:", this.selectedItem);
            this.selectedItem2 = this.selectedItem;
            this.$scope.$digest();
        };
        CommonController.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        CommonController.$inject = ['$scope', 'ksEntityService', 'ksTip'];
        return CommonController;
    })(ks.BaseController);
    var app = angular.module("DemoApp", ['ks.all']);
    app.controller('CommonController', CommonController);
})(KsDemo || (KsDemo = {}));
//# sourceMappingURL=tree.js.map