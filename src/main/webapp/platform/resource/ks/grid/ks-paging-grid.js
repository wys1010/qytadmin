
(function(){

    angular.module('ks.vBox', ['ks'])
        .directive('ksVBox', function() {
            return {
                restrict: 'E',
                transclude: true,
                replace:true,
                scope: {
                    height:'@'
                },
                link: function(scope, element, attrs) {
                    scope.$wrap = $(element);
                    scope.$parentWrap = $(element).parent();
                },
                controller: ['$scope','k',function(scope,k) {

                    this.addCell = function(cell){
                        scope.cells.push(cell);
                        if(cell.height == 'flex'){
                            scope.flexCells.push(cell);
                        }else{
                            scope.fixedCells.push(cell);
                        }
                    }

                    var me = scope;
                    $.extend(scope,{

                        init:function(){
                            me.initVars();
                            me.bindEvents();
                        },

                        initVars:function(){
                            me.cells = [];
                            me.fixedCells = [];
                            me.flexCells = [];

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
                            console.log("resize in ks v box")
                            var winHeight =  k.getWinHeight()
                            var fixedHeight = 0;
                            var wrapHeight = 0;


                            // 不设置高度，默认充满整个空间
                            if(!me.height){
                                //if(me.$parentWrap[0].tagName == 'BODY'){
                                //    wrapHeight = winHeight - 20;
                                //}else{
                                    wrapHeight = me.$parentWrap.height();
                                //}
                                me.$wrap.height(wrapHeight);
                            }


                            for (var i = 0; i < me.fixedCells.length; i++) {
                                var fixedCell = me.fixedCells[i];
                                fixedHeight += $(fixedCell.$wrap).height();
                            }
                            var flexCellsNum = me.flexCells.length;
                            if(flexCellsNum > 0){
                                var avgHeight = (wrapHeight - fixedHeight)/flexCellsNum;
                                for (var i = 0; i < me.flexCells.length; i++) {
                                    var flexCell = me.flexCells[i];
                                    flexCell.$wrap.height(avgHeight);
                                }
                            }
                        }
                        

                    },true);

                    me.init();
                }],
                templateUrl: window.webRoot + '/platform/resource/ks/layout/ks-v-box.html?version=' + window.version
            };
        })
        .directive('ksVBoxCell', function() {
            return {
                require: '^ksVBox',
                restrict: 'EA',
                replace:true,
                transclude: true,
                scope: {
                    height:'@' // 数值，或者flex常量
                },
                link: function(scope, element, attrs, ksVBoxCtrl) {
                    scope.$wrap = $(element);
                    ksVBoxCtrl.addCell(scope)
                },
                templateUrl: window.webRoot + '/platform/resource/ks/layout/ks-v-box-cell.html?version=' + window.version
            };
        });
})();

