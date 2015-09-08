(function () {

    var Ac = {}

    Ac.nextIdFactory = function () {
        var _id = 0;

        return function () {
            return _id++;
        }
    }
    Ac.nextId = Ac.nextIdFactory();

    angular.module('ks.autoCompleteKw', ['ks', 'ks.pinyinEngine']).directive('ksAutoCompleteKw', ['$parse', 'k', 'ksEntityService', 'ksPinyinEngine',
        function ($parse, k, ksEntityService, ksPinyinEngine) {

            var KEY = {
                ENTER: 13,
                RIGHT: 39,
                LEFT: 37,
                DOWN: 40,
                UP: 38
            }

            /**
             * 说明：
             * tip: 说明的文字
             * placeholder: placeholder
             * columnInfos: 列信息：[{filed:"name",label:"姓名",width:100,align:'left'},{...}....]
             * url: 请求后台URL
             * datas: 静态数据
             * selectedItem: 被选中的对象
             * selectOnly: true：只能存匹配的数据 不能随意输入
             * displayField: 显示到input中的属性
             * valueField: 指定属性作为值
             * enableMulti: 是否支持多选
             * readonly : 是否只读
             * inputWidth : 搜索框宽度
             */
            return {
                require: 'ngModel',
                scope: {
                    tip: '@?',
                    placeholder: '@?',
                    columnInfos: '=',
                    url: '=?',
                    datas: '=?',
                    selectedItem: '=',
                    selectOnly: '=?',
                    displayField: '@',
                    valueField: '@?',
                    enableMulti: '=?',
                    readonly:'=',
                    inputWidth:'=?',
                    disableItemIfFieldNull:'@?'
                },
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: window.webRoot + '/platform/resource/ks/pickers/tpl_ks_autoComplete_kw.html?version=' + window.version,
                link: function (scope, element, attrs, ngModel) {

                    var me = scope;

                    $.extend(me, {

                        cacheData: function () {
                            if (!me.isBackgroundRequest) {
                                var rows = me.datas.rows;
                                for (var i = 0; i < rows.length; i++) {
                                    var item = rows[i];
                                    for (var j in me.columnInfos) {
                                        var columnField = me.columnInfos[j].field;
                                        var value = item[columnField];
                                        if (angular.isNumber(value)) {
                                            value = value + '';
                                        }
                                        ksPinyinEngine.setCache([value], item);
                                    }
                                }

                                me.matchItems = rows;

                            }
                        },


                        init: function () {
                            me.initVars();
                            me.initSize();
                            me.bindEvents();
                            me.cacheData();
                        },

                        loadData: function () {
                            var keyword = me.selectedLabel;
                            if (me.url && me.isBackgroundRequest) {

                                clearTimeout(me.timer);
                                me.timer = setTimeout(function(){
                                    ksEntityService.get(me.url, {
                                        limit: 10,
                                        keyword: keyword
                                    }).success(function (data) {
                                        me.matchItems = data.rows;
                                        me.results = data.results;
                                    }).error(function () {
                                        alert("error");
                                    });
                                },200);

                            }

                        },

                        initVars: function () {

                            me.timer;

                            me.results = 0;

                            me.matchItems = [];

                            me.picker = {
                                visible: false
                            }

                            me.selectItemIndex = 0;

                            me.isBackgroundRequest = (me.datas && me.datas.rows && me.datas.rows.length > 0) ? false : true;

                            me.selectedLabels = [];
                            me.selectedLabel = "";

                            me.selectedValues = [];
                            me.selectedItems = [];

                            me.focusItem = null;
                            me.focusIndex = -1;
                            me.searchInput = element.find(me.selectOnly ? ".ks-ac-multi-text" : ".ks-ac-search-text");

                            me.table = element.find(".ks-ac-table");
                            me.bodyTable = element.find(".ks-ac-body-table");
                            me.rows = element.find(".ks-ac-rows");
                            me.pickerElement = element.find(".ks-ac-picker");
                            me.tags_con = element.find('.tags_con');
                            me.tags = element.find('.div_tags');
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

                            me.$watch('selectedItem',function(value){
                                if(value && angular.isArray(value) && value.length > 0){
                                    me.selectedLabels = angular.copy(value);
                                    if (!me.enableMulti){
                                        me.searchInput.hide();
                                    }
                                }else{
                                    if (!me.enableMulti) {
                                        me.clearMulti();
                                    }
                                }
                            },true)

                            me.$watch('columnInfos', function (newValue) {
                                if (newValue) {
                                    me.columnInfos = newValue;
                                }
                            })

                            me.$watch('selectedLabel', function (newVal) {
                                if (newVal) {
                                    if (!me.isBackgroundRequest) {
                                        me.pinYinSearch(newVal);
                                    } else {
                                        me.loadData();
                                    }
                                } else {
                                    if (!me.isBackgroundRequest) {
                                        me.matchItems = me.datas.rows;
                                    } else {
                                        me.loadData();
                                    }

                                }
                            })

                            me.bodyTable.on("click", function (e) {
                                var $target = $(e.target);
                                if ($target.closest('.ks-ac-rows').hasClass("ks-ac-rows")) {
                                    me.focusItem = $target.closest('.ks-ac-rows');
                                    me.focusIndex = me.focusItem.attr("index");
                                    me.selectItemIndex = me.focusIndex;
                                    me.hitItem();
                                    me.hidePicker();
                                }
                                return;
                            })


                            me.searchInput.on("keydown", function (e) {

                                var $target = $(e.target);
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


                            ngModel.$render = function () {
                                var value = ngModel.$viewValue;
                                if (!value) {
                                    me.clearFocus();
                                }
                            }


                            $(document.body).on("click", function (e) {
                                var wrap = $(e.target).closest(".ks-ac");
                                if (wrap.size() < 1 || wrap.attr("ksId") != element.attr("ksId")) {
                                    me.hidePicker();
                                    e.stopPropagation();
                                }
                            })


                            me.searchInput.on('click', function () {
                                me.showPicker();
                                me.loadData();
                            })

                        },


                        pinYinSearch: function (keyword) {
                            me.matchItems = [];
                            ksPinyinEngine.search(keyword, function (data) {
                                me.matchItems.push(data);
                            });
                            me.results = me.matchItems.length;
                        },


                        hidePicker: function () {
                            me.picker.visible = false;
                            me.$digest();
                        },

                        showPicker: function () {
                            if (me.readonly) {
                                return;
                            }
                            me.picker.visible = true;

                            setTimeout(function () {
                                k.autoFitPopUp($(element).find('.ks-ac-item-wrap'));
                            }, 0);

                            me.$digest();
                            me.searchInput.focus();

                        },

                        resizeMultiWidth: function (isExpand, index) {
                            var tagTotalWidth = me.searchInput.width();
                            element.find(".tag").each(function () {
                                tagTotalWidth += $(this).width() + 30;
                            })

                            if (tagTotalWidth != 0 && isExpand && tagTotalWidth > me.tags.width()) {
                                me.tags.width(tagTotalWidth);
                            } else if (tagTotalWidth != 0 && !isExpand && tagTotalWidth < me.tags.width()) {
                                me.tags.width(me.tags.width() - element.find('.tag').eq(index).width());
                            }

                        },

                        clearMulti:function(){
                            me.searchInput.show();
                            me.selectedItems = [];
                            me.selectedItem = [];
                            me.selectedValues = [];
                            me.selectedLabels = [];
                        },

                        clearFocus: function (index) {
                            if (me.selectOnly && index !== undefined) {
                                me.selectedLabels.splice(index, 1);
                                me.selectedItems.splice(index, 1);
                                me.selectedValues.splice(index, 1);
                                me.selectedItem = me.selectedItems;
                                ngModel.$setViewValue(me.selectedValues);

                                if (!me.enableMulti) {
                                    me.clearMulti();
                                } else {
                                    me.resizeMultiWidth(false, index);
                                }

                            } else {
                                if (me.focusItem) {
                                    me.focusItem.removeClass("focus");
                                    me.focusItem = null;
                                    me.focusIndex = -1;
                                    me.selectedItem = [];
                                    me.selectedLabel = null;
                                    me.selectItemIndex = 0;
                                }

                            }
                        },
                        hitItem: function () {

                            if (me.focusItem) {
                                var _selectedItem = me.matchItems[me.selectItemIndex];
                                if (_selectedItem) {
                                    var label = _selectedItem[me.displayField];
                                    if (!me.selectOnly) {
                                        me.selectedItem = _selectedItem;
                                        ngModel.$setViewValue(label);
                                        me.searchInput.val(label)
                                    } else {

                                        for (var i in me.selectedLabels) {
                                            var selectedLabel = me.selectedLabels[i][me.displayField];
                                            if (selectedLabel == label) {
                                                return;
                                            }
                                        }

                                        var value = _selectedItem[me.valueField];
                                        me.selectedValues.push(value);
                                        ngModel.$setViewValue(me.selectedValues);

                                        me.selectedItems.push(_selectedItem);
                                        me.selectedItem = me.selectedItems;

                                        me.selectedLabels.push(_selectedItem);
                                        me.selectedLabel = null;

                                        if (!me.enableMulti) {
                                            me.searchInput.hide();
                                        } else {
                                            setTimeout(function () {
                                                me.resizeMultiWidth(true);
                                            }, 0);
                                        }

                                    }

                                }

                            } else {
                                //me.selectedItem = null;
                                //ngModel.$setViewValue(null);
                            }

                            me.focusIndex = -1;
                            me.selectItemIndex = 0;
                            me.hidePicker();
                            me.$parent.$digest();
                        },

                        /**
                         * 切换焦点到第n个元素，从0开始
                         * @param index
                         */
                        switchFocusItemAt: function (index) {
                            var acRowsLen = me.table.find(".ks-ac-rows").length;
                            if (index < 0) {
                                index = acRowsLen - 1;
                            } else if (index > 9 || acRowsLen == index) {
                                index = 0;
                            }
                            me.clearFocus();
                            var newIndex = index;
                            var newFocusItem = me.table.find(".ks-ac-rows:eq(" + newIndex + ")");
                            if (newFocusItem != null && newFocusItem.hasClass("ks-ac-rows")) {
                                newFocusItem.addClass("focus");
                                me.focusItem = newFocusItem;
                                me.focusIndex = newIndex;
                                me.selectItemIndex = newFocusItem.attr('index');

                            }
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