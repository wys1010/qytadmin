/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>


module ks {


    export module domains{}

    /**
     * @author Wangyiqun
     * @date 2015年03月04日
     * 基础domain类，避免每个子类都写创建信息
     */
    export class BaseDomain{
        createdAt:Date;
        updatedAt:Date;
        createdBy:number;
        updatedBy:number;
    }

    export class Window {
        static webRoot;
        static WebRoot: string = window.webRoot
        static Version: string = window.version
    }

    export class Role {
        static hasRole(code: string): boolean {
            return window.uc.biz.hasRole(code)
        }
    }

    export class PagingQueryCondition{
        start: number = 0
        pageSize: number = 0
        limit: number = 20
        results: number = 0
        pageIndex: number = 0
    }

    export class Pagination {
        start: number = 0
        pageSize: number = 0
        limit: number = 0
        results: number = 0
        pageIndex: number = 0
    }

    export class QueryCondition {
        showQueryCondition: boolean = true
        start: number = 0
        limit: number = 20
        pageIndex: number = 0
    }

    export class RouterName {
        static Select: string = "select"
        static Edit: string = "select.edit"
        static Add: string = "select.add"
        static Upload: string = "select.upload"
        static Download: string = "select.download"
    }

    export class RouterConfig {

        static factory(states: Array<ng.ui.IState>) {
            function config($urlRouterProvider, $stateProvider) {
                new RouterConfig($urlRouterProvider, $stateProvider, states);
            }

            config.$inject = ["$urlRouterProvider", "$stateProvider"];

            return config;
        }

        // TODO state -> stateName
        private commonStateOnEnter(checkChanged: boolean, state: ng.ui.IState, $stateParams, $stateService: ng.ui.IStateService, $modalService: ng.ui.bootstrap.IModalService) {

            var backToSelect = function () {
                if(checkChanged)
                    $stateParams.isChanged = $stateService.current.data.isChanged;

                return $stateService.transitionTo(RouterName.Select);
            }
            if(!state.size){
                state.size="lg"
            }
            $modalService.open({
                backdrop: true,
                templateUrl: state.templateUrl,
                size: state.size
            }).result.then(function (result) {
                    return backToSelect();
                }, function (result) {
                    return backToSelect();
                });
        }

        constructor(private $urlRouterProvider: ng.ui.IUrlRouterProvider, private $stateProvider: ng.ui.IStateProvider, private states: Array<ng.ui.IState>){

            $urlRouterProvider.otherwise('/');

            for (var i = 0; i < states.length; i++) {
                var state:ng.ui.IState = states[i]
                if(state.templateUrl) {
                    state.templateUrl = state.templateUrl + '?version=' + ks.Window.Version
                }

                var data = {}
                angular.copy(state.data, data)

                if (state.name == RouterName.Select) {
                    $stateProvider.state(state.name, {
                        url: state.url,
                        templateUrl: state.templateUrl,
                        data: state.data
                    })
                } else if (state.name.indexOf(RouterName.Select) >= 0) {
                    var modifyData = {isChanged: false}
                    if (state.data != null)
                        angular.copy(state.data, modifyData)

                    $stateProvider.state(state.name, {
                        url: state.url,
                        templateUrl: state.templateUrl,
                        data: modifyData,
                        onEnter: ['$stateParams', '$state', '$modal', this.commonStateOnEnter.bind(this, true, state) ]
                    });
                } else {
                    var routeData = {}
                    if (state.data != null)
                        angular.copy(state.data, routeData)

                    var checkChanged = false
                    if (state.data != null && state.data.isChanged != null)
                        checkChanged = true

                    $stateProvider.state(state.name, {
                        url: state.url,
                        templateUrl: state.templateUrl,
                        data: routeData,
                        onEnter: ['$stateParams', '$state', '$modal', this.commonStateOnEnter.bind(this, checkChanged, state)]
                    });
                }
            }
        }
    }
}
