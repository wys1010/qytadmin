/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module productApp {


    class EditController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition()
        entity:any = {};
        id:number;
        dialogTitle:string
        isUpdate:boolean = false

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.id = $stateParams.id

            if (this.id) {
                this.selectEntityById(this.id)
                this.dialogTitle = "编辑"
                this.isUpdate = true
            } else {
                this.dialogTitle = "新增"
                this.entity.type = 1
            }
        }


        onBackToRoot(data) {
        }

        selectEntityById(id) {
            var me = this;
            this.ksEntityService.get(this.webRoot + '/pdm/products/' + id + '.do')
                .success(function (data) {
                    me.entity = data
                })
        }

        save() {

            var data = angular.copy(this.entity)
            delete data.updatedAt;
            delete data.createdAt;

            if (!data.applyStatus) {
                data.applyStatus = 1
            }


            if(data.id){
                this.update(data)
            }else{
                this.insert(data)
            }

        }


        insert(data){
            var me = this;
            this.ksEntityService.post(this.webRoot + "/pdm/products/add.do",data, ()=> {
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
                    me.ksTip.error("保存出错,"+entity);
                }
            })

        }

        update(data){
            var me = this;
            this.ksEntityService.put(this.webRoot + "/pdm/products/update.do",data, ()=> {
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
                    me.ksTip.error("保存出错,"+entity);
                }
            })

        }



    }




    k.getApp("productApp").registerController("edit", EditController);
}

