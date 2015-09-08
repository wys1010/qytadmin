/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>
/// <reference path="ks-type.ts"/>

module ks {

    export class TypeAheadItem {
        url: string
        data: any[]
    }


    export class CommonController {

        alerts: Array<string> = []

        typeAhead: { [s: string]: TypeAheadItem } = {}

        static $inject = ['$scope', '$state', '$stateParams', '$http', '$cacheFactory', '$filter', 'ksEntityService', 'ksDicts', 'ksTip', 'ksCache'];

        constructor(protected $scope, protected $state, protected $stateParams, protected $http, protected $cacheFactory, protected $filter, protected ksEntityService, protected ksDicts, protected ksTip, protected ksCache) {
            this.init()
        }

        init() {
            this.initTypeAhead()
        }

        initTypeAhead() {
            this.fillTypeAhead()

            this.loadTypeAhead()
        }

        fillTypeAhead() {
            this.typeAhead = {}
        }

        loadTypeAhead() {
            var self = this
            for (var resource in this.typeAhead) {
                var factory = res => {
                    return data => {
                        self.typeAhead[res].data = data;
                    }
                }

                this.ksCache.get(resource, this.typeAhead[resource].url).then(factory(resource));
            }
        }

        closeAlert(index: number): void {
            this.alerts.splice(index, 1)
        }

        translateDict(dictId: string, value: string): string {
            return this.ksDicts.getItemLabel(dictId, value)
        }

        dismiss() {
            this.$scope.$dismiss()
        }
    }

    export class CommonQueryController<QueryCondition extends ks.QueryCondition, T> extends CommonController {

        pagination : ks.Pagination = {
            start: 0,
            pageSize: 0,
            limit: 15,
            results: 0,
            pageIndex: 0
        }

        queryCondition: QueryCondition = <QueryCondition> new ks.QueryCondition() // TODO caiwenbo

        entities: T[]

        init() {
            super.init()

            var self = this
            this.$scope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if (toState.name === ks.RouterName.Select && fromParams.isChanged) {
                        self.selectEntities(true)
                    }
                })
        }

        ready() {
            this.selectEntities(true)
        }

        onSelectPageHandler(pagination: Pagination) {
            this.pagination.start = pagination.start;
            this.selectEntities(false)
        }

        resetForm() {
            this.queryCondition = <QueryCondition> new ks.QueryCondition()
            console.info(this.queryCondition)

            this.selectEntities(true)
        }

        beforeQuery(entity: T) : string {
            return null
        }

        afterQuery() : void {
        }

        selectEntities(resetPaging: boolean) {

            if (resetPaging) {
                this.pagination.start = 0
            }

            var realQueryCondition : any = angular.copy(this.queryCondition);

            var fullQueryParam = angular.extend(realQueryCondition, {
                start: this.pagination.start,
                limit: this.pagination.limit
            })

            var error = this.beforeQuery(realQueryCondition)
            if (error != null) {
                this.ksTip.alert(error)

                return
            }

            this.ksEntityService.selectMany(fullQueryParam, (data)=> {
                this.pagination.results = data.results

                this.entities = data.rows

                this.afterQuery()
            })
        }

        beforeDelete(entity: T): string {
            return null
        }

        deleteEntity(row) {
            var self = this;
            this.ksTip.confirm("确定删除该条记录?").ok(function(){

                var error = self.beforeDelete(row)
                if (error != null) {
                    self.ksTip.alert(error)

                    return false;
                }

                self.ksEntityService.delete(row.id, (data)=> {
                    self.ksTip.success("删除成功");
                    self.selectEntities(true)
                }, (data,status)=> {
                    self.ksTip.error("删除失败：" + data)
                })
            });
        }
    }

    export class CommonEditController<T> extends CommonController {

        entity: T

        dialogTitle: string

        selectSuccess: boolean = true

        isUpdate: boolean

        init() {

            super.init()

            this.initEdit()
        }

        initEdit() {
            this.$state.current.data.isChanged = false

            this.isUpdate = this.$stateParams != null && this.$stateParams.id != null && this.$stateParams.id > '0'

            if (this.isUpdate) {
                this.dialogTitle = '编辑'

                this.loadEntity()
            } else {
                this.selectSuccess = true

                this.dialogTitle = '新增'

                this.initEntity()
            }
        }

        loadEntity() {
            this.ksEntityService.selectOne(this.$stateParams.id , (data)=> {
                this.selectSuccess = true

                this.entity = data

                this.afterLoadEntity(this.entity)
            }, () => {
                this.selectSuccess = false
            });
        }

        afterLoadEntity(entity: T) {

        }

        initEntity() {

        }

        beforeSave(entity: T): string {
            return null
        }

        save() {
            var entity = angular.copy(this.entity)

            var error = this.beforeSave(entity)
            if (error != null) {
                this.ksTip.alert(error)

                return
            }

            this.doSave(entity)
        }

        doSave(entity: T) {
            this.ksEntityService.save(entity, (entity)=> {
                this.$state.current.data.isChanged = true
                this.ksTip.success("保存成功")
                var me = this;
                setTimeout(()=>{
                    me.$scope.$dismiss()
                }, 200)
            }, (entity, status)=> {
                printEror(entity,this.ksTip)
            })
        }

        doInsert(entity: T) {
            this.ksEntityService.insert(entity, (entity)=> {
                this.$state.current.data.isChanged = true
                this.ksTip.success("保存成功")
                var me = this;
                setTimeout(()=>{
                    me.$scope.$dismiss()
                }, 200)
            }, (entity, status)=> {
                printEror(entity,this.ksTip)
            })
        }

        doUpdate(entity: T) {
            this.ksEntityService.update(entity, (entity)=> {
                this.$state.current.data.isChanged = true
                this.ksTip.success("更新成功")
                var me = this;
                setTimeout(()=>{
                    me.$scope.$dismiss()
                }, 200)
            }, (entity, status)=> {
                printEror(entity,this.ksTip)
            })
        }
    }


    function printEror(entity:any,tip){
        if(typeof entity === "object"){
            for (var key in entity) {
                var errorMsg = entity[key]
                tip.error(errorMsg);
            }
        }else{
            tip.error("保存出错");
        }
    }
}
