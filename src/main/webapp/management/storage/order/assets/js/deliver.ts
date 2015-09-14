/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module ordersApp {


    class DeliverController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        entity:any = {};
        id:number;
        dialogTitle:string = "发货"

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.id = $stateParams.id
            this.selectEntityById();
        }


        onBackToRoot(data) {
        }

        selectEntityById(){
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/orders/'+this.id+'.do',{})
                .success(function (data) {
                    me.entity = data
                    me.entity.actualDeliverNum = data.num;
                })
        }

        save() {
            var me = this;
            var data = angular.copy(this.entity)
            delete data.updatedAt;
            delete data.createdAt;

            this.ksEntityService.post(this.webRoot + "/pdm/orders/delivery.do", data, ()=> {
                this.ksTip.success("操作成功")
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
                    me.ksTip.error("操作出错,"+entity);
                }
            })

        }


    }


    k.getApp("orderApp").registerController("deliver", DeliverController);
}

