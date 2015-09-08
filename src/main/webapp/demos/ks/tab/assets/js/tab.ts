// Author: Wangyiqun
// Date: 2015年02月25日

/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts" />

 module KsDemo{
        'use strict';

        class CommonController extends ks.BaseController{


            static $inject = ['$scope','ksEntityService','ksTip'];

            wordSelected:boolean = true;
            constructor($scope:ng.IScope,...args:any[]) {
                super($scope,args);
                this.$scope = $scope;

            }



            init(){
                super.init();
            }
        }

     var app:ng.IModule = angular.module("DemoApp",['ks.all']);
     app.controller('CommonController',CommonController);

}

