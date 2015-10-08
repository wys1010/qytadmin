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
        warehouseId:number

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.id = $stateParams.id
            this.warehouseId = $stateParams.warehouseId
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
                    me.entity.warehouseId = me.warehouseId
                    me.entity.usage = 1
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

            data.type = 2
            data.num = data.outNum

            me.ksEntityService.post(me.webRoot + "/pdm/stock_line/add.do",data, ()=> {
                this.ksTip.success("操作成功")
                setTimeout(()=> {
                    me.dismiss()
                    me.pushParam('changed',true)
                }, 200)
            }, (error)=> {
                if (typeof error === "object") {
                    for (var key in error) {
                        var errorMsg = error[key]
                        me.ksTip.error(errorMsg);
                    }
                } else {
                    me.ksTip.error("系统出错");
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

