/**
 * @author Wangyiqun
 * @date 2015-03-17
 */
(function () {
    angular.module('ks.simpleGrid', [])
        .directive('ksSimpleGrid', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    onSelectPage: '&',
                    paging: '=?',
                    fixHeight: '@'
                },
                link: function ($scope, element, $attr) {
                    $scope.$wrap = $(element);
                    $scope.$parentWrap = $(element).parent();
                },
                controller: ['$scope', 'k', function (scope, k) {

                    var me = scope;
                    $.extend(scope, {

                        selectPageHandler: function () {
                            me.onSelectPage.apply(null, arguments)
                        },

                        init: function () {
                            me.initVars();
                            me.bindEvents();
                        },

                        initVars: function () {

                        },

                        bindEvents: function () {
                            setTimeout(function () {
                                me.resize();
                                $(window).resize(function () {
                                    me.resize();
                                });
                            }, 0);

                        },

                        resize: function () {
                            var parentHeight = me.$parentWrap.height();
                            me.$wrap.height(parentHeight);
                            var pagingHeight = me.$wrap.find(".simple-grid-footer").height();
                            var headerHeight = me.$wrap.find(".header").height();
                            var $body = me.$wrap.find(".body");
                            var fixHeight = 0;
                            if (me.fixHeight) {
                                fixHeight = me.fixHeight - 0;
                            }
                            $body.height(parentHeight - pagingHeight - headerHeight - fixHeight);
                        }

                    }, true);

                    this.selectPageHandler = function (args) {
                        if (args) {
                            me.paging.sortFields = args;
                        } else {
                            me.paging.sortFields = "";
                        }
                        me.selectPageHandler();

                    }

                    me.init();
                }],
                templateUrl: window.webRoot + '/platform/resource/ks/grid/simple-grid/ks-simple-grid.html?version=' + window.version
            };
        })
        .directive('ksSimpleGridHeader', function () {
            return {
                require: '^ksSimpleGrid',
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs, ksSimpleGridCtrl) {
                },
                templateUrl: window.webRoot + '/platform/resource/ks/grid/simple-grid/ks-simple-grid-header.html?version=' + window.version
            };
        })
        .directive('ksSimpleGridHeaderCell', function () {
            return {
                require: '^ksSimpleGrid',
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    width: '@', // 数值，或者flex常量
                    sortField: '@'
                },
                link: function (scope, element, attrs, ksSimpleGridCtrl) {
                    $(element).width(attrs.width).css("cursor", "pointer").attr("sortMode", 0);

                    if($(element).attr("sort-field")){
                        $(element).on('click', function (e) {
                            var sortField = "";
                            var sortMode = $(this).attr("sortMode");

                            $(this).parent().each(function () {
                                var children = $(this).children();
                                children.css({"background": "rgb(89,89,89)", "color": "#fff"});
                                children.children("span").children("i").remove();
                                children.attr("sortMode", 0);
                            });

                            $(this).attr("sortMode", sortMode);
                            $(this).css({"background": "#ccc", "color": "black"});

                            var childrenNode = $(this).children("span");
                            childrenNode.children("i").remove();

                            if (sortMode == '0') {
                                $(this).attr("sortMode", 1);
                                sortField = scope.sortField + " ASC";
                                childrenNode.append("<i class='fa fa-arrow-up'></i>");
                            } else if (sortMode == '1') {
                                $(this).attr("sortMode", 2);
                                sortField = scope.sortField + " DESC";
                                childrenNode.append("<i class='fa fa-arrow-down'></i>");
                            } else if (sortMode == '2') {
                                sortField = "";
                                $(this).attr("sortMode", 0);
                            }

                            ksSimpleGridCtrl.selectPageHandler(sortField);

                        });
                    }


                },
                templateUrl: window.webRoot + '/platform/resource/ks/grid/simple-grid/ks-simple-grid-header-cell.html?version=' + window.version
            };
        }).directive('ksSimpleGridBody', function () {
            return {
                require: '^ksSimpleGrid',
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs, ksSimpleGridCtrl) {
                },
                templateUrl: window.webRoot + '/platform/resource/ks/grid/simple-grid/ks-simple-grid-body.html?version=' + window.version
            };
        }).directive('ksSimpleGridRow', function () {
            return {
                require: '^ksSimpleGrid',
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs, ksSimpleGridCtrl) {
                },
                templateUrl: window.webRoot + '/platform/resource/ks/grid/simple-grid/ks-simple-grid-row.html?version=' + window.version
            };
        }).directive('ksSimpleGridRowCell', function () {
            return {
                require: '^ksSimpleGrid',
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs, ksSimpleGridCtrl) {
                    $(element).width(attrs.width);
                },
                templateUrl: window.webRoot + '/platform/resource/ks/grid/simple-grid/ks-simple-grid-row-cell.html?version=' + window.version
            };
        })
        .directive('ksSimpleGridOpCell', function () {
            return {
                require: '^ksSimpleGrid',
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs, ksSimpleGridCtrl) {
                    $(element).width(attrs.width);
                },
                templateUrl: window.webRoot + '/platform/resource/ks/grid/simple-grid/ks-simple-grid-op-cell.html?version=' + window.version
            };
        });


})();

