
/// <reference path="../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

module CacheManageIndexApp {
    'use strict'

    class CacheEntity {
        code: string
        size: number
        updatedAt: Date
    }

    class QueryController extends ks.CommonQueryController<ks.QueryCondition, CacheEntity> {

        refresh(entity: CacheEntity) {
            var self = this

            this.ksTip.confirm('确认刷新缓存吗?').ok(function(){
                var data = {
                    code: entity.code
                }

                self.ksEntityService.post(ks.Window.WebRoot+'/cache/manage/refresh.do', data, function (data) {
                    self.ksTip.success("刷新缓存成功")

                    self.selectEntities(true)
                }, function (data, status, headers, config) {
                    self.ksTip.error("刷新缓存失败" + data)
                });
            });
        }
    }

    var states = [
        {
            name: ks.RouterName.Select,
            url: '/',
            templateUrl: ks.Window.WebRoot + '/cache/manage/tpl_cache_manage_select.html',
            controller: 'QueryController'
        }
    ]

    var app = angular.module('cacheManageIndexApp', ['ks.all'])
        .controller("QueryController", QueryController)
        .config(["ksEntityServiceProvider", p => {
            p.config({url: ks.Window.WebRoot + '/cache/manage/:id.do'})
        }])
        .config(["ksDictsProvider", p => p.config()])
        .config(ks.RouterConfig.factory(states))
}