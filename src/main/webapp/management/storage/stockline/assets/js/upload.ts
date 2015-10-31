/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module stocklineApp {


    class UploadController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        warehouseId:number = 0
        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);

        }


        onBackToRoot(data) {
        }



        upload(){






            var me = this;
            this.ksEntityService.post(this.webRoot + "/pdm/stock_line/upload.do",{warehouseId:this.warehouseId}, ()=> {
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

    }

    k.getApp("stocklineApp").registerController("upload", UploadController);
}
