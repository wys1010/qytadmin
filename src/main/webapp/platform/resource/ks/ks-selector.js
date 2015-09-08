/**
 * ks 下拉框指令
 * @author Wangyiqun
 * @date 2014-12-30
 */
(function () {


    angular.module('ks.selector', ['ks'])
        .directive('ksSelector',['$cacheFactory','$http',function ($cacheFactory,$http) {
            //var _cacheObj = $cacheFactory('ksSelector');
            //var _cache = {};
            //_cacheObj.put('options', _cache)
            return {
                require: '^ngModel',
                scope: {
                    ngModel:"=",
                    code: '@',
                    label: '@',
                    id:'@',
                    url:'@',
                    attrName:'@',
                    param:'=',
                    options:'@',
                    entity:'=',
                    ksBlankOptions:'@',
                    ksDictId:'@',
                    ksDictValueType:'@'

                },
                restrict: 'E',
                replace: true,
                template: '<select class="ks-select" id="{{id}}" ng-options="item.code as item.label for item in options"></select>',
                link: function ($scope, $element, $attrs, ngModel) {

                    if($scope.url){

                        $http.get($scope.url,$scope.param).success(function(data){
                            var _options = [];

                            if($scope.ksBlankOptions){
                                _options.push({label:'===请选择==='});
                            }

                            for (var i = 0; i < data.length; i++) {
                                var _option = {};
                                var item = data[i];
                                _option.code = item[$scope.code];
                                _option.label = item[$scope.label];
                                _options.push(_option);
                            }
                            $scope.options = _options;
                        });
                    }else if($scope.ksDictId){
                        var dictItems = window.ks.dict.getDictItems($scope.ksDictId);
                        var _options = [];
                        if($scope.ksBlankOptions){
                            _options.push({label:'===请选择==='});
                        }
                        for (var i = 0; i < dictItems.length; i++) {
                            var item = dictItems[i];
                            if($scope.ksDictValueType == 'int'){
                                _options.push({code:item.value - 0,label:item.name});
                            }else{
                                _options.push({code:item.value,label:item.name});
                            }

                        }
                        $scope.options = _options;
                    }

                    //var setValue = function(value){
                    //    //  值是否合法
                    //    if (value) {
                    //        // 保存当前选中项
                    //        _cache[$scope.id].selectedId = value;
                    //        // 设置为选中
                    //        _cache[$scope.id].$options[value].attr("selected", "selected");
                    //    } else {
                    //        // 判断是否已经存在选中项，无值的时候清空选中状态
                    //        if ($scope.$blankOptin) {
                    //            $scope.$blankOptin.attr("selected", "none");
                    //        }
                    //    }
                    //}
                    //// 缓存pagination
                    //
                    //var $wrap = $($element);
                    //
                    //// 值变化 ，刷新视图
                    //ngModel.$render = function(){
                    //    var value = ngModel.$viewValue;
                    //
                    //    // 无列表数据，值过来了，选项还没有，这里其实可能会导致多查一次，需要优化
                    //    if(!_cache[$scope.id]){
                    //        //$http.get($scope.url,$scope.param).then(createOptions).then(function(){
                    //        //    setValue(value);
                    //        //});
                    //    }else {
                    //        setValue(value);
                    //
                    //    }
                    //
                    //}


                    /**
                     * 创建下拉选项dom结构
                     * @param data
                     */
                    //var createOptions = function(data){
                    //
                    //    // 空白选项
                    //    if($scope.ksBlankOptions){
                    //        var $item = $scope.$blankOptin = $("<option value=''>===请选择===</option>")
                    //        $wrap.append($item);
                    //    }
                    //    // 缓存数据与code和options的列表
                    //
                    //    for (var i = 0; i < data.length; i++) {
                    //        var item = data[i];
                    //        var $item = $("<option value='" + item[$scope.code] +  "'>" + item[$scope.label] + "</option>")
                    //        $wrap.append($item);
                    //        _cache[$scope.id].$options[item[$scope.code]] = $item;
                    //    }
                    //}


                    /**
                     * 选中项变化，更新值
                     */
                    //$element.on('change', function(obj){
                    //    _cache[$scope.id].selectedId = ngModel.$viewValue;
                    //})

                    //  判断是否有缓存数据，如果没有则请求数据
                    //if(_cache[$scope.id]){
                    //    if($wrap.find("option").size() < 1){
                    //        //createOptions(_cache[$scope.id].data);
                    //    }
                    //}
                    ////
                    //else{
                    //    $.ajax({url: $scope.url , data: $scope.param, method: "GET",success:function (data) {
                    //        _cache[$scope.id] = {data : data, $options : {}};
                    //        $scope.options = data
                    //        //createOptions(data);
                    //    }});
                    //}

                }

            }
        }]);
})();