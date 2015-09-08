/**
 * ks 员工选择组件
 *
 * @author caiwb
 */
(function () {
    angular.module('ks.staffPicker', ['ks', 'ks.cache'])
        .directive('ksStaffPicker', ["$compile", 'ksCache', '$timeout', function ($compile, ksCache, $timeout) {

            var matchItem = function (items, val) {
                if (!items || !val) {
                    return null;
                }
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.id == val) {
                        return item;
                    }
                }

                return null;
            }
            return {
                require: 'ngModel',
                scope: {
                    readonly: '=',
                    entity: '@',
                    isQryAll:'=?'
                },
                restrict: 'E',
                template: '<ks-auto-complete label-field="label" onSelected="onSelected()" readonly="readonly"  value-field="staff" selected-item="selectedItem" selected-label="selectedLabel" editable="" items="staffs" ng-model="ngModel" style="width: 140px"></ks-auto-complete>',
                link: function (scope, element, attrs, ngModel) {


                    var render = function() {
                        var value = ngModel.$viewValue;
                        promise.then(function () {
                            scope.selectedItem = matchItem(scope.staffs, value);
                        });
                    }


                    var _render = function() {
                        var value = ngModel.$viewValue;
                        var matchResult = matchItem(scope.staffs, value);
                        if(matchResult!=null){
                            scope.selectedItem = matchResult;
                        }
                    }


                    var watch = function() {
                        var val = null;
                        if (scope.selectedItem) {
                            val = scope.selectedItem.id;
                        }
                        ngModel.$setViewValue(val);
                    }

                    scope.$watch("selectedItem", watch);

                    function initData(data) {
                        if (data == null) {
                            data = $.parseJSON(scope.entity)
                        }
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            item.label = item.name;
                        }
                        scope.staffs = data;
                    }

                    if (scope.entity != null && scope.entity.length != 0) {
                        initData(null);
                        ngModel.$render = _render;
                    }else if(!scope.isQryAll){
                        var promise = ksCache.get("staffs", window.webRoot + "/uc/user/staffs/picker.do").then(function (data) {
                            initData(data)
                        });

                        ngModel.$render = render;
                    }else{
                        var promise = ksCache.get("allStaffs", window.webRoot + "/uc/user/staffs/all.do").then(function (data) {
                            initData(data)
                        });

                        ngModel.$render = render;
                    }

                }
            }
        }])
    ;
})
();