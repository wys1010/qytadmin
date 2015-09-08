/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts" />
/// <reference path="../../../../platform/resource/ks/ts/nk.ts"/>
/// <reference path="../../../../uc/domains/uc-domains.ts"/>
module OrganizationIndexApp {


    class AddStaffsController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        queryCondition:any = new nk.PagingQueryCondition();
        entities:Array<any>;
        allChecked:boolean;


        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.selectEntities(true);
        }

        onBackToRoot(data) {
            if (data.isChanged) {
                this.selectEntities(true);
            }
        }


        selectEntities(isToFirstPage) {
            var me = this;
            this.allChecked = false;
            if(isToFirstPage){
                this.queryCondition.start = 0;
            }

            var qc = angular.copy(this.queryCondition);

            this.ksEntityService.get(this.webRoot + '/uc/orgs/queryStaffs.do', qc)
                .success(function (data) {
                    me.queryCondition.results = data.results;
                    me.entities = data.rows;
                }).error(function () {
                    console.log("查询失败")
                })
        }


        resetForm(){
            this.queryCondition.start = 0;
            this.queryCondition.orgId = null;
            this.queryCondition.name = null;
            this.queryCondition.hasOrgs = "";
        }


        /**
         * 全选/去选
         * @param e
         */
        toggleCheck(e) {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].checked = this.allChecked;
            }
        }

        onSave(){
            var checkedStaffs:Array<string> = [];
            for (var i = 0; i < this.entities.length; i++) {
                if(this.entities[i].checked){
                    var entity:any = {}
                    entity.id = this.entities[i].id;
                    entity.orgId = this.getAppCache("currentOrgs").id;
                    entity.roleIds = this.entities[i].roleIds;
                    checkedStaffs.push(entity);
                }
            }
            if(checkedStaffs.length == 0){
                this.ksTip.alert('请选择员工');
                return;
            }
            this.batchUpdate(checkedStaffs);
        }

        private batchUpdate(checkedStaffs:Array<string>){
            var me = this;
            var json:string = JSON.stringify(checkedStaffs);
            var url:string = this.webRoot+'/uc/user/staffs/batch_update.do';
            this.ksEntityService.post(url,{staffJson:json}).success(()=>{
                me.ksTip.success('操作成功');

                me.$state.current.data.isChanged = true;

                me.dismiss();
            }).error(()=>{
                this.ksTip.error('系统内部错误');
            });
        }
        

    }

    k.getApp("OrganizationIndexApp").registerController("addStaffs", AddStaffsController);
}


