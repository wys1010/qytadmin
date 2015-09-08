/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="ks-type.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ks;
(function (ks) {
    var TypeAheadItem = (function () {
        function TypeAheadItem() {
        }
        return TypeAheadItem;
    })();
    ks.TypeAheadItem = TypeAheadItem;
    var CommonController = (function () {
        function CommonController($scope, $state, $stateParams, $http, $cacheFactory, $filter, ksEntityService, ksDicts, ksTip, ksCache) {
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$http = $http;
            this.$cacheFactory = $cacheFactory;
            this.$filter = $filter;
            this.ksEntityService = ksEntityService;
            this.ksDicts = ksDicts;
            this.ksTip = ksTip;
            this.ksCache = ksCache;
            this.alerts = [];
            this.typeAhead = {};
            this.init();
        }
        CommonController.prototype.init = function () {
            this.initTypeAhead();
        };
        CommonController.prototype.initTypeAhead = function () {
            this.fillTypeAhead();
            this.loadTypeAhead();
        };
        CommonController.prototype.fillTypeAhead = function () {
            this.typeAhead = {};
        };
        CommonController.prototype.loadTypeAhead = function () {
            var self = this;
            for (var resource in this.typeAhead) {
                var factory = function (res) {
                    return function (data) {
                        self.typeAhead[res].data = data;
                    };
                };
                this.ksCache.get(resource, this.typeAhead[resource].url).then(factory(resource));
            }
        };
        CommonController.prototype.closeAlert = function (index) {
            this.alerts.splice(index, 1);
        };
        CommonController.prototype.translateDict = function (dictId, value) {
            return this.ksDicts.getItemLabel(dictId, value);
        };
        CommonController.prototype.dismiss = function () {
            this.$scope.$dismiss();
        };
        CommonController.$inject = ['$scope', '$state', '$stateParams', '$http', '$cacheFactory', '$filter', 'ksEntityService', 'ksDicts', 'ksTip', 'ksCache'];
        return CommonController;
    })();
    ks.CommonController = CommonController;
    var CommonQueryController = (function (_super) {
        __extends(CommonQueryController, _super);
        function CommonQueryController() {
            _super.apply(this, arguments);
            this.pagination = {
                start: 0,
                pageSize: 0,
                limit: 15,
                results: 0,
                pageIndex: 0
            };
            this.queryCondition = new ks.QueryCondition(); // TODO caiwenbo
        }
        CommonQueryController.prototype.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            this.$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name === ks.RouterName.Select && fromParams.isChanged) {
                    self.selectEntities(true);
                }
            });
        };
        CommonQueryController.prototype.ready = function () {
            this.selectEntities(true);
        };
        CommonQueryController.prototype.onSelectPageHandler = function (pagination) {
            this.pagination.start = pagination.start;
            this.selectEntities(false);
        };
        CommonQueryController.prototype.resetForm = function () {
            this.queryCondition = new ks.QueryCondition();
            console.info(this.queryCondition);
            this.selectEntities(true);
        };
        CommonQueryController.prototype.beforeQuery = function (entity) {
            return null;
        };
        CommonQueryController.prototype.afterQuery = function () {
        };
        CommonQueryController.prototype.selectEntities = function (resetPaging) {
            var _this = this;
            if (resetPaging) {
                this.pagination.start = 0;
            }
            var realQueryCondition = angular.copy(this.queryCondition);
            var fullQueryParam = angular.extend(realQueryCondition, {
                start: this.pagination.start,
                limit: this.pagination.limit
            });
            var error = this.beforeQuery(realQueryCondition);
            if (error != null) {
                this.ksTip.alert(error);
                return;
            }
            this.ksEntityService.selectMany(fullQueryParam, function (data) {
                _this.pagination.results = data.results;
                _this.entities = data.rows;
                _this.afterQuery();
            });
        };
        CommonQueryController.prototype.beforeDelete = function (entity) {
            return null;
        };
        CommonQueryController.prototype.deleteEntity = function (row) {
            var self = this;
            this.ksTip.confirm("确定删除该条记录?").ok(function () {
                var error = self.beforeDelete(row);
                if (error != null) {
                    self.ksTip.alert(error);
                    return false;
                }
                self.ksEntityService.delete(row.id, function (data) {
                    self.ksTip.success("删除成功");
                    self.selectEntities(true);
                }, function (data, status) {
                    self.ksTip.error("删除失败：" + data);
                });
            });
        };
        return CommonQueryController;
    })(CommonController);
    ks.CommonQueryController = CommonQueryController;
    var CommonEditController = (function (_super) {
        __extends(CommonEditController, _super);
        function CommonEditController() {
            _super.apply(this, arguments);
            this.selectSuccess = true;
        }
        CommonEditController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.initEdit();
        };
        CommonEditController.prototype.initEdit = function () {
            this.$state.current.data.isChanged = false;
            this.isUpdate = this.$stateParams != null && this.$stateParams.id != null && this.$stateParams.id > '0';
            if (this.isUpdate) {
                this.dialogTitle = '编辑';
                this.loadEntity();
            }
            else {
                this.selectSuccess = true;
                this.dialogTitle = '新增';
                this.initEntity();
            }
        };
        CommonEditController.prototype.loadEntity = function () {
            var _this = this;
            this.ksEntityService.selectOne(this.$stateParams.id, function (data) {
                _this.selectSuccess = true;
                _this.entity = data;
                _this.afterLoadEntity(_this.entity);
            }, function () {
                _this.selectSuccess = false;
            });
        };
        CommonEditController.prototype.afterLoadEntity = function (entity) {
        };
        CommonEditController.prototype.initEntity = function () {
        };
        CommonEditController.prototype.beforeSave = function (entity) {
            return null;
        };
        CommonEditController.prototype.save = function () {
            var entity = angular.copy(this.entity);
            var error = this.beforeSave(entity);
            if (error != null) {
                this.ksTip.alert(error);
                return;
            }
            this.doSave(entity);
        };
        CommonEditController.prototype.doSave = function (entity) {
            var _this = this;
            this.ksEntityService.save(entity, function (entity) {
                _this.$state.current.data.isChanged = true;
                _this.ksTip.success("保存成功");
                var me = _this;
                setTimeout(function () {
                    me.$scope.$dismiss();
                }, 200);
            }, function (entity, status) {
                printEror(entity, _this.ksTip);
            });
        };
        CommonEditController.prototype.doInsert = function (entity) {
            var _this = this;
            this.ksEntityService.insert(entity, function (entity) {
                _this.$state.current.data.isChanged = true;
                _this.ksTip.success("保存成功");
                var me = _this;
                setTimeout(function () {
                    me.$scope.$dismiss();
                }, 200);
            }, function (entity, status) {
                printEror(entity, _this.ksTip);
            });
        };
        CommonEditController.prototype.doUpdate = function (entity) {
            var _this = this;
            this.ksEntityService.update(entity, function (entity) {
                _this.$state.current.data.isChanged = true;
                _this.ksTip.success("更新成功");
                var me = _this;
                setTimeout(function () {
                    me.$scope.$dismiss();
                }, 200);
            }, function (entity, status) {
                printEror(entity, _this.ksTip);
            });
        };
        return CommonEditController;
    })(CommonController);
    ks.CommonEditController = CommonEditController;
    function printEror(entity, tip) {
        if (typeof entity === "object") {
            for (var key in entity) {
                var errorMsg = entity[key];
                tip.error(errorMsg);
            }
        }
        else {
            tip.error("保存出错");
        }
    }
})(ks || (ks = {}));
//# sourceMappingURL=ks-class.js.map