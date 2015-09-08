/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>

module MyApp{

    class SelectController extends  nk.BaseController{

        static $inject :Array<String> =  ['$scope','$state','$stateParams','ksEntityService','$filter']
        name:String;
        queryCondition:any = {limit:20,start:0,results:0};
        entities:Array<any>;

        constructor(protected $scope,protected $state,protected $stateParams,protected ksEntityService,protected $filter){
            super($scope,$state,$stateParams);
            this.selectEntities(true);
        }

        onBackToRoot(data){
            console.log("backToRoot--->:" , data);
        }

        selectEntities(resetPaging:boolean){
            var me = this;
            if (resetPaging) {
                this.queryCondition.start = 0;
            }
            var realQueryCondition = angular.copy(this.queryCondition);

            realQueryCondition.publishDateStart = this.$filter('date')(realQueryCondition.publishDateStart, "yyyy-MM-dd hh:mm:ss");
            realQueryCondition.publishDateEnd = this.$filter('date')(realQueryCondition.publishDateEnd, "yyyy-MM-dd hh:mm:ss")

            this.ksEntityService.get(me.webRoot + "/pdm/supplier_price.do",realQueryCondition)
                .success(function(data){
                        // 重新设置 results
                        me.queryCondition.results = data.results;
                        me.entities = data.rows;
                    });
        }


    }

    k.getApp("MyApp").registerController("select",SelectController);
}


