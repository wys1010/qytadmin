
/// <reference path="ks-ts-all.ts"/>
/// <reference path="../../../../ts-lib/angularjs/angular.d.ts" />

module ks{
    export class Directive implements ng.IDirective{

        constructor(name:string, inject:Array<string>){

            angular.module(name).directive(name);
        }
    }
}