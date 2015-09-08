/**
 * 公共picker组件
 */
(function () {
    angular.module('ks.popUpPicker', ['ks'])
        .directive('ksPopupPicker', ['k', function (k) {
            return {
                scope: {
                    showPicker:'=',
                    width:'@',
                    height:'@'
                },
                replace: true,
                restrict: 'E',
                transclude: true,
                template: ' <div class="ks-popup-picker-wrapper">' +
                '<div class="ks-popup-picker " ng-show="showPicker" ng-style="style"><div ng-transclude></div></div></div>',
                link: function (scope, element, attrs) {

                    var $picker = $(element).find('.ks-popup-picker');

                    scope.$watch('showPicker',function(newValue){
                        if(scope.showPicker){
                            scope.showPicker = newValue;

                            setTimeout(function(){
                                k.autoFitPopUp($picker);
                            },0)
                        }
                    })

                    scope.style = {width:scope.width,height:scope.height}


                }
            }
        }]);
})();