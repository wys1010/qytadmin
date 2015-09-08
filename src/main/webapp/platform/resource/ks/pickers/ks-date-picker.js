/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.datePicker', ['ks','ks.cache'])
        .directive('ksDatePicker', ["$compile",'ksCache',function ($compile,ksCache) {


            return {
                require: 'ngModel',
                scope: {
                    readonly:'=?'
                },
                restrict: 'E',
                templateUrl: window.webRoot+'/platform/resource/ks/pickers/ks-date-picker.html?version=' + window.version,
                link: function (scope, element, attrs, ngModel) {
                    scope.selectedDate = new Date().getTime();

                    scope.isOpen = false;
                    scope.open = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        scope.isOpen = true;
                    }

                    ngModel.$render = function(){
                        var value = ngModel.$viewValue;
                        if(value && angular.isDate(value)){
                            scope.selectedDate = value.getTime();
                        }else{
                            scope.selectedDate = value;
                        }

                    }

                    scope.$watch("selectedDate",function(){
                        if(scope.selectedDate && angular.isDate(scope.selectedDate)){
                            ngModel.$setViewValue(scope.selectedDate.getTime());
                        }else{
                            ngModel.$setViewValue(scope.selectedDate);
                        }

                    })
                }
            }
        }]);
})();