/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts" />

module KsDemo {
    'use strict';

    class AutoCompleteController extends ks.BaseController {

        static $inject = ['$scope', 'ksEntityService', 'ksTip'];

        $scope;

        selectedValue:string ="";
        selectedValue1:string = "";
        selectedValue2:string;
        selectedItems:string;
        datas:any = {};
        entities:any = {};
        columnInfos:Array<any> = [];
        url:string = "http://localhost:8081/kuaisuadmin/crm/buyers/pickerByKeyword.do";

        constructor($scope:ng.IScope, ...args:any[]) {
            super($scope, args);
            this.$scope = $scope;

            this.datas = {
                rows: [
                    {id:1,customerName: "王经理", customerPhone: 18692009420,customerCompany:"KLKLKLK"},
                    {id:2,customerName: "bbc", customerPhone: 13748747895,customerCompany:"KLKLKLK"},
                    {id:3,customerName: "cce", customerPhone: 13810021458,customerCompany:"KLKLKLK"},
                    {id:4,customerName: "ddy", customerPhone: 4,customerCompany:"KLKLKLK"},
                    {id:5,customerName: "ee b", customerPhone: 5,customerCompany:"KLKLKLK"},
                    {id:6,customerName: "ffc", customerPhone: 6,customerCompany:"KLKLKLK"},
                    {id:7,customerName: "ggh", customerPhone: 7,customerCompany:"KLKLKLK"},
                    {id:1,customerName: "王经理", customerPhone: 18692009420,customerCompany:"KLKLKLK"},
                    {id:2,customerName: "bbc", customerPhone: 13748747895,customerCompany:"KLKLKLK"},
                    {id:3,customerName: "cce", customerPhone: 13810021458,customerCompany:"KLKLKLK"},
                    {id:4,customerName: "ddy", customerPhone: 4,customerCompany:"KLKLKLK"},
                    {id:5,customerName: "ee b", customerPhone: 5,customerCompany:"KLKLKLK"},
                    {id:6,customerName: "ffc", customerPhone: 6,customerCompany:"KLKLKLK"},
                    {id:7,customerName: "ggh", customerPhone: 7,customerCompany:"KLKLKLK"}
                ], total: 3999
            }

            this.entities = [{id:1,name: "王经理"},
                {id:2,name: "bbc"},
                {id:3,name: "cce"},
                {id:4,name: "ddy"},
                {id:5,name: "ee b"},
                {id:6,name: "ffc"},
                {id:7,name: "ggh"},
                {id:8,name: "王经理"},
                {id:9,name: "bbc"},
                {id:10,name: "cce"},
                {id:11,name: "ddy"},
                {id:12,name: "ee b"},
                {id:13,name: "ffc"},
                {id:14,name: "ggh"}];

            //this.datas = [];

            this.columnInfos = [
                {field:"customerName",label:"客户姓名",width:150,align:'left'},
                {field:"customerPhone",label:"客户电话",width:150,align:'left'}
                //{field:"customerCompanyName",label:"客户公司",width:200,align:'right'}
            ];

        }

        fn(){
            console.info("FN....")
        }

        reset(){
            this.selectedValue = null;
        }

    }

    var app:ng.IModule = angular.module("DemoApp", ['ks.all']);
    app.controller('AutoCompleteController', AutoCompleteController);

}

