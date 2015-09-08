/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
var ks;
(function (ks) {
    /**
     * @author Wangyiqun
     * @date 2015年03月04日
     * 基础domain类，避免每个子类都写创建信息
     */
    var BaseDomain = (function () {
        function BaseDomain() {
        }
        return BaseDomain;
    })();
    ks.BaseDomain = BaseDomain;
    var Window = (function () {
        function Window() {
        }
        Window.WebRoot = window.webRoot;
        Window.Version = window.version;
        return Window;
    })();
    ks.Window = Window;
    var Role = (function () {
        function Role() {
        }
        Role.hasRole = function (code) {
            return window.uc.biz.hasRole(code);
        };
        return Role;
    })();
    ks.Role = Role;
    var PagingQueryCondition = (function () {
        function PagingQueryCondition() {
            this.start = 0;
            this.pageSize = 0;
            this.limit = 20;
            this.results = 0;
            this.pageIndex = 0;
        }
        return PagingQueryCondition;
    })();
    ks.PagingQueryCondition = PagingQueryCondition;
    var Pagination = (function () {
        function Pagination() {
            this.start = 0;
            this.pageSize = 0;
            this.limit = 0;
            this.results = 0;
            this.pageIndex = 0;
        }
        return Pagination;
    })();
    ks.Pagination = Pagination;
    var QueryCondition = (function () {
        function QueryCondition() {
            this.showQueryCondition = true;
            this.start = 0;
            this.limit = 20;
            this.pageIndex = 0;
        }
        return QueryCondition;
    })();
    ks.QueryCondition = QueryCondition;
    var RouterName = (function () {
        function RouterName() {
        }
        RouterName.Select = "select";
        RouterName.Edit = "select.edit";
        RouterName.Add = "select.add";
        RouterName.Upload = "select.upload";
        RouterName.Download = "select.download";
        return RouterName;
    })();
    ks.RouterName = RouterName;
    var RouterConfig = (function () {
        function RouterConfig($urlRouterProvider, $stateProvider, states) {
            this.$urlRouterProvider = $urlRouterProvider;
            this.$stateProvider = $stateProvider;
            this.states = states;
            $urlRouterProvider.otherwise('/');
            for (var i = 0; i < states.length; i++) {
                var state = states[i];
                if (state.templateUrl) {
                    state.templateUrl = state.templateUrl + '?version=' + ks.Window.Version;
                }
                var data = {};
                angular.copy(state.data, data);
                if (state.name == RouterName.Select) {
                    $stateProvider.state(state.name, {
                        url: state.url,
                        templateUrl: state.templateUrl,
                        data: state.data
                    });
                }
                else if (state.name.indexOf(RouterName.Select) >= 0) {
                    var modifyData = { isChanged: false };
                    if (state.data != null)
                        angular.copy(state.data, modifyData);
                    $stateProvider.state(state.name, {
                        url: state.url,
                        templateUrl: state.templateUrl,
                        data: modifyData,
                        onEnter: ['$stateParams', '$state', '$modal', this.commonStateOnEnter.bind(this, true, state)]
                    });
                }
                else {
                    var routeData = {};
                    if (state.data != null)
                        angular.copy(state.data, routeData);
                    var checkChanged = false;
                    if (state.data != null && state.data.isChanged != null)
                        checkChanged = true;
                    $stateProvider.state(state.name, {
                        url: state.url,
                        templateUrl: state.templateUrl,
                        data: routeData,
                        onEnter: ['$stateParams', '$state', '$modal', this.commonStateOnEnter.bind(this, checkChanged, state)]
                    });
                }
            }
        }
        RouterConfig.factory = function (states) {
            function config($urlRouterProvider, $stateProvider) {
                new RouterConfig($urlRouterProvider, $stateProvider, states);
            }
            config.$inject = ["$urlRouterProvider", "$stateProvider"];
            return config;
        };
        // TODO state -> stateName
        RouterConfig.prototype.commonStateOnEnter = function (checkChanged, state, $stateParams, $stateService, $modalService) {
            var backToSelect = function () {
                if (checkChanged)
                    $stateParams.isChanged = $stateService.current.data.isChanged;
                return $stateService.transitionTo(RouterName.Select);
            };
            if (!state.size) {
                state.size = "lg";
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
        };
        return RouterConfig;
    })();
    ks.RouterConfig = RouterConfig;
})(ks || (ks = {}));
//# sourceMappingURL=ks-type.js.map