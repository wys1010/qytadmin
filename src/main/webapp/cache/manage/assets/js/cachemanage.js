/// <reference path="../../../../platform/resource/ks/ts/ks-ts-all.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CacheManageIndexApp;
(function (CacheManageIndexApp) {
    'use strict';
    var CacheEntity = (function () {
        function CacheEntity() {
        }
        return CacheEntity;
    })();
    var QueryController = (function (_super) {
        __extends(QueryController, _super);
        function QueryController() {
            _super.apply(this, arguments);
        }
        QueryController.prototype.refresh = function (entity) {
            var self = this;
            this.ksTip.confirm('确认刷新缓存吗?').ok(function () {
                var data = {
                    code: entity.code
                };
                self.ksEntityService.post(ks.Window.WebRoot + '/cache/manage/refresh.do', data, function (data) {
                    self.ksTip.success("刷新缓存成功");
                    self.selectEntities(true);
                }, function (data, status, headers, config) {
                    self.ksTip.error("刷新缓存失败" + data);
                });
            });
        };
        return QueryController;
    })(ks.CommonQueryController);
    var states = [
        {
            name: ks.RouterName.Select,
            url: '/',
            templateUrl: ks.Window.WebRoot + '/cache/manage/tpl_cache_manage_select.html',
            controller: 'QueryController'
        }
    ];
    var app = angular.module('cacheManageIndexApp', ['ks.all']).controller("QueryController", QueryController).config(["ksEntityServiceProvider", function (p) {
        p.config({ url: ks.Window.WebRoot + '/cache/manage/:id.do' });
    }]).config(["ksDictsProvider", function (p) { return p.config(); }]).config(ks.RouterConfig.factory(states));
})(CacheManageIndexApp || (CacheManageIndexApp = {}));
//# sourceMappingURL=cachemanage.js.map