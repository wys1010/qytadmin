/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module orderApp {


    class OrderRole {
        hasCancelOrderRole:boolean
        hasDeliveryRole:boolean
        hasConfirmRole:boolean
        constructor() {
            this.hasDeliveryRole = ks.Role.hasRole('ROLE_UC_ORDER_DELIVERY')
            this.hasConfirmRole = ks.Role.hasRole('ROLE_UC_ORDER_CONFIRM_RECEIPT')
            this.hasCancelOrderRole = ks.Role.hasRole('ROLE_UC_ORDER_CANCEL')
        }
    }

    class IndexController extends nk.BaseController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition()
        entities:Array<any>;
        role:any

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.selectEntities(true);
            this.role = new OrderRole();
        }

        onBackToRoot(data) {
            if (data.changed) {
                this.selectEntities(true);
            }
        }

        resetForm() {
            this.queryCondition = new nk.PagingQueryCondition();
            this.selectEntities(true)
        }

        selectEntities(isToFirstPage) {
            var me = this;

            if(isToFirstPage)me.queryCondition.start = 0;

            this.ksEntityService.get(me.webRoot + '/pdm/orders.do',me.queryCondition)
                .success(function (data) {
                    me.entities = data.rows
                    me.queryCondition.results = data.results
                })
        }


        edit(row){
            this.go('root.edit',{id:row.id,op:''})
        }

        order(row){
            this.go('root.edit',{id:row.id,op:'order'})
        }

        cancel(row){
            var me = this;
            this.ksTip.confirm("确定要取消订单?").ok(()=> {
                var url = me.webRoot + '/pdm/orders/cancel/'+row.id+'.do';
                me.ksEntityService.get(url,{})
                    .success(function (data) {
                        me.ksTip.success('操作成功')
                        me.selectEntities(true);
                    }).error((error)=>{
                        if (typeof error === "object") {
                            for (var key in error) {
                                var errorMsg = error[key]
                                me.ksTip.error(errorMsg);
                            }
                        } else {
                            me.ksTip.error("服务器出错,"+error);
                        }
                    })
            })
        }

        deleteEntity(row){
            var me = this;
            this.ksTip.confirm("确定要删除?").ok(()=> {
                var url = me.webRoot + '/pdm/orders/delete/'+row.id+'.do';
                me.ksEntityService.delete(url,{})
                    .success(function (data) {
                        me.ksTip.success('操作成功')
                        me.selectEntities(true);
                    }).error(()=>{
                        me.ksTip.error('操作失败')
                    })
            })
        }

        deliver(row,type){
            var me = this;
            if(type == 3){
                this.go('root.deliver',{id:row.id})
            }else{
                this.ksEntityService.get(me.webRoot + '/pdm/orders/confirmReceipt/'+row.id+'.do')
                    .success(function (data) {
                        me.ksTip.success('操作成功')
                        me.selectEntities(true);
                    }).error((entity)=>{
                        if (typeof entity === "object") {
                            for (var key in entity) {
                                var errorMsg = entity[key]
                                me.ksTip.error(errorMsg);
                            }
                        } else {
                            me.ksTip.error("服务器出错,"+entity);
                        }
                    })
            }

        }


    }

    k.getApp("orderApp").registerController("index", IndexController);
}

