/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.entityService', ['ks', 'ks.tip'])
        .provider('ksEntityService', function () {
            var _entity = {};
            var events = [];
            var Entity = {};
            var _init = false;

            var _config = {};

            var _baseUrl = '';

            var _idField = 'id';

            var _curdUrls = {}

            var _services = {}

            /**
             * this.xxx 可以在config阶段被外部使用，
             * @param cfg
             */
            this.config = function (cfg) {
                if (_init) {
                    throw new Error('ksEntityService 已经初始化过，不可重复初始化');
                }
                _init = true;
                _config = angular.copy(cfg);
                try {
                    _baseUrl = _config.url.split(":")[0];
                    _idField = _config.url.split(":")[1].split(".")[0];
                } catch (e) {
                    throw new Error('ks.dataModel配置出错，参数格式必须为xxxx/xxx/:{id}.do');
                }

                // 缓存 curd 请求地址
                _curdUrls = {
                    create: _baseUrl + 'add.do',
                    update: _baseUrl + 'update.do',
                    read: _baseUrl.substr(0, _baseUrl.length - 1) + '.do',
                    delete: _baseUrl + 'delete/',
                    origin: _baseUrl
                }

            };

            this.$get = ['$http', '$filter', '$q', 'ksTip', function ($http, $filter, $q, ksTip) {

                var self = this;

                var _ksEntityService = {
                    stateErrorTip:function(typeMsg,msg,state){
                        switch (state){
                            case 400:
                                ksTip.error("参数错误,"+typeMsg+"！" ) ;
                                break;
                            case 401:
                                ksTip.error("未登录，请登录！").$get(ks.Window.WebRoot);
                                break;
                            case 403:
                                ksTip.error("没有操作权限！");
                                break;
                            case 500:
                                ksTip.error("服务出错，"+msg);
                            case 631:
                                ksTip.error(typeMsg+"," +msg);
                                break;
                            case 632:
                                ksTip.error(typeMsg+","+msg);
                                break;
                            default :
                                ksTip.error(typeMsg+"!")
                        }
                    },

                    registerService: function (service) {
                        if (!service) {
                            alert("注册服务失败，参数错误");
                            return;
                        }
                        if (!service.name) {
                            alert("注册服务失败，未指定name");
                            return;
                        }

                        if (!service.url && !service.promise) {
                            alert("注册服务失败，未指定url 或 promise");
                            console.error("注册服务失败，未指定url 或 promise",service);
                            return;
                        }

                        if (service.url) {
                            if (!service.method) {
                                alert("注册服务失败，指定了url，但未指定method");
                                return;
                            }
                        }

                        _services[service.name] = service;
                    },

                    callService: function (serviceName, data) {
                        var sn = serviceName;
                        if ($.isPlainObject(serviceName)) {
                            sn = serviceName.name;
                        }
                        var service = _services[sn];
                        if (!service) {
                            alert("调用服务:【" + sn + "】失败，服务不存在！");
                            return;
                        }
                        if (service.promise) {

                            var deferred = $q.defer();
                            var promise = deferred.promise;
                            var successFun = null;
                            var errorFun = null;

                            promise.success = function (fn) {
                                successFun = fn;
                                return promise;
                            }

                            promise.error = function (fn) {
                                errorFun = fn;
                                return promise;
                            }

                            setTimeout(function () {
                                if (service.promise.success) {
                                    if (service.promise.resolve && $.isFunction(service.promise.resolve)) {
                                        deferred.resolve();
                                        successFun.call(null, service.promise.resolve.call(null, data));
                                    }
                                } else {
                                    if (service.promise.reject && $.isFunction(service.promise.reject)) {
                                        deferred.reject();
                                        errorFun.call(null, service.promise.reject.call(null, data));
                                    }
                                }
                            }, 0);

                            return promise;
                        }

                        var url = service.url.replace(/(:\w+)/g,function($){
                            var pName = $.substr(1);

                            var value =  data[pName];
                            delete data[pName];
                            return value
                        })

                        switch (service.method) {
                            case "GET":
                                return _ksEntityService.get(url, data).error(function (msg,state) {
                                    _ksEntityService.stateErrorTip("查询失败",msg,state);
                                });
                                break;
                            case "POST":
                                return _ksEntityService.post(url, data).error(function (msg,state) {
                                    _ksEntityService.stateErrorTip("保存失败",msg,state);
                                });
                                break;

                            case "PUT":
                                return _ksEntityService.put(url, data).error(function (msg,state) {
                                    _ksEntityService.stateErrorTip("保存失败",msg,state);
                                });
                                break;
                            case "DELETE":
                                return _ksEntityService.delete(url, data).error(function (msg,state) {
                                    _ksEntityService.stateErrorTip("保存失败",msg,state);
                                });
                                break;
                        }
                    },

                    /**
                     * 查询单条数据
                     */
                    selectOne: function (id, success, error) {
                        $http.get(_curdUrls.origin + id + '.do').success(success).error(error);
                    },

                    /**
                     * 查询
                     * @param param
                     * @param callBack
                     */
                    selectMany: function (param, callBack) {
                        $http({url: _curdUrls.read, params: param, method: "GET"}).success(function (data) {
                            if (callBack && angular.isFunction(callBack)) {
                                callBack.call(null, data);
                            }
                        });
                    },

                    delete: function (id, success, error) {
                        if (arguments.length === 1) {
                            return $http.delete(id);
                        }
                        if (arguments.length === 2) {
                            return $http({url: id, params: success, method: "DELETE"})
                        } else {
                            $http.delete(_curdUrls.delete + id + '.do').success(success).error(error);
                        }
                    },


                    /**
                     * 更新
                     * @param param
                     * @param callBack
                     */
                    update: function (data, success, error) {
                        $http.put(_curdUrls.update, data).success(success).error(error);
                    },

                    post: function (url, data, success, error) {
                        if (arguments.length < 3) {
                            return $http.post(url, data)
                        } else {
                            $http.post(url, data).success(success).error(error);
                        }
                    },

                    get: function (url, data, success, error) {
                        if (arguments.length < 3) {
                            return $http({url: url, params: data, method: "GET"})
                        } else {
                            $http.get(url, data).success(success).error(error);
                        }
                    },


                    put: function (url, data, success, error) {
                        if (arguments.length < 3) {
                            return $http.put(url, data)
                        } else {
                            $http.put(url, data).success(success).error(error);
                        }

                    },

                    uploadImg:function(url,data,imgField,success,error){
                        var xhr = new XMLHttpRequest();
                        xhr.open("post",url,true);
                        xhr.setRequestHeader("Content-Type",'multipart/form-data;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u');
                        var form = $('<form enctype="multipart/form-data" > </form>').appendTo(document.body);
                        form.attr("action",url);
                        var formData = new FormData(form[0]);
                        formData.append("pictureType",1);
                        formData.append("fileName","a.png")
                        formData.append(imgField,data[imgField],'a.png');
                        for(var f in data){
                            if(f != imgField){
                                formData.append(f,data[f]);
                            }
                        }
                        //xhr.send(formData);

                        $.ajax({
                            url: url,
                            type: "POST",
                            data: formData,
                            processData: false,  // 告诉jQuery不要去处理发送的数据
                            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                            success:success,
                            error:error

                        });
                    },


                    /**
                     * 新增
                     * @param param
                     * @param callBack
                     */
                    insert: function (data, success, error) {
                        $http.post(_curdUrls.create, data).success(success).error(error);
                    },

                    /**
                     * 更新数据
                     * @param param
                     * @param callBack
                     */
                    save: function (data, success, error) {
                        //  id 存在，则更新
                        if (data[_idField]) {
                            $http.put(_curdUrls.update, data).success(success).error(error);
                        } else {
                            $http.post(_curdUrls.create, data).success(success).error(error);
                        }
                    }

                }

                return _ksEntityService;
            }]

        })
        //修改$http 的配置参数，支持spring mvc 参数映射
        .config(['$httpProvider', function ($httpProvider) {
            var headerContentType = 'application/x-www-form-urlencoded; charset=UTF-8';
            $httpProvider.defaults.headers.post['Content-Type'] = headerContentType;
            $httpProvider.defaults.headers.put['Content-Type'] = headerContentType;
            $httpProvider.defaults.transformRequest = function (data) {
                if (data === undefined) {
                    return data;
                }
                return $.param(data);
            }
        }])
})();