(function () {
    angular.module('ks.myDatePicker', ['ks'])
        .directive('ksMyDatePicker', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    format: '=?'
                },
                link: function (scope, element, attr, ngModel) {

                    if(!scope.format){
                        scope.format = "yyyy-MM-dd"
                    }


                    scope.$watch('format',function(newVal){
                        scope.format = newVal
                    })

                    element.val(ngModel.$viewValue);

                    function onpicking(dp) {
                        var date = dp.cal.getNewDateStr();
                        console.log(date);
                        scope.$apply(function () {
                            ngModel.$setViewValue(date);
                        });
                    }

                    element.bind('click', function () {
                        console.log("format:",scope.format);
                        new WdatePicker({
                            onpicking: onpicking,
                            dateFmt: scope.format
                        })
                    });
                }
            };
        })
})();