
(function(){

    angular.module('ks.fillHeight', [])
        .directive('ksFillHeight', function() {
            return {
                restrict: 'A',
                scope: false,
                link: function(scope, element, attrs, tabsCtrl) {
                    var me = scope;
                    $.extend(scope,{

                        init:function(){
                            me.initVars();
                            me.bindEvents();
                        },

                        initVars:function(){
                            me.$parentWrap = $(element).parent();
                        },

                        bindEvents:function(){
                            setTimeout(function(){
                                me.resize();
                                $(window).resize(function(){
                                    me.resize();
                                });
                            },0);

                        },

                        resize:function(){
                            $(element).height(me.$parentWrap.height());
                        }


                    },true);

                    me.init();
                }
            };
        });
})();

