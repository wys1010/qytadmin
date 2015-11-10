/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>


declare var k:nk._K;
module nk{

    export interface _K{
        getApp(name:String):_K;
        registerController(name:String,obj:any);
        loadScript(url:String);
        App:App;
        services:any;
    }

    export interface App{
        cache:any;
    }

    export interface Page{
        app:App;
    }

    export interface Event{
        name:String
        data:any
    }

    export class BaseDomain{
        createdAt:Date;
        updatedAt:Date;
        createdBy:number;
        updatedBy:number;
    }


    export class PagingQueryCondition{
        start: number = 0
        pageSize: number = 0
        limit: number = 10
        results: number = 0
        pageIndex: number = 0
    }


    export class BaseController{

        ksPage:Page;
        ksName:string;
        webRoot:string = window.webRoot
        version:string = window.version
        layer:any = window.layer //layer弹窗

        constructor(protected $scope,protected $state,protected $stateParams){
            var me = this;

            //  自定义ctrl之间的事件
            this.$scope.$on("KsEvent",function(event:any,msg){
                if(me.ksName === msg.controller){
                    return;
                }
                var name = msg.name.replace(/[\w]/,function($){return $.toUpperCase()})
                var data = msg.data;
                var handler = me["on" + name ];
                if (handler) {
                    handler.call(me, angular.copy(data));
                }
            })

            // state切换事件
            $scope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if (toState.name === 'root') {
                        var handler = me.onBackToRoot;
                        if(handler){
                            me.onBackToRoot.call(me,fromState.data);
                        }
                    }
                })
        }

        onBackToRoot(data:any){

        }

        go(name:String,data:any){
            this.$state.go(name, data)
        }

        putAppCache(key:string,value:any){
            var page = this.ksPage;
            if(!page){
                alert("putCache失败!");
                return;
            }
            var app = page.app;
            if(!app){
                alert("putCache失败!");
                return;
            }
            if(!app.cache){
                alert("putCache失败!");
                return;
            }
            app.cache[key] = value;
        }

        getAppCache(key){
            var page = this.ksPage;
            if(!page){
                alert("putCache失败!");
                return;
            }
            var app = page.app;
            if(!app){
                alert("putCache失败!");
                return;
            }
            if(!app.cache){
                alert("putCache失败!");
                return;
            }
            return app.cache[key];
        }


        //会被k.Controller 覆盖，用以注入内部处理需要的信息
        _getCtrlInfo(){}

        emit(name:string,data:any){
            this.$scope.$emit("KsEvent",{name:name,data:data,controller:this.ksName})
        }


    }

    export class PopUpController extends  BaseController {

        constructor(protected $scope, protected $state, protected $stateParams) {
            super($scope, $state, $stateParams);
            this._resetParam();
        }

        dismiss() {
            this.$scope.$dismiss();
        }

        pushParam(key, value) {
            this.$state.current.data[key] = value;
        }

        deleteParam(key) {
            delete this.$state.current.data[key];
        }

        _resetParam() {
            this.$state.current.data = {};
        }

    }
}