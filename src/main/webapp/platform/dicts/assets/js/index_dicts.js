/**
 * @author Wangyiqun
 * @date 2014-04-24
 */


(function (global) {

    var IndexModule = uc.Module.extend({

        createCmps: function () {
            var self = this;
            self.createGrid();
        },

        resizeWks: function () {
            // 调整主表宽高
            this.grid.set("width", uc.getWinWidth() / 2 - 3);
            this.grid.set("height", uc.getWinHeight() - uc.getElementsHeight(["queryArea"  , "gridHeader"]) - 25);
        },

        createGrid: function () {
            var self = this;
            // 主表初始化
            var Grid = BUI.Grid,
                Store = BUI.Data.Store,
                cols = [
                    { title: '编码', width: 220, sortable: true, dataIndex: 'id', selectable: true },
                    { title: '字典名称', width: 160, sortable: true, dataIndex: 'name', selectable: true },
                    { title: '备注', width: 120, sortable: false, dataIndex: 'remark', selectable: true },
                    {title: '操作', width: 160, fixed: true, sortable: false, dataIndex: '_operation', renderer: uc.bui.grid.createOperationRenderer({isEnable: true, isDeleteOnlyForEnable: false })}
                ];

            self.store = new Store({
                url: self.baseRestUrl + ".do",
                remoteSort: true,
                pageSize: 20
            });

            self.grid = new Grid.Grid({
                idField: "id",
                id: "mainGrid",
                render: '#mainGrid',
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
            var formData = BUI.FormHelper.serializeToObject($("#qForm")[0]);
            formData.name = encodeURI(formData.name);
            
            //重置导航栏
            formData.start = 0;
            formData.pageIndex = 0;
            
            store.load(formData, function (event) {
                if (event.exception) {
                    return;
                }

            });
        },

        resetForm: function () {
            $("#q_name").val("");
            $("#q_id").val("");
        },

        getEditModule: function () {
            return uc.Module.getModuleByName("org.uc.dict.edit");
        },
        getDictItemIndexModule: function () {
            return uc.Module.getModuleByName("org.uc.dictItem.index");
        },

        gridCellClickHandler: function (event) {
            var self = this;
            self.getDictItemIndexModule().selectEntities(event.record.id);
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
                        default :
                            return;
                    }
                }
            }
        },


        getGridHeight: function () {
            return uc.getWinHeight() - uc.getElementsHeight(["queryArea"  , "gridHeader"]) - 23
        },

        /*******************************************************
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

            $("#btnInsert").click(function () {
                self.getEditModule().addEntity();
            });

            self.store.on("load", function (data) {
//                console.log("load:", data);
                var rows = data.rows;
                var rowDataFirst = self.store.findByIndex(0)

                if (rowDataFirst) {
                    self.grid.setSelection(rowDataFirst);
                    self.getDictItemIndexModule().selectEntities(rowDataFirst.id);
                } else {
                    self.getDictItemIndexModule().selectEntities(-1);
                }
            });

//
//            // 主表双击事件
            self.grid.on("itemdblclick", function (event) {
                var dict = event.item;
                self.getEditModule().editEntity(event.item.id);
            })


            /**
             * 2.字典表格----------------------------------------------------------
             */
                // 单元格点击
            self.grid.on("cellclick", function (event) {
                self.gridCellClickHandler.call(self, event);
            });

            // 异常
            self.grid.getAttrVals().store.on("exception", function (event) {
                uc.buiAjaxErrorHandler(event);
            });


            /**
             * 生成测试数据
             */
            $("#btnTest").click(function () {
                uc.ajax({
                    url: self.baseRestUrl + "/batch_add.do",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        console.log(data)
                    }
                });
            });
        },

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
        /*******************************************************
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/dicts";
        },

        /*******************************************************
         * ready
         */
        ready: function () {
            // 初始化变量
            this.initVars();

            // 创建组件
            this.createCmps();

            // 绑定事件
            this.bindEvents();

            this.selectEntities();
        }
    });

    new IndexModule({
        name: "org.uc.dict.index",
        containerId: "dictIndexModule"
    });


})(window);



