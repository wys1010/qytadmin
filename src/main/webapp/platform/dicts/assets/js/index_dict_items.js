/**
 * @author Wangyiqun
 * @date 2014-04-24
 */


(function (global) {

    var DictItemIndexModule = uc.Module.extend({

        /**
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/dict_items";
        },

        /**
         * 创建组件
         */
        createCmps: function () {
            var self = this;
            self.createGrid();
        },

        /**
         * 自适应尺寸
         */
        resizeWks: function () {

            // 调整子表宽高
            this.grid.set("width", uc.getWinWidth() / 2 - 3);
            this.grid.set("height", uc.getWinHeight() - uc.getElementsHeight(["queryArea"  , "gridHeader"]) - 25);
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
                    { title: 'id', width: 100, sortable: false, dataIndex: 'id', visible: false},
                    { title: '字典项名称', width: 160, sortable: true, dataIndex: 'name', selectable: true },
                    { title: '字典项值', width: 160, sortable: true, dataIndex: 'value', selectable: true },
                    { title: '备注', width: 160, sortable: false, dataIndex: 'remark', selectable: true },
                    {title: '操作', width: 200, fixed: true, sortable: false, dataIndex: '_operation', renderer: uc.bui.grid.createOperationRenderer({isEnable:false, isDeleteable:false, isDeleteOnlyForEnable: false })}
                ],

                store = new Store({
                    url: self.baseRestUrl + ".do",
                    remoteSort: false
                });

            self.grid = new Grid.Grid({
                idField: "id",
                id: "grid",


                render: '#subGrid',
                loadMask: true,
                forceFit: true,
                itemStatusFields : {selected : 'selected'},// 防止表格自适应尺寸变化，导致表格选中状态去选
                columns: cols,
                height: self.getGridHeight(),
                store: store,
                bbar: {
                    pagingBar: false
                },
                emptyDataTpl: uc.final.EMPTY_DATA_TIP

            });
            self.grid.render();
        },

        /**
         * 查询
         */
        selectEntities: function (id) {
            var self = this;
            var store = this.grid.getAttrVals().store;
            store.get('proxy').set('url', self.baseRestUrl + "/dict/" + id + ".do");
            store.load({}, function (event) {
                if (event.exception) {
                    return;
                }
            });
        },


        /**
         * 获取编辑模块
         * @returns {*}
         */
        getEditModule: function () {
            return uc.Module.getModuleByName("org.uc.dictItem.edit");
        },

        /**
         * 表格单元格单击事件
         * @param event
         */
        gridCellClickHandler: function (event) {
            var self = this;
            // 操作列点击，进入相应的操作
            if (event.field === "_operation") {
                var operationType = uc.bui.grid.getOperation(event);
                if (operationType) {
                    switch (operationType) {
                        // 编辑
                        case uc.bui.grid.OperationEnum.EDIT:
                            self.getEditModule().editEntity(event.record.id);
                            break;
                        // 删除
                        case uc.bui.grid.OperationEnum.DELETE:
                            self.deleteEntity(event.record.id);
                            break;
                        default :
                            return;
                    }
                }
            }
        },

        /**
         * 获取窗口变化后表格需要达到的高度
         * @returns {number}
         */
        getGridHeight: function () {
            return uc.getWinHeight() - uc.getElementsHeight(["queryArea"  , "gridHeader"]) - 23;
        },

        getDictIndexModule : function(){
          return uc.Module.getModuleByName("org.uc.dict.index");
        },

        /*******************************************************
         * 绑定事件
         */
        bindEvents: function () {
            var self = this;

            $("#btnInsertSub").click(function(){
                var dict =  self.getDictIndexModule().grid.getSelected();
                if(!dict){
                    BUI.Message.Alert("请先选择字典", 'error');
                    return;
                }
                self.getEditModule().addEntity(dict);
            });
            // 自适应
            $(window).resize(function () {
                self.resizeWks();
            });

            // 单击事件
            self.grid.on("itemdblclick", function (event) {
                var dict = event.item;
                self.getEditModule().editEntity(event.item);
            });


            // 单元格点击
            self.grid.on("cellclick", function (event) {
                self.gridCellClickHandler.call(self, event);
            });

            // 异常
            self.grid.getAttrVals().store.on("exception", function (event) {
                uc.buiAjaxErrorHandler(event);
            });

        },

        /**
         * 删除记录
         * @param id
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

        }
    });


    new DictItemIndexModule({
        name: "org.uc.dictItem.index",
        containerId: "dictIndexModule"
    });


})(window);



