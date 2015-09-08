/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module stockApp {


    class RecordController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        entities:Array<any> = [];
        id:number;
        dialogTitle:string = "库存记录"

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.id = $stateParams.id
            console.info(this.id)
            this.selectEntityById(this.id)
        }


        onBackToRoot(data) {
        }

        selectEntityById(id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/stock_line/getStockLineByStockId/' + id + '.do')
                .success(function (data) {
                    me.entities = data
                })
        }

    }

    k.getApp("stockApp").registerController("record", RecordController);
}

