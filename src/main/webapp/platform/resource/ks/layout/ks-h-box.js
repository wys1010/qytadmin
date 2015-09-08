
(function(){

    angular.module('ks.hBox', [])
        .directive('ksHBox', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                controller: ['$scope',function(scope) {

                }],
                templateUrl: window.webRoot + '/platform/resource/ks/layout/ks-h-box.html?version=' + window.version
            };
        })
        .directive('ksHBoxCell', function() {
            return {
                require: '^ksHBox',
                restrict: 'EA',
                transclude: true,
                scope: {
                    height:'@' // 数值，或者flex常量
                },
                link: function(scope, element, attrs, tabsCtrl) {

                },
                templateUrl: window.webRoot + '/platform/resource/ks/layout/ks-h-box-cell.html?version=' + window.version
            };
        });
})();

