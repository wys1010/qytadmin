/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts" />
/// <reference path="../../../../platform/resource/ks/ts/nk.ts"/>
/// <reference path="../../../../uc/domains/uc-domains.ts"/>
module OrganizationIndexApp {


    class EditOrgsController extends nk.PopUpController {

        static $inject:Array<String> = ['$scope', '$state', '$stateParams', 'ksEntityService', '$filter', 'ksTip']
        baseUrl:string = this.webRoot + '/uc/orgs';
        currentOrganization:ks.domains.uc.Organization;
        isAdd:boolean;

        constructor(protected $scope, protected $state, protected $stateParams, protected ksEntityService, protected $filter,
                    protected ksTip) {
            super($scope, $state, $stateParams);
            this.isAdd = $stateParams.id ? false : true;
            this.selectOrgsById($stateParams.id);
        }

        onBackToRoot(data) {
        }


        selectOrgsById(id) {

            if (this.isAdd) {
                this.currentOrganization = new ks.domains.uc.Organization();
                this.currentOrganization.code = "";
                this.currentOrganization.disable = false;
            } else {
                this.currentOrganization = this.getAppCache("currentOrgs");
                this.currentOrganization.createdAt = null;
                this.currentOrganization.updatedAt = null;
            }

        }


        onSave() {
            var optype = this.isAdd ? "/add.do" : "/update.do";
            var url = this.baseUrl + optype;
            var me = this;
            this.ksEntityService.post(url, this.currentOrganization).success((data)=> {
                me.ksTip.success('操作成功');
                me.$state.current.data.isChanged = true;
                me.dismiss();
            }).error(()=> {
                me.ksTip.error('系统内部错误');
            });
        }


    }

    k.getApp("OrganizationIndexApp").registerController("editOrgs", EditOrgsController);
}


