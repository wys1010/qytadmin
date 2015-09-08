

/// <reference path="ks-ts-all.ts"/>
/// <reference path="../../../../ts-lib/angularjs/angular.d.ts" />

module ks{

    export interface IController{
        $inject;
        new ($scope:ng.IScope,...args:any[]);
    }

    export interface IBaseController{
        $scope:ng.IScope;
        init():void;
    }

    export class BaseController implements IBaseController{

        $scope:ng.IScope;

        init(){

        }

        constructor($scope:ng.IScope,...args:any[]){
            this.init();
        }
    }

    export class Controller {

        webRoot = window.webRoot;
        constructor(){

        }

    }


    var __extends =  function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        };

    export function makeModule(name,m,injects){

        console.log("makeModule--->",m.toString())
        var app =   angular.module(name,injects);
        for(var ctrlName in m){
            console.log("ctrl:",ctrlName)
            var ctrl = m[ctrlName];
            var proto = ctrl.prototype;
            var injectsNum = ctrl.$injects.length;
            var constructStr = ctrl.toString();
            var bodyStr = constructStr.substring(constructStr.indexOf("{"));
            var realConstructor = eval("(function(" + ctrl.$injects.join(",") + ")" + bodyStr + ")");
            console.log("realConstructor:",realConstructor)
            realConstructor.$injects = ctrl.$injects;
            realConstructor.prototype = ctrl.prototype;
            app.controller(ctrlName,realConstructor);
        }

    }


}