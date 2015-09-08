
(function(){

    angular.module('ks.tab', [])
        .directive('ksTabs', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                controller: ['$scope',function($scope) {
                    var panes = $scope.panes = [];

                    $scope.select = function(pane) {
                        angular.forEach(panes, function(pane) {
                            pane.selected = false;
                        });
                        pane.selected = true;
                        pane.onSelectTab();
                    };

                    this.select = function(pane){
                        $scope.select(pane)
                    }

                    this.addPane = function(pane) {
                        if (panes.length === 0) {
                            $scope.select(pane);
                        }
                        panes.push(pane);
                    };
                }],
                templateUrl: window.webRoot + '/platform/resource/ks/ks-tabs.html?version=' + window.version
            };
        })
        .directive('ksTabPane', function() {
            return {
                require: '^ksTabs',
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@',
                    selected:'@',
                    onSelectTab:'&'
                },
                link: function(scope, element, attrs, tabsCtrl) {
                    tabsCtrl.addPane(scope);
                    if(attrs.selected ==='true'){
                        tabsCtrl.select(scope);
                    }
                    //$(element).css({
                    //    height:'100%',
                    //    width:'100%',
                    //    display:'block',
                    //    visibility:'visible'
                    //});

                },
                templateUrl: window.webRoot + '/platform/resource/ks/ks-tab-pane.html?version=' + window.version
            };
        });
})();

