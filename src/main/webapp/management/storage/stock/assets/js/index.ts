/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module stockApp {


    class StockRole {
        hasOrderRole:boolean
        constructor() {
            this.hasOrderRole = ks.Role.hasRole('ROLE_UC_STOCK_ORDER')
        }
    }

    class IndexController extends nk.BaseController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition()
        entities:Array<any>;
        role:any
        stockMin:number = window.stockMin

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.selectEntities(true);
            this.role = new StockRole();
            this.selectAllEntities()
        }

        onBackToRoot(data) {
            if (data.changed) {
                this.selectEntities(true);
            }
        }

        selectAllEntities(){
            var me = this;
            var warnStr = "<span style='font-style:italic'>以下库存数量不足,请及时入库:</span><br>"
            this.ksEntityService.get(me.webRoot + '/pdm/stock/selectAllEntities.do',null)
                .success(function (data) {
                    if(data && data.length > 0){
                        var show = false;
                        for (var i = 0; i < data.length; i++) {
                            var entity = data[i];
                            if(entity.num < entity.minNumber){
                                show = true;
                                warnStr += "<span style='font-weight:bold'>" + entity.productName + " - " + entity.warehouseName + "</span><br>"
                            }
                        }
                        if(show){
                            window.layer.alert(warnStr, {icon: 0});
                        }
                    }
                })
        }

        resetForm() {
            this.queryCondition = new nk.PagingQueryCondition();
            this.selectEntities(true)
        }

        selectEntities(isToFirstPage) {
            var me = this;
            if(isToFirstPage)me.queryCondition.start = 0;

            this.ksEntityService.get(me.webRoot + '/pdm/stock.do',me.queryCondition)
                .success(function (data) {
                    me.entities = data.rows
                    me.queryCondition.results = data.results
                })


        }


        edit(id){
            this.go('root.edit',{id:id})
        }

        order(row){
            this.go('root.edit',{id:row.id,op:'order'})
        }

        record(row){
            this.go('root.record',{id:row.id})
        }


        deleteEntity(row){
            var me = this;
            this.ksTip.confirm("确定要删除?").ok(()=> {

                var url = me.webRoot + '/pdm/stock/delete/'+row.id+'.do';
                me.ksEntityService.delete(url,{})
                    .success(function (data) {
                        me.ksTip.success('操作成功')
                        me.selectEntities(true);
                    }).error(()=>{
                        me.ksTip.error('操作失败')
                    })
            })


        }


    }

    k.getApp("stockApp").registerController("index", IndexController);
}

