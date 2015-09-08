/**
 * ks 部门选择组件
 *
 * @author caiwb
 */
(function () {
    angular.module('ks.organizationPicker', ['ks','ks.cache'])
        .directive('ksOrganizationPicker', ["$compile",'ksCache','$timeout',function ($compile,ksCache,$timeout) {

            var matchItem = function(items, val){
                if(!items || !val){
                    return null;
                }
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if(item.id == val){
                        return item;
                    }
                }

                return null;
            }
            return {
                require: 'ngModel',
                scope: {
                    readonly:'='
                },
                restrict: 'E',
                template: '<ks-auto-complete label-field="label" onSelected="onSelected()" readonly="readonly"  value-field="organization" selected-item="selectedItem" items="organizations" ng-model="ngModel"></ks-auto-complete>',
                link: function (scope, element, attrs, ngModel) {


                    ngModel.$render = function(){
                        var value = ngModel.$viewValue;
                        promise.then(function(){
                            scope.selectedItem = matchItem(scope.organizations,value);
                        });

                    }

                    scope.$watch("selectedItem",function(){
                        var val = null;
                        if(scope.selectedItem){
                            val = scope.selectedItem.id;
                        }
                        ngModel.$setViewValue(val);
                    })


                    var promise = ksCache.get("organizations", window.webRoot+"/uc/orgs/picker.do").then(function(data){
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            item.label = item.name;
                        }
                        scope.organizations = data;
                    });

                }
            }
        }]);
})();