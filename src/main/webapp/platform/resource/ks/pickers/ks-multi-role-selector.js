/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {


    angular.module('ks.multiRoleSelector', ['ks', 'ks.cache'])
        .directive('ksMultiRoleSelector', ["$compile", 'ksCache', function ($compile, ksCache) {

            ksCache.get("roles", window.webRoot + "/uc/privileges/roles.do").then(function (data) {

            });
            return {
                require: 'ngModel',
                scope: {
                    items: '='
                },
                restrict: 'E',
                template: ' <ks-multi-selector   ng-model="roleIds" id-field="id" items="roles" label-field="name"></ks-multi-selector>',
                link: function (scope, element, attrs, ngModel) {

                    var promise = ksCache.get("roles", window.webRoot + "/uc/privileges/roles.do").then(function (data) {
                        scope.roles = data;
                    });

                    ngModel.$render = function () {
                        var value = ngModel.$viewValue;
                        promise.then(function(data){
                            scope.roleIds = value;
                        })
                    }

                    scope.$watch('roleIds',function(){
                        ngModel.$setViewValue(scope.roleIds);
                    })

                }
            }
        }]);
})();