/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.treePicker', ['ks', 'ks.cache'])
        .directive('ksTreePicker', ["$compile", 'ksCache', function ($compile, ksCache) {


            return {
                require: 'ngModel',
                scope: {
                    data: '=',
                    selectedItem: '=?'
                },
                restrict: 'E',
                templateUrl: window.webRoot + '/platform/resource/ks/pickers/tpl_ks_treePicker.html?version=' + window.version,
                link: function (scope, element, attrs, ngModel) {


                    //ngModel.$render = function(){
                    //    var value = ngModel.$viewValue;
                    //}


                    var me = scope;
                    $.extend(me, {

                        init: function () {
                            me.initVars();
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
                            me.pickerElement = element.find(".ks-ac-picker");
                            me.resultWrap = element.find(".ks-ac-result");
                        },

                        selectItem: function () {
                            if (me.selectedItem) {
                                me.showText.text(me.selectedItem.text);
                                me.selectedId = me.selectedItem.id;
                                me.picker.visible = false;
                                ngModel.$setViewValue(me.selectedId);
                                me.$digest();
                                me.$parent.$digest();
                            }

                        },



                        bindEvents: function () {

                            me.$watch('selectedId', function () {
                                ngModel.$setViewValue(me.selectedId);
                            })

                            me.$watch('selectedItem',function(){
                                if (me.selectedItem) {
                                    me.showText.text(me.selectedItem.text);
                                    me.selectedId = me.selectedItem.id;
                                    ngModel.$setViewValue(me.selectedId);
                                } else {
                                    me.showText.text('');
                                    me.selectedId = null;
                                    ngModel.$setViewValue(null);
                                }
                            })


                            ngModel.$render = function () {

                                var value = ngModel.$viewValue;
                                me.selectedId = value;
                            }


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
                            me.picker.visible = true;
                            me.$digest();
                        }

                    }, true);

                    me.init();

                }
            }
        }]);
})();