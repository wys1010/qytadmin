/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {


    angular.module('ks.multiDistrictSelector', ['ks', 'ks.cache'])
        .directive('ksMultiDistrictSelector', ["$compile", 'ksCache', function ($compile, ksCache) {

            ksCache.get("districts", window.webRoot + "/pdm/basic/districts/all.do").then(function (data) {

            });
            return {
                require: 'ngModel',
                scope: {
                    items: '=',
                    mode: '@'//all sell
                },
                restrict: 'E',
                template: ' <ks-multi-selector   ng-model="selectedDistricts" items="districts" id-field="districtCode" label-field="name"></ks-multi-selector>',
                link: function (scope, element, attrs, ngModel) {
                	var url = "/pdm/basic/districts/all.do";
                	if (scope.mode == 'all')
                		url = "/pdm/basic/districts/all.do";
                	else if (scope.mode == 'sell')
                		url = "/pdm/basic/districts/picker.do";
                	
                	scope.selectedDistricts = null;

                    var promise = ksCache.get("districts", window.webRoot + url).then(function (data) {
                        scope.districts = data;
                    });

                    ngModel.$render = function () {
                        var value = ngModel.$viewValue;
                        promise.then(function(data){
                            scope.selectedDistricts = value;
                        })
                    }

                    scope.$watch('selectedDistricts',function(){
                        ngModel.$setViewValue(scope.selectedDistricts);
                    })

                }
            }
        }]);
})();