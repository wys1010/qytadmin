/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module statisticApp {


    class IndexController extends nk.BaseController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition()
        entities:Array<any>;
        dateFormat:string = 'yyyy-MM';
        cycleType = 2

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.selectEntities(true);
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

            if(this.cycleType == 3){

                if(this.queryCondition.dateBegin){
                    this.queryCondition.createdAtBegin = new Date(this.queryCondition.dateBegin).getTime()
                }

                if(this.queryCondition.dateEnd){
                    this.queryCondition.createdAtEnd = new Date(this.queryCondition.dateEnd).getTime()
                }

            }

            this.ksEntityService.get(me.webRoot + '/pdm/stock_line.do',me.queryCondition)
                .success(function (data) {
                    me.entities = data.rows
                    me.queryCondition.results = data.results
                })
        }


        switchCycleType(type){
            if(type == 1){
                this.dateFormat = 'yyyy';
            }else if(type == 2){
                this.dateFormat = 'yyyy-MM';
            }else{
                this.dateFormat = 'yyyy-MM-dd';
            }

            this.queryCondition.year = null
            this.queryCondition.month = null
            this.queryCondition.createdAtBegin = null
            this.queryCondition.createdAtEnd = null
            this.queryCondition.dateBegin = null
            this.queryCondition.dateEnd = null

        }

        exportExcel(){
            var me = this;
            var url = me.webRoot + '/pdm/stock_line/export.do?_=1';

            if(this.cycleType == 3){
                if(this.queryCondition.dateBegin){
                    this.queryCondition.createdAtBegin = new Date(this.queryCondition.dateBegin).getTime()
                }
                if(this.queryCondition.dateEnd){
                    this.queryCondition.createdAtEnd = new Date(this.queryCondition.dateEnd).getTime()
                }
            }

            var params = angular.copy(me.queryCondition);
            var queryStr = "";
            for(var p in params){
                if(!params[p]){
                    continue;
                }
                queryStr += '&' +  p + "=" + params[p];
            }
            window.open(url+queryStr)
        }

    }

    k.getApp("statisticApp").registerController("index", IndexController);
}

