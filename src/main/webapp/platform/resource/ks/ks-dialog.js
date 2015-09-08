/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.dialog', ['ks'])
        .directive('ksDialog', function () {
            return {
                require: 'ngModel',
                scope:{
                    visible:'=',
                    width:'@',
                    height:'@',
                    onClose:"&",
                    templateUrl:'@'
                },
                restrict: 'E',
                replace:true,
                transclude:true,
                templateUrl:'{{templateUrl}}',
                link: function(scope, element, attrs,ngModel){

                    scope.$mask = $('<div class="ks-dialog-mask" ></div>').appendTo($(document.body));
                    scope.$mask.fadeTo(0,.5);

                    scope.getWinHeight = function() {
                        var de = document.documentElement;
                        return self.innerHeight||(de && de.clientHeight)||document.body.clientHeight;
                    }

                    scope.getWinWidth = function() {
                        var de = document.documentElement;
                        return self.innerWidth||(de && de.clientWidth)||document.body.clientWidth;
                    }

                    scope.resize = function(){
                        var left = (scope.getWinWidth() - $(element).width())/2;
                        var top = (scope.getWinHeight() - $(element).height())/2;
                        left = left > 0 ? left : 0;
                        top = top > 0 ? top : 0;
                        $(element).css({
                            left: left + "px",
                            top:  top + "px"
                        });

                        scope.$mask.css({
                            width: scope.getWinWidth() + "px",
                            height:  scope.getWinHeight() + "px"
                        });
                    }

                    $(window).resize(function(){
                        scope.resize();
                    });

                    scope.resize();

                    $(element).addClass('ks-dialog');
                    $(element).css({
                        width: scope.width || 500 + "px",
                        height: scope.height || 600 + "px"
                    });


                    ngModel.$render = function(){
                    }


                    scope.$watch("visible",function(value){
                        if(value === true){
                            $(element).show();
                            scope.$mask.show();
                        }else{
                            $(element).hide();
                            scope.$mask.hide();
                        }
                    });

                    scope.close = function(){
                        scope.dialog.visible = false;
                        scope.onClose();
                    };

                }

            }
        });
})();