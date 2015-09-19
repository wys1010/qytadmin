/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module stockApp {


    class EditController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition()
        entity:any = {};
        id:number;
        dialogTitle:string
        op:string;
        isOrder:boolean = false

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.id = $stateParams.id
            this.op = $stateParams.op

            if (this.id || this.isOrder) {
                this.selectEntityById(this.id)
                this.dialogTitle = "编辑"
            } else {
                this.dialogTitle = "新增"
                this.entity.type = 1
            }
            if (this.op == 'order') {
                this.isOrder = true
                this.dialogTitle = "下单"
            }


        }


        onBackToRoot(data) {
        }

        selectEntityById(id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/stock/' + id + '.do')
                .success(function (data) {
                    me.entity = data
                    if (me.isOrder){
                        me.entity.surplusNum = data.num
                        me.entity.warehouseId = null
                    }
                })


        }

        save() {

            var data = angular.copy(this.entity)
            delete data.updatedAt;
            delete data.createdAt;

            if (!data.applyStatus) {
                data.applyStatus = 1
            }


            if (this.isOrder) {
                this.order(data);
            } else {
                if (data.id) {
                    this.update(data)
                } else {
                    this.insert(data)
                }
            }

        }

        order(data) {
            var me = this;
            data.stockId = data.id
            data.num = data.outNum
            data.status = 2
            data.id = null

            if(!data.warehouseId){
                this.ksTip.alert('请选择仓库');
                return;
            }

            me.ksEntityService.post(me.webRoot + "/pdm/orders/add.do",data, ()=> {
                this.ksTip.success("亲,下单成功,快去订单信息列表看看吧！")
                var me = this;
                setTimeout(()=> {
                    me.dismiss()
                    me.pushParam('changed',true)
                }, 200)
            }, (error)=> {
                this.ksTip.error(error)
            })
        }


        insert(data) {
            var me = this;
            this.ksEntityService.post(this.webRoot + "/pdm/stock/add.do", data, ()=> {
                this.ksTip.success("保存成功")
                var me = this;
                setTimeout(()=> {
                    me.dismiss()
                    me.pushParam('changed', true)
                }, 200)
            }, (entity)=> {
                if (typeof entity === "object") {
                    for (var key in entity) {
                        var errorMsg = entity[key]
                        me.ksTip.error(errorMsg);
                    }
                } else {
                    me.ksTip.error("保存出错");
                }
            })

        }

        update(data) {
            var me = this;
            this.ksEntityService.put(this.webRoot + "/pdm/stock/update.do", data, ()=> {
                this.ksTip.success("保存成功")
                var me = this;
                setTimeout(()=> {
                    me.dismiss()
                    me.pushParam('changed', true)
                }, 200)
            }, (entity)=> {
                if (typeof entity === "object") {
                    for (var key in entity) {
                        var errorMsg = entity[key]
                        me.ksTip.error(errorMsg);
                    }
                } else {
                    me.ksTip.error("保存出错");
                }
            })

        }


        outNumChanged() {
            if (this.entity.outNum) {
                this.entity.surplusNum = this.entity.num - this.entity.outNum
            } else {
                this.entity.surplusNum = this.entity.num
            }
        }


    }


    k.getApp("stockApp").registerController("edit", EditController);
}

