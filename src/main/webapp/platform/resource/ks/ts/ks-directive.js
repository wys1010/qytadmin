/// <reference path="ks-ts-all.ts"/>
/// <reference path="../../../../ts-lib/angularjs/angular.d.ts" />
var ks;
(function (ks) {
    var Directive = (function () {
        function Directive(name, inject) {
            angular.module(name).directive(name);
        }
        return Directive;
    })();
    ks.Directive = Directive;
})(ks || (ks = {}));
//# sourceMappingURL=ks-directive.js.map