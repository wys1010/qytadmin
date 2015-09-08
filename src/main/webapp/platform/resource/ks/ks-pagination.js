/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.paging', ['ks'])
        .directive('ksPaging', ['ksTip', function (ksTip) {
            return {
                restrict: 'E',
                scope: {
                    start: "=",
                    limit: "=",
                    paging: "=?",
                    onSelectPage: "&"
                },
                replace: true,
                template: '<ul class="pagination-sm pagination pagination-right ks-paging">' +
                '<li><a href="javascript:void(0)" class="first" ng-click="first()"><span class="fa fa-fast-backward"></span></a></li>' +
                '<li><a href="javascript:void(0)" class="previous" ng-click="prev()"><span class="fa fa-backward"></span></a></li>' +
                '<li class="inactive"><a href="javascript:void(0)" class="page-index " style="height: 29px">第 ' +
                '<input disabled  ng-keypress="pressEnter()" onkeyup="value=value.replace(/[^(\\d)]/g,1) " style="width:50px;height:18px;line-height: 18px;padding:0;margin:0;border:1px solid #f0f0f0" type="number" ng-blur="accordToPageNumQuery()" ng-model="pageNum" class=" input-sm inPageNum" style="width:50px;"/>' +
                ' 页/ 总共{{_pageSize}}页 , 每页 {{paging.limit}}条</a></li>' +
                '<li><a href="javascript:void(0)" class="next" ng-click="next()"><span class="fa fa-forward"></span></a></li>' +
                '<li><a href="javascript:void(0)" class="last" ng-click="last()"><span class="fa fa-fast-forward"></span></a></li>' +
                '<li><a href="javascript:void(0)" >共<span>{{paging.results}}条记录</span></a></li>' +
                '</ul>',
                link: function (scope) {

                    if (!scope.paging) {
                        scope.paging = {
                            limit: 20,
                            start: 0
                        }
                    } else {
                        if (!scope.paging.limit) {
                            scope.paging.limit = 20;
                        }

                        if (!scope.paging.start) {
                            scope.paging.start = 0;
                        }
                        if (!scope.paging.results) {
                            scope.paging.results = 0;
                        }
                    }


                    scope.exactDivision = function (exp1, exp2) {
                        var n1 = Math.round(exp1); //四舍五入
                        var n2 = Math.round(exp2); //四舍五入

                        var rslt = n1 / n2; //除

                        if (rslt >= 0) {
                            rslt = Math.floor(rslt); //返回值为小于等于其数值参数的最大整数值。
                        }
                        else {
                            rslt = Math.ceil(rslt); //返回值为大于等于其数字参数的最小整数。
                        }

                        return rslt;
                    }

                    /**
                     * 分页查询后设置各信息的值，触发到html元素中
                     */
                    scope.reset = function () {
                        var p = scope.exactDivision(scope.paging.results, scope.paging.limit);
                        var intP = scope.paging.results / scope.paging.limit;
                        if (p < intP) {
                            p = p + 1;
                        }
                        scope._pageSize = p;
                        scope._pageIndex = scope.exactDivision(scope.paging.start, scope.paging.limit);
                        scope.pageNum = scope._pageIndex + 1;
                    }

                    /**
                     * 检测start、results变量，写俩变量检测是为了保证查询后能够正确的将分页信息填入组件，初始start的时候和第一页是相同的，依赖results变量，
                     * 而后results变量在后台数据不变的情况下依赖于start，当然可能出现二者都不变的情况，比如一直刷第一页，有些情况可能监听这两个参数都不能保证，需要再补充
                     */
                    scope.$watch('paging.results', function (value) {
                        scope.reset();
                    });

                    scope.$watch('paging.start', function (value) {
                        scope.reset();
                    });

                    /**
                     * 分页条中各元素调用的通用跳转
                     *  <paging on-select-page="onSelectPageHandler(paging)" limit="20" start="0" ></paging>
                     *指令中的onSelectPageHandler(paging) ，声明的参数名很重要，实际onSelectPageHandler获取的参数会在 scope.onSelectPage 传入实参中匹配同名属性
                     * @type {{start: *, limit: (string|$scope.queryCondition.limit|._getPageParams.limit|limit|params.limit), results: (string|results)}}
                     */
                    scope.selectPage = function (page) {
                        scope.paging.start = page;
                        scope.onSelectPage();
                    }

                    // 第一页
                    scope.first = function () {
                        if (scope.pageNum == 1) {
                            return;
                        }
                        scope.selectPage(0);
                    };

                    // 上一页
                    scope.prev = function () {

                        if (scope.pageNum == 1) {
                            return;
                        }

                        var start = scope.paging.start - scope.paging.limit;
                        if (start < 0) {
                            start = 1;
                        }
                        scope.paging.start = start;
                        scope.selectPage(start);
                    }

                    // 下一页
                    scope.next = function () {
                        var start = scope.paging.start + scope.paging.limit;

                        if (scope.pageNum >= scope._pageSize) {
                            return;
                        }

                        if (scope.paging.results && scope.paging.results != 0) {
                            scope.paging.start = start;
                            scope.selectPage(start);

                        }

                    }

                    // 最后一页
                    scope.last = function () {
                        if (scope.pageNum >= scope._pageSize) {
                            return;
                        }

                        if (scope.paging.results && scope.paging.results != 0) {
                            scope.paging.start = (scope._pageSize - 1) * scope.paging.limit
                            scope.selectPage(scope.paging.start);
                        }
                    }

                    scope.accordToPageNumQuery = function ($inject) {
                        if (!scope.pageNum || !angular.isNumber(scope.pageNum) || scope.pageNum == null) {
                            return;
                        }

                        if ((parseInt(scope.pageNum) > scope._pageSize + 1) || parseInt(scope.pageNum) < 1) {
                            ksTip.alert("输入的页码有误！")
                            return;
                        }
                        scope.paging.start = (parseInt(scope.pageNum) - 1) * scope.paging.limit;
                        scope.selectPage(scope.paging.start);
                        scope.paging._pageIndex = scope.pageNum;
                    }
                    scope.pressEnter = function () {
                        if (event.keyCode == 13) {
                            scope.accordToPageNumQuery();
                        }
                    }
                }

            }
        }]);
})();