/**
 * @author Wangyiqun
 * @date 2015年03月20日
 * k.App
 */
(function(win){
    if(!win.k){
        win.k = {}
    }
    var k = win.k;

    var webRoot = win.webRoot;
    var version = win.version;

    //  缓存app,通过name 属性匹配
    k._apps = {};

    k.services = {};
    k._services = []

    k.addService = function(service){
        k._services.push(service);
    }

    k.batchAddServices = function(sys){
        if(!sys){
            alert("批量注册服务失败，参数为空!");
            return;
        }
        for(var serviceName in sys){
            k.addService(sys[serviceName]);
        }
    }

    k.loadScript = function(url){
        $.ajax({
            async:false,
            url: webRoot + url,
            dataType: "script"
        });

    }


    /**
     * new k.App()  不会创建angular module 实例,init之后，才会统一处理
     * app
     * @param config 参数中以后要考虑 angular module的生命周期，比如config provider controller 处理顺序，提供事前事后的插入点代码
     * @constructor
     */
    k.App = function(config){
        this.cfg = $.extend({

        },config,true);

        if(!this.cfg.name || !this.cfg.templateUrl){
            alert("app构建失败，参数错误，未指定app name  或 templateUrl 属性");
            return;
        }

        this.modules = config.modules;
        this.name = this.cfg.name;
        this.pages = [];
        this.cache = {}
        this.services = [];
        k._apps[this.name] = this;
        this.pagesMap = {}
    }

    k.App.prototype.registerService = function(service){
        this.services.push(service);
    }



    /**
     * 获取app
     * @param name
     * @returns {*}
     */
    k.getApp = function(name){
        return k._apps[name];
    }

    /**
     * app添加page
     * @param page k.Page 实例
     */
    k.App.prototype.addPage = function(page){
        if(this.pagesMap[page.name]){
            alert("添加页面失败，name【" + page.name + "】重复");
        }
        this.pages.push(page);
        this.pagesMap[page.name] = page;
        this.controllers = [];
        page.app = this;
    }

    k.App.prototype.putCache = function(key,value){
        this.cache[key] = value;
    }

    k.App.prototype.getCache = function(key){
        return this.cache[key];
    }

    k.App.prototype.removeCache = function(key){
        delete this.cache[key] ;
    }

    k.App.prototype.registerController = function(pageName,proto){
        this.getPage(pageName).extend(proto);
    }

    /**
     * 通过name获取page
     * @param name
     * @returns {*}
     */
    k.App.prototype.getPage = function(name){
        return this.pagesMap[name];
    }


    var _state = function(page,$stateProvider){

        var url = "/" + page.name ;
        if(page.paramName){
            url +=  "/:" + page.paramName;
        }else if(page.paramNames){
            for (var i = 0; i < page.paramNames.length; i++) {
                var param = page.paramNames[i];
                url +=  "/:" + param;
            }
        }

        if(page.isPopUp){
            $stateProvider.state('root.' + page.name, {
                url: url,
                data:{
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {

                    // 返回查询状态，处理参数
                    var backToItems = function () {
                        //$stateParams.param = $state.current.data.param;
                        //top.$(".header").hide();
                        //setTimeout(function(){
                        //    top.$(".header").show();
                        //},1)
                        return $state.transitionTo("root");
                    }
                    console.log("page.ctrlName:",page.ctrlName)
                    $modal.open({
                        backdrop: true,
                        templateUrl: page.templateUrl,
                        size: 'lg'
                    }).result.then(function (result) {
                            return backToItems();
                        }, function (result) {
                            return backToItems();
                        });
                }]
            });
        }
    }



    /**
     * 内部方法，angular module 配置阶段
     * @param app
     * @private
     */
    var _config = function(app){
        var modules = ["ks.all"];
        if(app.modules){
            modules = modules.concat(app.modules);
        }

        app.module = angular.module(app.name,modules)
            .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/');
                $stateProvider.state('root',{
                    url:'/',
                    templateUrl:webRoot + app.cfg.templateUrl
                })
                for (var i = 0; i < app.pages.length; i++) {
                    var page = app.pages[i];
                    _state(page,$stateProvider)
                }
            }]);
    }

    var _buildController = function(app){


        var rootCtrl = function($scope,ksEntityService){
            // 注入变量
            var rootCtrl = this;
            for(var p in app.cfg.root){
                rootCtrl[p] = app.cfg.root[p];
            }
            rootCtrl.webRoot = webRoot;
            rootCtrl.version = version;

            _bindEvents($scope);

            for (var i = 0; i < k._services.length; i++) {
                var service = k._services[i];
                ksEntityService.registerService(service);
            }

            for (var i = 0; i < app.services.length; i++) {
                var service = app.services[i];
                ksEntityService.registerService(service);
            }
        }

        rootCtrl.$inject = ["$scope", "ksEntityService"];

        // 根控制器
        app.module.controller('RootController',rootCtrl);

        //  子控制器
        for (var i = 0; i < app.pages.length; i++) {
            var page = app.pages[i];
            page.controller.init(page);
            app.module.controller(page.controller.name, page.controller.$proxy || page.controller.$controller);
            app.controllers[page.controller.name] = page.controller;


        }
    }

    var _bindEvents = function($scope){
        $scope.$on('KsEvent',function(event,msg){
            if(event.targetScope !== event.currentScope){
                $scope.$broadcast('KsEvent',msg);
                event.stopPropagation(); // 一定要阻止冒泡，否则会执行多遍
            }
        })
    }

    /**
     * app 关键 调用angular.module，
     */
    k.App.prototype.init = function(){
        _config(this);
        _buildController(this);
    }
})(window);