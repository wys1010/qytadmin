// Author: Wangyiqun
// Date: 2015年02月25日

/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts" />

 module KsDemo{
        'use strict';

        class CommonController extends ks.BaseController{

            selectedId:number;
            appName:string = '进度条demo';
            treeData:Array<Object> = null;
            selectedItem:Object = null;
            selectedItem2:Object = null;
            checkedItems:Array<Object>;
            checkedIds:Array<string>;
            pbVisible:boolean;
            treeData2:Array<Object> =  [
                {id: "testData", _iconCls: "ks-icon-leaf", text: "angularJs", _expanded: true, href: "/management/test_data/index.do"},
                {id:'ucAs',text: "ks开发助手",_iconCls: "ks-icon-module", _expanded: true, children: [
                    {id: "tables", _iconCls: "ks-icon-leaf", text: "查看所有表", _expanded: true, href: "/platform/devassistant/pages/tables.do"},
                    {id: "single_table", _iconCls: "ks-icon-leaf", text: "单表模块", _expanded: true, href: "/platform/devassistant/pages/single_table.do"},
                    {id: "double_table", _iconCls: "ks-icon-leaf", text: "主子表模块", _expanded: true, href: "/platform/devassistant/pages/double_table.do"}
                ]},
                {id:'sysM',text: "系统管理",_iconCls: "ks-icon-module", _expanded: true, children: [
                    {id: "users", _iconCls: "ks-icon-leaf", text: "用户管理", _expanded: true, href: "/platform/users/index.do"},
                    {id: "orgs", _iconCls: "ks-icon-leaf", text: "组织机构管理", _expanded: true, href: "/platform/orgs/index.do"},
                    {id: "duties", _iconCls: "ks-icon-leaf", text: "职位管理", _expanded: true, href: "/platform/duties/index.do"},
                    {id: "posts", _iconCls: "ks-icon-leaf", text: "岗位管理", _expanded: true, href: "/platform/posts/index.do"},
                    {id: "staffs", _iconCls: "ks-icon-leaf", text: "员工管理", _expanded: true, href: "/platform/staffs/index.do"},
                    {id: "roles", _iconCls: "ks-icon-leaf", text: "权限管理", _expanded: true, href: "/platform/privileges/index.do"},
                    {id: "dicts", _iconCls: "ks-icon-leaf", text: "字典管理", _expanded: true, href: "/platform/dicts/index.do"},
                    {id: "sys", _iconCls: "ks-icon-leaf", text: "系统监控", _expanded: true, href: "/platform/sys/index.do"}
                ]},
                {id:'demoSys',text: "演示系统", _iconCls: "ks-icon-module",_expanded: true, children: [
                    {id: "single", _iconCls: "ks-icon-leaf", text: "restful-单表", _expanded: true, href: "/platform/users/index.do"},
                    {id: "complex", _iconCls: "ks-icon-leaf", text: "restful-主子表", _expanded: true, href: "/platform/users/index.do"},
                    {id: "gis", _iconCls: "ks-icon-leaf", text: "GIS地图", _expanded: true, href: "/platform/users/index.do"},
                    {id: "routes", _iconCls: "ks-icon-leaf", text: "routes", _expanded: true, href: "/management/demos/routes.do"}
                ]},
                {id:'ssss',text: "ks框架开发帮助文档",_iconCls: "ks-icon-module", _expanded: true, children: [
                    {id: "ui", text: "前端UI", _expanded: true, children: [
                        {id: "tabbar", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件", _expanded: true,children:[
                            {id: "tabbar2", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件demo1", _expanded: true},
                            {id: "tabbar3", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件2", _expanded: true},
                            {id: "tabbar4", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件3", _expanded: true}
                        ]}
                    ]}
                ]}
            ];

            static $inject = ['$scope','ksEntityService','ksTip'];

            constructor($scope:ng.IScope,...args:any[]) {
                super($scope,args);
                this.$scope = $scope;
                this.treeData =  [
                    {id: "testData", _iconCls: "ks-icon-leaf", text: "angularJs", _expanded: true, href: "/management/test_data/index.do"},
                    {id:'ucAs',text: "ks开发助手",_iconCls: "ks-icon-module", _expanded: true, children: [
                        {id: "tables", _iconCls: "ks-icon-leaf", text: "查看所有表", _expanded: true, href: "/platform/devassistant/pages/tables.do"},
                        {id: "single_table", _iconCls: "ks-icon-leaf", text: "单表模块", _expanded: true, href: "/platform/devassistant/pages/single_table.do"},
                        {id: "double_table", _iconCls: "ks-icon-leaf", text: "主子表模块", _expanded: true, href: "/platform/devassistant/pages/double_table.do"}
                    ]},
                    {id:'sysM',text: "系统管理",_iconCls: "ks-icon-module", _expanded: true, children: [
                        {id: "users", _iconCls: "ks-icon-leaf", text: "用户管理", _expanded: true, href: "/platform/users/index.do"},
                        {id: "orgs", _iconCls: "ks-icon-leaf", text: "组织机构管理", _expanded: true, href: "/platform/orgs/index.do"},
                        {id: "duties", _iconCls: "ks-icon-leaf", text: "职位管理", _expanded: true, href: "/platform/duties/index.do"},
                        {id: "posts", _iconCls: "ks-icon-leaf", text: "岗位管理", _expanded: true, href: "/platform/posts/index.do"},
                        {id: "staffs", _iconCls: "ks-icon-leaf", text: "员工管理", _expanded: true, href: "/platform/staffs/index.do"},
                        {id: "roles", _iconCls: "ks-icon-leaf", text: "权限管理", _expanded: true, href: "/platform/privileges/index.do"},
                        {id: "dicts", _iconCls: "ks-icon-leaf", text: "字典管理", _expanded: true, href: "/platform/dicts/index.do"},
                        {id: "sys", _iconCls: "ks-icon-leaf", text: "系统监控", _expanded: true, href: "/platform/sys/index.do"}
                    ]},
                    {id:'demoSys',text: "演示系统", _iconCls: "ks-icon-module",_expanded: true, children: [
                        {id: "single", _iconCls: "ks-icon-leaf", text: "restful-单表", _expanded: true, href: "/platform/users/index.do"},
                        {id: "complex", _iconCls: "ks-icon-leaf", text: "restful-主子表", _expanded: true, href: "/platform/users/index.do"},
                        {id: "gis", _iconCls: "ks-icon-leaf", text: "GIS地图", _expanded: true, href: "/platform/users/index.do"},
                        {id: "routes", _iconCls: "ks-icon-leaf", text: "routes", _expanded: true, href: "/management/demos/routes.do"}
                    ]},
                    {id:'ssss',text: "ks框架开发帮助文档",_iconCls: "ks-icon-module", _expanded: true, children: [
                        {id: "ui", text: "前端UI", _expanded: true, children: [
                            {id: "tabbar", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件", _expanded: true,children:[
                                {id: "tabbar2", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件demo1", _expanded: true},
                                {id: "tabbar3", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件2", _expanded: true},
                                {id: "tabbar4", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件3", _expanded: true}
                            ]}
                        ]}
                    ]}
                ];

            }

            clearSelectedItem(){
                this.selectedItem = null;
            }

            clearCheckedItems(){
                this.checkedItems = null;
            }

            refreshData(){
                this.treeData =  [
                    {id: "testData", _iconCls: "ks-icon-leaf", text: "angularJs", _expanded: true, href: "/management/test_data/index.do"},
                    {id:'ucAs',text: "ks开发助手",_iconCls: "ks-icon-module", _expanded: true, children: [
                        {id: "tables", _iconCls: "ks-icon-leaf", text: "查看所有表", _expanded: true, href: "/platform/devassistant/pages/tables.do"},
                        {id: "single_table", _iconCls: "ks-icon-leaf", text: "单表模块", _expanded: true, href: "/platform/devassistant/pages/single_table.do"},
                        {id: "double_table", _iconCls: "ks-icon-leaf", text: "主子表模块", _expanded: true, href: "/platform/devassistant/pages/double_table.do"}
                    ]},
                    {id:'sysM',text: "系统管理",_iconCls: "ks-icon-module", _expanded: true, children: [
                        {id: "users", _iconCls: "ks-icon-leaf", text: "用户管理", _expanded: true, href: "/platform/users/index.do"},
                        {id: "orgs", _iconCls: "ks-icon-leaf", text: "组织机构管理", _expanded: true, href: "/platform/orgs/index.do"},
                        {id: "duties", _iconCls: "ks-icon-leaf", text: "职位管理", _expanded: true, href: "/platform/duties/index.do"},
                        {id: "posts", _iconCls: "ks-icon-leaf", text: "岗位管理", _expanded: true, href: "/platform/posts/index.do"},
                        {id: "staffs", _iconCls: "ks-icon-leaf", text: "员工管理", _expanded: true, href: "/platform/staffs/index.do"},
                        {id: "roles", _iconCls: "ks-icon-leaf", text: "权限管理", _expanded: true, href: "/platform/privileges/index.do"},
                        {id: "dicts", _iconCls: "ks-icon-leaf", text: "字典管理", _expanded: true, href: "/platform/dicts/index.do"},
                        {id: "sys", _iconCls: "ks-icon-leaf", text: "系统监控", _expanded: true, href: "/platform/sys/index.do"}
                    ]},
                    {id:'demoSys',text: "演示系统", _iconCls: "ks-icon-module",_expanded: true, children: [
                        {id: "single", _iconCls: "ks-icon-leaf", text: "restful-单表", _expanded: true, href: "/platform/users/index.do"},
                        {id: "complex", _iconCls: "ks-icon-leaf", text: "restful-主子表", _expanded: true, href: "/platform/users/index.do"},
                        {id: "gis", _iconCls: "ks-icon-leaf", text: "GIS地图", _expanded: true, href: "/platform/users/index.do"},
                        {id: "routes", _iconCls: "ks-icon-leaf", text: "routes", _expanded: true, href: "/management/demos/routes.do"}
                    ]},
                    {id:'ssss',text: "ks框架开发帮助文档",_iconCls: "ks-icon-module", _expanded: true, children: [
                        {id: "ui", text: "前端UI", _expanded: true, children: [
                            {id: "tabbar", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件", _expanded: true,children:[
                                {id: "tabbar2", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件demo1", _expanded: true},
                                {id: "tabbar3", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件2", _expanded: true},
                                {id: "tabbar4", _iconCls: "ks-icon-leaf", text: "ks.Tabbar组件3", _expanded: true}
                            ]}
                        ]}
                    ]}
                ];
            }

            onTreeNodeSelected(){
                console.log("selectedItem:",this.selectedItem);
                this.selectedItem2 = this.selectedItem;
                this.$scope.$digest();
            }


            init(){
                super.init();
            }
        }

     var app:ng.IModule = angular.module("DemoApp",['ks.all']);
     app.controller('CommonController',CommonController);

}

