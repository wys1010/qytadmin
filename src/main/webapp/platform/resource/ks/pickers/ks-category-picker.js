/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.categoryPicker', ['ks','ks.cache'])
        .directive('ksCategoryPicker', ["$compile",'ksCache','$timeout',function ($compile,ksCache,$timeout) {

            var matchItem = function(items, val){
                if(!items || !val){
                    return null;
                }
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if(item.category == val){
                        return item;
                    }
                }

                return null;
            }
            return {
                require: 'ngModel',
                scope: {
                    width:"@",
                    readonly:'=',
                    onSelected:'&',
                    selectedItem:'=?'
                },
                restrict: 'E',
                template: '<ks-auto-complete label-field="label" width="{{width}}" onSelected="onSelected()" readonly="readonly"  value-field="category" selected-item="selectedItem" items="categories" ng-model="ngModel"></ks-auto-complete>',
                link: function (scope, element, attrs, ngModel) {
                    ngModel.$render = function(){
                        var value = ngModel.$viewValue;
                        promise.then(function(){
                            scope.selectedItem = matchItem(scope.categories,value);
                        });

                    }

                    scope.$watch("selectedItem",function(){
                        var val = null;
                        if(scope.selectedItem){
                            val = scope.selectedItem.category;
                        }
                        ngModel.$setViewValue(val);
                    })


                    var promise = ksCache.get("categories", window.webRoot+"/pdm/categories/all.do").then(function(data){
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            item.label = item.category + " | " + item.nameCn;
                        }
                        scope.categories = data;
                    });

                }
            }
        }]);
})();