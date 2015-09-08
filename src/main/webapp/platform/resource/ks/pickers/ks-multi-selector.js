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

    angular.module('ks.multiSelector', ['ks', 'ks.cache'])
        .directive('ksMultiSelector', ["$compile", 'ksCache','k', function ($compile, ksCache,k) {


            return {
                require: 'ngModel',
                scope: {
                    items: '=',
                    selectedItems: '=?',
                    idField:'@',
                    labelField:'@'
                },
                restrict: 'E',
                replace:true,
                transclude: true,
                templateUrl: window.webRoot + '/platform/resource/ks/pickers/tpl_ks_multiSelector.html?version=' + window.version,
                link: function (scope, element, attrs, ngModel) {

                    var me = scope;
                    $.extend(me, {

                        init: function () {
                            me.initVars();
                            me.bindEvents();
                        },


                        removeItem:function(item){
                            item.checked = false;
                            me.matchItems();
                        },

                        clearItem:function(){

                            me.selectedItems = null;
                            if(me.items && me.items.length > 0){
                                for (var i = 0; i < me.items.length; i++) {
                                    var item = me.items[i];
                                    item.checked = false;
                                }
                            }
                            ngModel.$setViewValue(null);
                        },

                        matchItems:function(){
                            if(!me.items || me.items.length < 1){
                                me.selectedItems = null;
                                return;
                            }
                            var selectedItems = [];
                            var ids = [];
                            for (var i = 0; i < me.items.length; i++) {
                                var item = me.items[i];
                                if(item.checked){
                                    selectedItems.push(item);
                                    ids.push(item[me.idField]);
                                }
                            }
                            me.selectedItems = selectedItems;
                            ngModel.$setViewValue(ids.join(","));
                        },
                        initVars: function () {

                            if(!me.idField){
                                me.idField = 'id';
                            }

                            if(!me.labelField){
                                me.labelField = 'name';
                            }

                            me.picker = {
                                visible: false
                            }
                            me.focusItem = null;
                            me.table = element.find(".ks-ac-table");
                            me.rowsWrap = element.find(".ks-ac-rows");
                            me.tableHeight = me.rowsWrap.height();
                            me.pickerElement = element.find(".ks-ac-picker");
                            me.resultWrap = element.find(".ks-multi-selector-result");
                            me.pickerElement.height(300)
                            me.showBtn = element.find(".ks-multi-selector-btn");
                            element.attr("ksId", Ac.nextId())
                        },


                        bindEvents: function () {


                            ngModel.$render = function () {

                                var value = ngModel.$viewValue;
                                if (!value) {
                                    me.clearItem();
                                } else if(me.items){
                                    var ids = value.split(",");
                                    var selectedItems = [];
                                    for (var i = 0; i < me.items.length; i++) {
                                        var item = me.items[i];
                                        if(ids.indexOf(item[me.idField] + "") >= 0){
                                            item.checked = true;
                                            selectedItems.push(item);
                                        }
                                    }
                                    me.selectedItems = selectedItems;
                                }
                            }








                            me.showBtn.on("click", function (e) {
                                if(me.picker.visible){
                                    me.hidePicker();
                                }else{
                                    me.showPicker();
                                }

                            })


                            $(document.body).on("click", function (e) {
                                var wrap = $(e.target).closest(".ks-multi-selector");
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
                            setTimeout(function(){
                                k.autoFitPopUp(element.find(".ks-ac-picker"))
                            },0)
                            me.$digest();
                        }

                    }, true);

                    me.init();

                }
            }
        }]);
})();