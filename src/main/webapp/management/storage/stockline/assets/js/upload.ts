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

            if(!this.warehouseId){
                this.ksTip.alert("请选择仓库");
                return;
            }

            var url = this.webRoot + "/pdm/stock_line/upload.do"
            $("#updateForm").ajaxSubmit({
                type: 'post',
                url: url,
                data:{warehouseId:this.warehouseId},
                success: function(data) {
                    if(data && data.length > 0){
                        var msg = "<span style='font-style:italic'>以下产品不存在,请重新上传</span><br>"
                        for (var i in data) {
                            msg += "<span style='font-weight:bold'>" + data[i] + "</span><br>"
                        }
                        window.layer.alert(msg, {icon: 0});
                    }else{
                        window.layer.alert("批量上传成功", {icon: 0});
                    }
                }
            });

        }


        downloadTpl(){
            window.open(this.webRoot + "/management/storage/stockline/tpl/templa.xlsx")
        }

    }

    k.getApp("stocklineApp").registerController("upload", UploadController);
}

