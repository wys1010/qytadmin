/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.orgTree', ['ks', 'ks.cache'])
        .directive('ksOrgTree', ["$compile", 'ksCache', 'ksEntityService', 'ksTip', function ($compile, ksCache, ksEntityService, ksTip) {
            ksCache.get("allOrganizations", window.webRoot + '/uc/orgs/allOrganizations.do')
            function convertData(organizations) {

                var ds = [];

                for (var key in organizations) {
                    var organization = organizations[key];

                    if (organization.parentId == null) {
                        var treeItem = {};
                        treeItem.id = organization.id;
                        treeItem.text = organization.name;
                        treeItem._iconCls = "uc-icon-module";
                        treeItem.children = [];
                        treeItem.organization = organization;

                        findTreeItems(organizations, organization, treeItem.children);

                        ds.push(treeItem);
                    }
                }

                return ds;

            }

            function findTreeItems(organizations, organization, treeItems) {
                for (var key in organizations) {
                    var current = organizations[key];

                    if (current.parentId == organization.id) {
                        var treeItem = {}
                        treeItem.id = current.id;
                        treeItem._iconCls = "uc-icon-leaf";
                        treeItem.text = current.name;
                        treeItem.organization = current;
                        treeItem.children = [];

                        treeItems.push(treeItem);

                        findTreeItems(organizations, current, treeItem.children);

                        if (treeItem.children.length <= 0)
                            treeItem.children = null;
                    }
                }
            }

            return {
                require: 'ngModel',
                scope: {
                    selectedItem: '=?'
                },
                restrict: 'E',
                template: '<ks-tree-picker data="data" selected-item="selectedItem" label-field="text"  checkedable="false" ng-model="selectedId"></ks-tree-picker>',
                link: function (scope, element, attrs, ngModel) {

                    var promise = ksCache.get("allOrganizations", window.webRoot + '/uc/orgs/allOrganizations.do').then(function (data) {
                        scope.data = convertData(data);
                    });



                    var me = scope;
                    $.extend(me, {

                        init: function () {
                            me.bindEvents();
                        },

                        bindEvents:function(){

                            me.$watch('selectedId', function () {
                                ngModel.$setViewValue(me.selectedId);
                            })

                            me.$watch('selectedItem', function () {
                                me.selectedId = me.selectedItem ? me.selectedItem.id : null;
                            })

                            ngModel.$render = function () {
                                var value = ngModel.$viewValue;
                                promise.then(function(data){
                                    me.selectedId = value;
                                })
                            }

                        }


                    }, true);

                    me.init();

                }
            }
        }]);
})();