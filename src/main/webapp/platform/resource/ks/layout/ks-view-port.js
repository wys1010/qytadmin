
(function(){

    angular.module('ks.viewPort', ['ks'])
        .directive('ksViewPort', ['k',function(k) {
            return {
                restrict: 'A',
                scope: {},
                link: function(scope,element) {
                    var me = scope;
                    $.extend(scope,{

                        init:function(){
                            me.initVars();
                            me.bindEvents();
                        },

                        initVars:function(){
                            $(element).css("overflow","hidden");
                        },

                        bindEvents:function(){
                            setTimeout(function(){
                                me.resize();
                            },0);

                            setTimeout(function(){
                                me.resize();
                            },100);

                            setTimeout(function(){
                                me.resize();
                            },200);

                            $(window).resize(function(){
                                me.resize();
                            });
                        },

                        resize:function(){
                            var winHeight =  k.getWinHeight();
                            $(element).height(winHeight - 20);

                        }


                    },true);

                    me.init();
                }
            };
        }])
})();

