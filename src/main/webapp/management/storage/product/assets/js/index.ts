/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/nk.ts"/>
module productApp {


    class ProductRole {
        hasDeleteRole:boolean
        hasEditRole:boolean
        constructor() {
            this.hasDeleteRole = ks.Role.hasRole('ROLE_UC_PRODUCT_DELETE')
            this.hasEditRole = ks.Role.hasRole('ROLE_UC_PRODUCT_EDIT')
        }
    }

    class IndexController extends nk.BaseController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        name:String;
        queryCondition:any = new nk.PagingQueryCondition()
        entities:Array<any>;
        role:any

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.selectEntities(true);
            this.role = new ProductRole();
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

            this.ksEntityService.get(me.webRoot + '/pdm/products.do',me.queryCondition)
                .success(function (data) {
                    me.entities = data.rows
                    me.queryCondition.results = data.results
                })
        }


        edit(id){
            this.go('root.edit',{id:id})
        }

        order(row){
            this.go('root.edit',{id:row.id,op:'order'})
        }


        deleteEntity(row){
            var me = this;
            this.ksTip.confirm("确定要删除?").ok(()=> {

                var url = me.webRoot + '/pdm/products/delete/'+row.id+'.do';
                me.ksEntityService.delete(url,{})
                    .success(function (data) {
                        me.ksTip.success('操作成功')
                        me.selectEntities(true);
                    }).error(()=>{
                        me.ksTip.error('操作失败')
                    })
            })


        }


    }

    k.getApp("productApp").registerController("index", IndexController);
}

