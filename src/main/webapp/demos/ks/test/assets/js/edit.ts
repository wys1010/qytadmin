/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>

module MyApp{

    class EditController extends  nk.PopUpController{

        static $inject :Array<String> =  ['$scope','$state','$stateParams','ksEntityService']
        name:String;
        dlgTitle:String = "新增"
        selectedId:string;

        constructor(protected $scope,protected $state,protected $stateParams,protected ksEntityService){
            super($scope,$state,$stateParams);
            this.selectedId = $stateParams.id;
        }

        saveEntity(){
            console.log("saveEntity in edit:")
            this.pushParam("isChanged",true);
            this.pushParam("data",{age:11});
            this.dismiss();
        }
    }

    k.getApp("MyApp").registerController("edit",EditController);
}

//# sourceMappingURL=/edit.js.map

