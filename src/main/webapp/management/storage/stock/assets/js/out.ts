/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module stockApp {


    class OutController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition()
        entity:any = {};
        id:number;
        dialogTitle:string = "出库"
        op:string;
        isOrder:boolean = false
        invalid:boolean

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.id = $stateParams.id
            if (this.id) {
                this.selectEntityById(this.id)
            }
        }


        onBackToRoot(data) {
        }

        selectEntityById(id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/stock/' + id + '.do')
                .success(function (data) {
                    me.entity = data
                    me.entity.surplusNum = data.num
                    me.entity.warehouseId = null
                })

        }

        warehouseSelected(warehouse){
            if(warehouse){
                if(warehouse.type == 1){
                    this.ksTip.alert('不能选择总仓库');
                    this.invalid = false
                }else{
                    this.invalid = true
                }
            }
        }

        save() {
            var me = this;
            var data = angular.copy(this.entity)
            delete data.updatedAt;
            delete data.createdAt;


            me.ksEntityService.post(me.webRoot + "/pdm/stock/add.do",data, ()=> {
                this.ksTip.success("保存成功")
                var me = this;
                setTimeout(()=> {
                    me.dismiss()
                    me.pushParam('changed',true)
                }, 200)
            }, (error)=> {
                this.ksTip.error(error)
            })



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
                this.ksTip.success("保存成功")
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


    k.getApp("stockApp").registerController("out", OutController);
}

