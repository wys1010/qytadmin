// Type definitions for Angular JS 1.3+
// Author: Wangyiqun
// Project: http://angularjs.org
// Definitions by: Diego Vilar <http://github.com/diegovilar>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// Version:1.0
/// <reference path="ts/ks-ts-all.ts"/>
/// <reference path="../../../ts-lib/angularjs/angular.d.ts" />
var ks;
(function (ks) {
    angular.module('ks.progressBar', ['ks']).directive('ksProgressBar', ['k', '$parse', function (k, $parse) {
        return {
            restrict: 'A',
            scope: { visible: '=' },
            link: function (scope, element, attrs, ctrls) {
                console.log("ksProgressBarVisible:", attrs.ksProgressBarVisible);
                scope.$watch('visible', function () {
                    if (scope.visible) {
                        console.log("显示-----》");
                    }
                    else {
                        console.log("隐藏-----》");
                    }
                });
                scope.$parent.$watch($parse(attrs.ksProgressBarVisible), function (value) {
                    scope.visible = !!value;
                    if (scope.visible) {
                        console.log("显示-----》");
                    }
                    else {
                        console.log("隐藏-----》");
                    }
                });
                var me = scope;
            }
        };
    }]);
})(ks || (ks = {}));
//# sourceMappingURL=ks-progress-bar.js.map