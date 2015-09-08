/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {


    var Ac = {}

    Ac.nextIdFactory = function(){
        var _id = 0;

        return function(){
            return _id++;
        }
    }
    Ac.nextId = Ac.nextIdFactory();


    angular.module('ks.autoComplete', ['ks'])
        .directive('ksAutoComplete', ['$parse','k', function ($parse,k) {

            var KEY = {
                ENTER: 13,
                RIGHT: 39,
                LEFT: 37,
                DOWN: 40,
                UP: 38
            }


            // 检测输入字符串的正则表达式特殊字符
            var regSpec = /\$|\(|\)|\*|\+|\.|\[|\]|\\|\^|\{|\}|\|/g;

            // 过滤函数
            var filter = function (scope) {
                var val = scope.searchInput.val();

                // 去掉前后空格
                val = $.trim(val);

                // 无有效关键字，显示全部列表
                if (!val) {
                    scope.matchItems = scope.items;
                    scope.$digest();
                    return;
                }

                //  有效关键字无变化，不处理
                if (val == scope.oldKeyword) {
                    return;
                }
                scope.oldKeyword = val;

                // 去掉收尾空格
                var regStr = val;

                // 替换可能出现的正则特殊字符
                regStr = regStr.replace(regSpec, function ($i) {
                    return "\\" + $i;
                })

                // 将中间出现的空格替换为.* 做分词匹配
                regStr = regStr.replace(/\s/g, "\.\*");

                var temp = [];
                scope.matchItems = [];
                for (var i = 0; i < scope.items.length; i++) {
                    var item = scope.items[i];
                    if (new RegExp(regStr, "gi").test(item[scope.labelField])) {
                        temp.push(angular.copy(item));
                    }
                }
                scope.matchItems = temp;
                scope.$digest();
            }

            return {
                require: 'ngModel',
                scope: {
                    items: '=',
                    selectedItem: '=',
                    selectedLabel: '=',
                    editable: '=',
                    readonly: '=',
                    labelField: '@',
                    width: '@',
                    valueField: '&',
                    onSelected: '&'
                },
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: window.webRoot + '/platform/resource/ks/pickers/tpl_ks_autoComplete.html?version=' + window.version,
                link: function (scope, element, attrs, ngModel) {

                    var me = scope;
                    $.extend(me, {

                        init: function () {
                            me.initVars();
                            me.initSize();
                            me.bindEvents();
                        },
                        initVars: function () {

                            me.picker = {
                                visible: false
                            }
                            me.focusItem = null;
                            me.focusIndex = -1;
                            me.searchInput = element.find(me.editable ? ".ks-ac-search-and-result-text" : ".ks-ac-search-text");
                            me.table = element.find(".ks-ac-table");
                            me.showText = element.find(".ks-ac-show-text");
                            me.rowsWrap = element.find(".ks-ac-rows");
                            me.tableHeight = me.rowsWrap.height();
                            me.ul = element.find(".ks-ac-rows");
                            me.pickerElement = element.find(".ks-ac-picker");
                            me.matchItems = [];
                            me.capiticy = Math.round(me.tableHeight / 26);
                            me.resultWrap = element.find(".ks-ac-result");
                            element.attr("ksId", Ac.nextId())
                        },

                        initSize: function () {
                            if (attrs.width) {
                                element.width(attrs.width);
                                me.showText.width(me.elementWidth - 20);
                            }

                            me.elementWidth = element.width();
                        },


                        bindEvents: function () {


                            me.$watch(me.selectedItem,function(){
                                if(me.selectedItem){
                                    me.selectedLabel = me.selectedItem[me.labelField];
                                }
                            })

                            me.ul.on("click", function (e) {
                                var $target = $(e.target);
                                if ($target.hasClass("ks-ac-item")) {
                                    me.switchFocusItemAt($target.attr("index"));
                                    me.hitItem();
                                    me.hidePicker();
                                    return;
                                }

                            })

                            me.searchInput.on("keydown",function(e){

                                // 非控制键，删除键、空格除外
                                if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 32) {
                                } else {
                                    switch (e.keyCode) {
                                        case KEY.ENTER:
                                            me.hitItem();
                                            break;
                                        case KEY.RIGHT:
                                            break;
                                        case KEY.LEFT:
                                            break;
                                        case KEY.DOWN:
                                            me.switchFocusItemStep(1);
                                            break;
                                        case KEY.UP:
                                            me.switchFocusItemStep(-1);
                                            break;
                                        default:
                                            ;
                                    }
                                }
                            })

                            me.searchInput.on("keyup", function (e) {
                                if (!me.picker.visible) {
                                    return;
                                }

                                // 非控制键，删除键、空格除外
                                if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 32) {
                                    filter(me);
                                }

                            })

                            ngModel.$render = function () {

                                var value = ngModel.$viewValue;
                                if (!value) {
                                    me.clearFocus();
                                }
                            }

                            me.searchInput.on("change", function () {
                                //me.selectedItem = null;
                                //ngModel.$setViewValue(null);
                            })


                            element.find(".ks-ac-result").on("click", function (e) {
                                me.showPicker();
                            })


                            $(document.body).on("click", function (e) {
                                var wrap = $(e.target).closest(".ks-ac");
                                if (wrap.size() < 1 || wrap.attr("ksId") != element.attr("ksId")) {
                                    me.hidePicker();
                                    e.stopPropagation();
                                }
                            })

                        },


                        hidePicker: function () {
                            me.picker.visible = false;
                            me.$digest();
                        },

                        showPicker: function () {
                            if(me.readonly){
                                return;
                            }
                            me.picker.visible = true;
                            setTimeout(function(){
                                k.autoFitPopUp(element.find(".ks-ac-picker"))
                            },0)

                            me.$digest();
                            me.searchInput.focus();
                            filter(me);

                        },

                        clearFocus: function () {
                            if (me.focusItem) {
                                me.selectedItem = null;
                                me.focusItem.removeClass("focus");
                                me.focusItem = null;
                                me.focusIndex = -1;
                            }
                        },
                        relocationFocusItem: function () {
                            if (me.focusIndex <= me.capiticy - 1) {
                                me.ul.stop().animate({
                                    scrollTop: 0
                                }, 'fast');
                            } else if (me.focusIndex >= me.matchItems.length - me.capiticy + 1) {
                                me.ul.stop().animate({
                                    scrollTop: me.ul[0].scrollHeight
                                }, 'fast');
                            } else {
                                me.ul.stop().animate({
                                    scrollTop: (me.focusIndex - 1) * 26
                                }, 'fast');
                            }
                        },
                        hitItem: function () {


                            if (me.focusItem) {
                                //me.showText.text(me.focusItem.text());
                                me.selectedItem = me.matchItems[me.focusIndex];
                                if (me.selectedItem) {
                                    var val = me.selectedItem[me.valueField];
                                    ngModel.$setViewValue(val);
                                    if (me.onSelected && angular.isFunction(me.onSelected)) {
                                        me.onSelected(val);
                                    }
                                    me.searchInput.val(me.selectedItem[me.labelField])
                                }

                            } else {
                                //me.selectedItem = null;
                                //ngModel.$setViewValue(null);
                            }

                            me.hidePicker();
                            me.$parent.$digest();
                        },
                        /**
                         * 切换焦点到第n个元素，从0开始
                         * @param index
                         */
                        switchFocusItemAt: function (index) {
                            if (index < 0) {
                                index = (index + me.matchItems.length) % me.matchItems.length;
                            }
                            me.clearFocus();
                            var newIndex = index;
                            var newFocusItem = me.table.find(".ks-ac-item:eq(" + newIndex + ")");
                            if (newFocusItem != null) {
                                newFocusItem.addClass("focus");
                                me.focusItem = newFocusItem;
                                me.focusIndex = newIndex;
                            }
                            me.relocationFocusItem();
                        }
                        ,
                        /**
                         * 上下切换焦点
                         * @param direction
                         */
                        switchFocusItemStep: function (direction) {
                            if (!me.matchItems || me.matchItems.length < 1) {
                                return;
                            }
                            me.switchFocusItemAt((me.focusIndex + direction) % me.matchItems.length)
                        }


                    }, true);

                    me.init();


                }

            }
        }]);
})();
