/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.operator', ['ks'])
        .directive('ksOperator', function () {
            return {
                scope:{
                    entity:'='
                },
                restrict: 'E',
                replace:true,
                transclude:true,
                template:' <div class="ks-operator" style="overflow: hidden">' +
                    '<label>创建人：</label><input  date-format ng-model="createdBy" class="disabled ks-operator-input name" disabled name="operatorName" />' +
                    '<label>创建时间：</label><input  date-format ng-model="entity.createdAt" class="ks-operator-input" name="createdAt" disabled />'+
                        '<label>最后修改：</label><input date-format ng-model="entity.updatedAt" class="ks-operator-input" name="updatedAt" style="color:#00b300"  disabled/>'+
                '</div>',
                link: function(scope, element, attrs){

                    scope.$watch('entity',function(){
                        if(!scope.entity){
                            scope.createdBy = null;
                        }else{
                            scope.createdBy = scope.entity.createdByName || scope.entity.operatorName
                        }

                    })

                }

            }
        });
})();