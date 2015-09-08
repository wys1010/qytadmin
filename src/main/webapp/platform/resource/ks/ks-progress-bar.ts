// Type definitions for Angular JS 1.3+
// Author: Wangyiqun
// Project: http://angularjs.org
// Definitions by: Diego Vilar <http://github.com/diegovilar>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// Version:1.0

/// <reference path="ts/ks-ts-all.ts"/>
/// <reference path="../../../ts-lib/angularjs/angular.d.ts" />


module ks {




angular.module('ks.progressBar',['ks'])


/**
 *组件指令
*/
.directive('ksProgressBar', ['k','$parse',function (k,$parse) {
    return {
        restrict: 'A',
        scope:{visible:'='},
        link: function (scope, element, attrs, ctrls) {

            console.log("ksProgressBarVisible:", attrs.ksProgressBarVisible);
            scope.$watch('visible',function(){
                    if(scope.visible){
                        console.log("显示-----》");
                    }else{
                        console.log("隐藏-----》");
                    }
            });
            scope.$parent.$watch($parse(attrs.ksProgressBarVisible), function(value) {
                scope.visible = !! value;
                if(scope.visible){
                    console.log("显示-----》");
                }else{
                    console.log("隐藏-----》");
                }
            });

            var me = scope;
        }
    }
}]);

///**
//* 组件指令属性
//*/
//.directive('ksProgressBarVisible',  ['k',function (k) {
//        return {
//            restrict: 'A',
//            link: function (scope, element, attrs, ctrls) {
//                console.log('attrs:',attrs)
//                var me = scope;
//
//                $.extend(scope,{
//
//                    maskElement:function(){
//                        var x = k.getX(element);
//                        var y = k.getY(element);
//                        var width = $(element).width();
//                        var height = $(element).height();
//                        console.log("x:" + x + ",y:" + y);
//                        me.$mask.css({
//                            top:x,
//                            left:y,
//                            width:width,
//                            height:height
//                        });
//                    },
//                    bindEvents: function(){
//
//                    },
//
//                    createCmps:function(){
//                        me.$mask = $('<div class="ks-loading"></div>').appendTo(document.body);
//                    },
//
//                    init : function(){
//                        me.createCmps();
//                        me.bindEvents();
//                    }
//
//                },me);
//                me.init();
//            }
//        }
//    }])
}