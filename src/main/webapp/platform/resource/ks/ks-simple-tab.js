
(function(){

    angular.module('ks.simpleTab', [])
        .directive('ksSimpleTab', function() {
            return {
                restrict: 'E',
                replace:false,
                transclude: true,
                scope: {
                    tabs:'=',
                    onSelected:'&'
                },
                link: function($scope) {

                    $scope.select = function(tab){
                        for (var i = 0; i < $scope.tabs.length; i++) {
                            var t = $scope.tabs[i];
                            t.selected = false;
                        }
                        tab.selected = true;

                        $scope.onSelected();

                        setTimeout(function(){
                           $(window).trigger('resize')
                        },10)
                    }

                },
                templateUrl: window.webRoot + '/platform/resource/ks/ks-simple-tab.html?version=' + window.version
            };
        })
})();

