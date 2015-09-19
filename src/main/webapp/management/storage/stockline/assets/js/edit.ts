/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module stocklineApp {


    class EditController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition()
        entity:any = {};
        id:number;
        dialogTitle:string
        op:string;
        isOutStock:boolean = true
        isOrder:boolean = false

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.id = $stateParams.id
            this.op = $stateParams.op

            if (this.id || this.isOrder) {
                this.selectEntityById(this.id)
                this.dialogTitle = "编辑"
            } else {
                this.entity.type = 1
                if(this.op == '1'){
                    this.isOutStock = false
                    this.selectWarehouseByType();
                }else{
                    this.entity.usage = 1
                }
                this.dialogTitle = "新增" + (this.isOutStock ? '出库':'入库')
            }


        }


        onBackToRoot(data) {
        }

        selectWarehouseByType(){
            this.queryCondition.type = 1
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/warehouses.do',this.queryCondition)
                .success(function (data) {
                    me.entity.warehouseId = data.rows[0].id
                })
        }

        selectEntityById(id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/stock_line/' + id + '.do')
                .success(function (data) {
                    me.entity = data
                })


        }

        warehouseSelected(warehouse){
            if(this.isOutStock && warehouse){
                if(warehouse.type == 1){
                    this.ksTip.alert('不能选择总仓库');
                    this.$scope.editForm.$invalid = true
                }else{
                    this.$scope.editForm.$invalid = false
                }
            }
        }


        save() {

            var data = angular.copy(this.entity)
            delete data.updatedAt;
            delete data.createdAt;

            if(!data.productId){
                this.ksTip.alert("请选择产品");
                return;
            }

            if(!data.warehouseId){
                this.ksTip.alert("请选择仓库");
                return;
            }


            if(data.num <= 0 ){
                this.ksTip.alert("数量必须大于0");
                return;
            }

            this.insert(data)

        }

        insert(data){
            var me = this;
            this.ksEntityService.post(this.webRoot + "/pdm/stock_line/add.do",data, ()=> {
                this.ksTip.success("保存成功")
                var me = this;
                setTimeout(()=> {
                    me.dismiss()
                    me.pushParam('changed',true)
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

        update(data){
            var me = this;
            this.ksEntityService.put(this.webRoot + "/pdm/stock_line/update.do",data, ()=> {
                this.ksTip.success("保存成功")
                var me = this;
                setTimeout(()=> {
                    me.dismiss()
                    me.pushParam('changed',true)
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


        outNumChanged(){
            if(this.entity.outNum){
                this.entity.surplusNum = this.entity.stockNum - this.entity.outNum
            }else{
                this.entity.surplusNum = this.entity.stockNum
            }
        }



    }

    k.getApp("stocklineApp").registerController("edit", EditController);
}

