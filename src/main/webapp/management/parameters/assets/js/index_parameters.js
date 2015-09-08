/**
 * 
 * @version 1.0
 * @description  {js描述}
 * @author zheng.sk
 * @Time 2014年10月6日 下午5:30:35
 */



(function (global) {

    var ParametersIndexModule = uc.Module.extend({

        /**
         * 创建组件
         */
        createCmps: function () {
            var self = this;
            self.createGrid();
            
            self.qStatusRadio = new uc.Radios({
                id: "qStatusWrap",
                values: [-1, 0, 1],
                labels: ["全部", "启用", "禁用"]
            });

        },

        /**
         * 调整高度
         */
        resizeWks: function () {
            // 调整主表宽高
            this.grid.set("width", uc.getWinWidth());
            this.grid.set("height", uc.getWinHeight() - uc.getElementsHeight(["queryParameters"  , "gridHeader"]) - 25);
            this.grid.set(".bui-grid-body", uc.getWinHeight() - uc.getElementsHeight(["queryParameters"  , "gridHeader"]) - 55);
        },

        /**
         * 创建表格
         */
        createGrid: function () {
            var self = this;
            // 主表初始化
            var Grid = BUI.Grid,
                Store = BUI.Data.Store,
                cols = [
                    { title: 'ID', width: 100, sortable: false, dataIndex: 'id', visible: false},
                    { title: '名称', width: 70, sortable: true, dataIndex: 'name', visible: true},
                    { title: '值', width: 70, sortable: true, dataIndex: 'value', visible: true},
                    { title: '备注', width: 100, sortable: true, dataIndex: 'remark', visible: true},
                    { title: '状态', width: 70, sortable: true, dataIndex: 'status', visible: true,renderer: uc.bui.grid.createStatusRenderer()}
                ];

            // 有编辑权限才加上编辑列
            if(uc.biz.hasRole("ROLE_UC_PARAMETERS_UPDATE")){
                cols.push({title: '操作', width: 100, fixed: true, sortable: false, dataIndex: '_operation', renderer: uc.bui.grid.createOperationRenderer({isEnable: true, isDeleteOnlyForEnable: false, isDeleteable:true })})
            }

            self.store = new Store({
                url: self.baseRestUrl + ".do",
                remoteSort: true,
                pageSize: 20
            });

            self.grid = new Grid.Grid({
                idField: "id",
                id: "parametersGrid",
                render: '#parametersGrid',
                loadMask: true,
                forceFit: true,
                itemStatusFields: {selected: 'selected'},
                columns: cols,
                height: self.getGridHeight(),
                store: self.store,
                bbar: {
                    pagingBar: true
                },
                emptyDataTpl: uc.final.EMPTY_DATA_TIP

            });
            self.grid.render();

        },

        /**
         * 查询
         */
        selectEntities: function () {
            var self = this;
            var store = this.grid.getAttrVals().store;
            store.get('proxy').set('url', self.baseRestUrl + ".do");

            var param = {};
            param.name = self.$("#q_name").val();
            param.status = self.qStatusRadio.getValue();
            
            //重置导航栏
            param.start = 0;
            param.pageIndex = 0;
            
            store.load(param, function (event) {
                if (event.exception) {
                    return;
                }

            });
        },

        /**
         * 重置表单
         */
        resetForm: function () {
            var self=this;
            self.$("#q_name").val("");
            self.qStatusRadio.setValue(-1);
            self.selectEntities();

        },

        /**
         * 获取编辑模块
         */
        getEditModule: function () {
            return uc.Module.getModuleByName("org.uc.parameters.edit");
        },

        /**
         * 操作列点击
         */
        gridCellClickHandler: function (event) {
            var self = this;
            // 操作列点击，进入相应的操作
            if (event.field == "_operation") {
                var operationType = uc.bui.grid.getOperation(event);
                if (operationType) {
                    switch (operationType) {
                    case uc.bui.grid.OperationEnum.EDIT:
                        self.getEditModule().editEntity(event.record.id);
                        break;
                    case uc.bui.grid.OperationEnum.DELETE:
                        self.deleteEntity(event.record.id)
                        break;
                    case uc.bui.grid.OperationEnum.ENABLE:
                        self.enableEntity(event.record.id)
                        break;
                    case uc.bui.grid.OperationEnum.DISABLE:
                        self.disableEntity(event.record.id)
                        break;
                    default :
                        return;
                    }
                }
            }
        },

        /**
         * 计算表格高度
         */
        getGridHeight: function () {
            return uc.getWinHeight() - uc.getElementsHeight(["queryParameters"  , "gridHeader"]) - 23
        },

        /**
         * 绑定事件
         */
        bindEvents: function () {
            var self = this;

            // 自适应
            $(window).resize(function () {
                self.resizeWks();
            });


            // 查询
            $("#btnSearch").click(function () {
                self.selectEntities();
                return false;
            });

            // 充值查询区
            $("#btnReset").click(function () {
                self.resetForm();
                return false;
            });



            // 表格数据加载事件
            self.store.on("load", function (data) {
                console.log("load:", data);
                var rows = data.rows;
                var rowDataFirst = self.store.findByIndex(0)

            });


            // 异常
            self.grid.getAttrVals().store.on("exception", function (event) {
                uc.buiAjaxErrorHandler(event);
            });

            // 主表双击事件
            self.grid.on("itemdblclick", function (event) {
                var dict = event.item;
                self.getEditModule().editEntity(event.item.id);
            })

            /**
             * 以下为编辑新增等事件，没有权限则返回
             */
            if(!uc.biz.hasRole("ROLE_UC_PARAMETERS_UPDATE")){
                return;
            }

            // 打开新增界面
            $("#btnInsert").click(function () {
                self.getEditModule().addEntity();
            });

            // 单元格点击
            self.grid.on("cellclick", function (event) {
                self.gridCellClickHandler.call(self, event);
            });

        },

        /**
         * 删除
         */
        deleteEntity: function (id) {
            var self = this;
            BUI.Message.Confirm('确定删除该记录？', function () {
                uc.ajax({
                    url: self.baseRestUrl + "/delete.do",
                    type: "DELETE",
                    data: {id: id},
                    dataType: "json",
                    success: function (data) {
                        self.selectEntities();
                        uc.showSuccess("删除成功");
                    }
                });
            }, 'question');
        },
        
        
        /**
         *      启用
         */
        enableEntity: function (id) {
            var self = this;
                uc.ajax({
                    url: self.baseRestUrl + "/enable.do",
                    type: "PUT",
                    data: {id: id},
                    dataType: "json",
                    success: function (data) {
                        self.selectEntities();
                        uc.showSuccess("启用成功");
                    }
                });
        },
        /**
         *     禁用
        */
        disableEntity: function (id) {
            var self = this;
                uc.ajax({
                    url: self.baseRestUrl + "/disable.do",
                    type: "PUT",
                    data: {id: id},
                    dataType: "json",
                    success: function (data) {
                        self.selectEntities();
                        uc.showSuccess("禁用成功");
                    }
                });
        },        

        /**
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/management/parameters";
        },

        /**
         * ready
         */
        ready: function () {
            // 初始化变量
            this.initVars();

            // 创建组件
            this.createCmps();

            // 绑定事件
            this.bindEvents();

            // 加载完毕之后默认查询
            this.selectEntities();
        }
    });


    new ParametersIndexModule({
        name: "org.uc.parameters.index",
        containerId: "parametersIndexModule"
    });


})(window);