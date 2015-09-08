/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>

module MyApp{

    class SelectRoleController extends  nk.BaseController{

        static $inject :Array<String> =  ['$scope','$state','$stateParams','ksEntityService','$filter','ksTip']
        entities:Array<any>;

        constructor(protected $scope,protected $state,protected $stateParams,protected ksEntityService,protected $filter,protected ksTip){
            super($scope,$state,$stateParams);
            this.selectEntities(true);
        }

        onBackToRoot(data){

        }

        selectRow(row:any){
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.selected = false;
            }
            row.selected = true;
            this.emit("selectedRoleChange", row);
        }

        selectEntities(resetPaging:boolean){
            var me = this;
            this.ksEntityService.get(me.webRoot + '/uc/privileges/roles.do',{},function(roles){
                me.entities = roles;
                if(me.entities && me.entities.length > 0){
                    me.entities[0].selected = true;
                    me.$scope.$emit("selectedRoleChange", me.entities[0]);
                }
                me.putAppCache("roles",angular.copy(roles))
            },function(){
                me.ksTip.error("查询出错");
            });
        }

        onSelectedChange(){

        }

    }

    k.getApp("MyApp").registerController("selectRole",SelectRoleController);
}


