/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>

module MyApp{

    class SelectStaffController extends  nk.BaseController{

        static $inject :Array<String> =  ['$scope','$state','$stateParams','ksEntityService','$filter']
        selectedRole:any;

        constructor(protected $scope,protected $state,protected $stateParams,protected ksEntityService,protected $filter){
            super($scope,$state,$stateParams);
            console.log("select staff---")
        }

        onSelectedRoleChange(roleSelected){
            console.log("onSelectedRoleChange in selectStaff")
            this.selectedRole = roleSelected;
        }

        testCache(){
            console.log(this.getAppCache("roles"));
        }


    }

    k.getApp("MyApp").registerController("selectStaff",SelectStaffController);
}


