/**
 * ks 进度条组件
 * @author Wangyiqun
 * @date 2015-01-15
 */
(function () {
    angular.module('ks.loading', ['ks'])
        .directive('ksLoading', function () {
            return {
                scope:{
                    visible : "="
                },
                restrict: 'A',
                link: function(scope, element, attrs){

                    var me = scope;
                    $.extend(scope,{
                        init:function(){
                            me.createElement();
                            me.bindEvent();
                        },

                        createElement:function(){
                            me.$mask = $('<div class="bg"></div><div id="loading"></div>').appendTo(document.body);
                        },
                        bindEvent:function(){

                            me.$watch('visible',function(newValue){
                                if(newValue){
                                    $(me.$mask[0]).show();
                                    $(me.$mask[1]).spin('large');
                                }else{
                                    $(me.$mask[0]).hide();
                                    $(me.$mask[1]).spin(false);
                                }
                            })
                        }
                    });
                    me.init();
                }
            }});

})();