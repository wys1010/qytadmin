var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
var stocklineApp;
(function (stocklineApp) {
    var UploadController = (function (_super) {
        __extends(UploadController, _super);
        function UploadController($scope, $state, $stateParams, ksEntityService, $filter, ksTip) {
            _super.call(this, $scope, $state, $stateParams);
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ksEntityService = ksEntityService;
            this.$filter = $filter;
            this.ksTip = ksTip;
            this.warehouseId = 0;
        }
        UploadController.prototype.onBackToRoot = function (data) {
        };
        UploadController.prototype.upload = function () {
            if (!this.warehouseId) {
                this.ksTip.alert("请选择仓库");
                return;
            }
            var url = this.webRoot + "/pdm/stock_line/upload.do";
            $("#updateForm").ajaxSubmit({
                type: 'post',
                url: url,
                data: { warehouseId: this.warehouseId },
                success: function (data) {
                    console.log(data);
                    if (data && data.length > 0) {
                        var msg = "<span style='font-style:italic'>以下产品不存在,请重新导入</span><br>";
                        for (var i in data) {
                            msg += "<span style='font-weight:bold'>" + data[i] + "</span><br>";
                        }
                        window.layer.alert(msg, { icon: 0 });
                    }
                    else {
                        window.layer.alert("批量上传成功", { icon: 0 });
                    }
                }
            });
            //var me = this;
            //this.ksEntityService.post(this.webRoot + "/pdm/stock_line/upload.do",{warehouseId:this.warehouseId}, ()=> {
            //    this.ksTip.success("保存成功")
            //    var me = this;
            //    setTimeout(()=> {
            //        me.dismiss()
            //        me.pushParam('changed',true)
            //    }, 200)
            //}, (entity)=> {
            //    if (typeof entity === "object") {
            //        for (var key in entity) {
            //            var errorMsg = entity[key]
            //            me.ksTip.error(errorMsg);
            //        }
            //    } else {
            //        me.ksTip.error("保存出错");
            //    }
            //})
        };
        UploadController.$inject = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip'];
        return UploadController;
    })(nk.PopUpController);
    k.getApp("stocklineApp").registerController("upload", UploadController);
})(stocklineApp || (stocklineApp = {}));
//# sourceMappingURL=upload.js.map