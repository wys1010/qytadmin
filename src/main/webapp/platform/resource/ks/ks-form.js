/**
 * @author Wangyiqun
 * @date 2015-03-17
 */
(function () {
    angular.module('ks.form', [])
        .directive('ksForm', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    labelWidth: '@',
                    invalid: '=?'//必选项验证
                },
                link: function (scope, element, attrs) {

                    var formName = $(element).attr("name");
                    if (scope[formName]) {
                        scope.$watch(formName+'.$valid',function(value){
                            scope.invalid = value;
                        })
                    }

                },
                controller: ['$scope', function ($scope) {

                    this.labelWidth = $scope.labelWidth;
                    var me = $scope;
                    $.extend($scope, {});
                }],
                templateUrl: window.webRoot + '/platform/resource/ks/ks-form.html?version=' + window.version
            };
        })
        .directive('ksField', function () {
            return {
                require: '^ksForm',
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    label: '@',
                    labelWidth: '@',
                    width: '@',
                    fields: '@',
                    fieldWidth: '@',
                    required: '@'
                },
                link: function (scope, element, attrs, ksFormCtrl) {

                    var me = scope;
                    $.extend(scope, {

                        init: function () {
                            me.initVar();
                            me.resize();
                        },

                        initVar: function () {
                            me.$label = element.find("label.ks-n-label");
                            me.$fieldsWrap = element.find('.ks-n-control-wrap');
                        },
                        resize: function () {
                            me.realLabelWidth = attrs.labelWidth || ksFormCtrl.labelWidth || 50;

                            me.$label.width(me.realLabelWidth);
                            if (attrs.width) {
                                element.width(attrs.width);
                            } else if (attrs.fields) {
                                me.realWrapWidth = 200 * attrs.fields;
                            } else {
                                me.realWrapWidth = attrs.width || 200;
                            }
                            element.width(me.realWrapWidth);
                            me.$fieldsWrap.width(me.realWrapWidth - me.realLabelWidth - 5);
                        }
                    }, true);

                    me.init();

                },
                templateUrl: window.webRoot + '/platform/resource/ks/ks-field.html?version=' + window.version
            };
        });
})();
