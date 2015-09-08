/**
 * @author Wangyiqun
 * @date 2014年08月29日
 */


(function (global) {

    var GroupModule = uc.Module.extend({

        /**
         * 创建组件
         */
        createCmps: function () {
            var self = this;
            self.createGrid();
        },

        /**
         * 调整高度
         */
        resizeWks: function () {
            // 调整主表宽高
            var wksHeight = uc.getWinHeight()  - 25;
            $("#groupsGrid").height(this.getGridHeight());
        },

        getGridHeight: function(){
          return uc.getWinHeight()  - 25  - $("#groupsGridHeader").height();
        },


        /**
         * 查询
         */
        selectEntities: function () {
            var self = this;
            var store = this.grid.getAttrVals().store;
            store.get('proxy').set('url', self.baseRestUrl + ".do");
            store.load({}, function (event) {
                if (event.exception) {
                    return;
                }
            });
        },

        /**
         * 绑定事件
         */
        bindEvents: function () {
            var self = this;

            self.resizeWks();

            // 自适应
            $(window).resize(function () {
                self.resizeWks();
            });


            self.store.on("load", function (data) {
//                console.log("load:", data);
                var rows = data.rows;
                var rowDataFirst = self.store.findByIndex(0)

                if (rowDataFirst) {
                    self.grid.setSelection(rowDataFirst);
                    self.currGroupId = rowDataFirst.id;
                    self.getUserMoudle().selectEntities(rowDataFirst.id);
                    self.getRolesModule().showRolesOfCurrGroup();
                } else {
                    self.getUserMoudle().selectEntities(-1);
                }
            });

            //
            self.$("#groupBtnAdd").click(function(){
                self.getEditModule().addEntity();
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



        },


        getEditModule:function(){
            return uc.Module.getModuleByName("org.uc.groupsEditModule");
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
         * 创建表格
         */
        createGrid: function () {
            var self = this;
            // 主表初始化
            var Grid = BUI.Grid,
                Store = BUI.Data.Store,
                cols = [
                    { title: 'id', width: 100, sortable: false, dataIndex: 'id', visible: false},
                    { title: '组名', width: 100, sortable: true, dataIndex: 'name', visible: true},
                    { title: '备注', width: 100, sortable: true, dataIndex: 'remark', visible: true},
                    {title: '操作', width: 120, fixed: true, sortable: false, dataIndex: '_operation', renderer: uc.bui.grid.createOperationRenderer({isEnable: false, isDeleteOnlyForEnable: false })}
                ];

            self.store = new Store({
                url: self.baseRestUrl + ".do",
                remoteSort: false
            });

            self.grid = new Grid.Grid({
                idField: "id",
                id: "groupsGrid",
                render: '#groupsGrid',
                loadMask: true,
                forceFit: true,
                itemStatusFields: {selected: 'selected'},
                columns: cols,
                height: self.getGridHeight(),
                store: self.store,
                bbar: {
                    pagingBar: false
                },
                emptyDataTpl: uc.final.EMPTY_DATA_TIP

            });
            self.grid.render();

        },

        getRolesModule: function(){
            return uc.Module.getModuleByName("org.uc.RolesIndexModule");
        },


        getUserMoudle:function(){
            return uc.Module.getModuleByName("org.uc.UserOrGroupModule");
        },

        gridCellClickHandler: function (event) {
            var self = this;
            self.currGroupId = event.record.id;
            self.getUserMoudle().selectEntities(event.record.id);
            self.getRolesModule().showRolesOfCurrGroup();
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

        /**
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/privileges/groups";
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


    new GroupModule({
        name: "org.uc.GroupModule",
        containerId: "groupsIndexModule"
    });


})(window);
