/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts" />
/// <reference path="../../../../platform/resource/ks/ts/nk.ts"/>
/// <reference path="../../../../uc/domains/uc-domains.ts"/>
module OrganizationIndexApp {


    class SelectStaffsController extends nk.BaseController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        queryCondition:any = new nk.PagingQueryCondition();
        entities:Array<any>;
        showDetail:boolean = true;
        selectedOrgs:ks.domains.uc.Organization;
        allChecked:boolean;


        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter, protected ksTip) {
            super($scope, $state, $stateParams);
            this.resizeLayout();
            this.queryCondition.limit = 15;
        }

        resizeLayout(){
            setTimeout(function(){
                $("#infosWrap").height(window.innerHeight - 45);
            },500);

        }


        onBackToRoot(data) {
            if (data.isChanged) {
                this.selectStaffs(true);
                this.resizeLayout();
            }
        }


        selectStaffs(isToFirstPage) {
            var me = this;

            if(isToFirstPage){
                this.queryCondition.start = 0;
            }

            this.queryCondition.orgId = this.selectedOrgs.id;

            this.ksEntityService.get(this.webRoot + '/uc/orgs/queryStaffs.do', this.queryCondition)
                .success(function (data) {
                    me.queryCondition.results = data.results;
                    me.entities = data.rows;
                }).error(function () {
                    console.log("查询失败")
                })
        }


        onSelectedOrgsChange(msg) {
            var me = this;
            me.selectedOrgs = msg;
            this.selectStaffs(true);
            this.resizeLayout();
            this.$scope.$digest();
        }


        toggleCheck(){
            if(this.entities!=null){
                for (var i = 0; i < this.entities.length; i++) {
                    this.entities[i].checked = this.allChecked;
                }
            }

        }


        del(row){
            var self = this;
            var ids = row.id;
            var url:string = ks.Window.WebRoot + '/uc/user/staffs/deleteStaffInOrgs.do';
            this.ksTip.confirm('确定移除选中员工?').ok(()=>{
                self.ksEntityService.delete(url,{ids:ids}).success(()=>{
                    self.ksTip.success('移除成功');

                    var newIds:Array<string> = [ids];
                    self.refresh(newIds);

                }).error((error,errorCode)=>{
                    if(errorCode == 403){
                        self.ksTip.error('无权操作');
                    }else{
                        self.ksTip.error('移除失败');
                    }
                });
            });

        }


        batchDel(){
            var me = this;
            var ids = [];
            for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                if(entity.checked){
                    ids.push(entity.id);
                }
            }

            if(ids.length < 1){
                me.ksTip.alert("请至少选择一条记录");
                return;
            }

            me.ksTip.confirm("确定移除选中员工?")
                .ok(function(){
                    var url:string = me.webRoot + '/uc/user/staffs/deleteStaffInOrgs.do'
                    me.ksEntityService.delete(url,{ids:ids.join(",")})
                        .success(function(){
                            me.ksTip.success("移除成功");

                            me.refresh(ids);

                            me.allChecked = false;
                        })
                        .error(function(){
                            me.ksTip.error("移除失败");
                        })
                })

        }

        refresh(ids:Array<string>){
            var newStaffs:Array<ks.domains.uc.Staff> = [];
            var oldStaffs = this.entities;
            for(var key2 in oldStaffs) {
                var has:boolean = false;

                for(var key1 in ids) {
                    if(ids[key1] == (oldStaffs[key2].id + '')) {
                        has = true;
                        break;
                    }
                }

                if(has == false)
                    newStaffs.push(oldStaffs[key2]);
            }

            this.entities = newStaffs;

        }


    }

    k.getApp("OrganizationIndexApp").registerController("selectStaffs", SelectStaffsController);
}


