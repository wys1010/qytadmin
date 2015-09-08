/**
 * @author Wangyiqun
 * @date 2014-07-15
 */


(function (global) {

    var IndexModule = uc.Module.extend({

        /**
         * 创建组件
         */
        createCmps: function () {
            var self = this;
            self.createGrid();


            self.qGenderRadio = new uc.Radios({
                id: "qGenderWrap",
                values: [-1, 0, 1],
                labels: ["全部", "男", "女"]
            });

            self.qStatusRadio = new uc.Radios({
                id: "qStatusWrap",
                values: [-1, 0, 1, 2],
                labels: ["全部", "启用", "禁用", "未启用"]
            });
        },

        /**
         * 调整高度
         */
        resizeWks: function () {
            // 调整主表宽高
            this.grid.set("height", uc.getWinHeight() - uc.getElementsHeight(["queryArea"  , "gridHeader"]) - 62);
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
                    { title: '姓名', width: 100, sortable: true, dataIndex: 'name', visible: true},
                    { title: '登录账号', width: 100, sortable: true, dataIndex: 'loginName', visible: true},
                    { title: 'id', width: 100, sortable: false, dataIndex: 'id', visible: false},
                    { title: '状态', width: 60, sortable: true, dataIndex: 'status', selectable: true, renderer: uc.bui.grid.createStatusRenderer()}
                ];

            self.store = new Store({
                url: self.baseRestUrl + ".do",
                remoteSort: true,
                pageSize: 20
            });

            self.grid = new Grid.Grid({
                idField: "id",
                id: "usersGrid",
                render: '#usersGrid',
                loadMask: true,
                forceFit: true,
                itemStatusFields: {selected: 'selected'},
                columns: cols,
                plugins: [Grid.Plugins.CheckSelection],
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
        selectEntities: function (groupId) {
            var self = this;
            var store = this.grid.getAttrVals().store;
            store.get('proxy').set('url', self.baseRestUrl + "/" +  groupId + ".do");
            store.load({}, function (event) {
                if (event.exception) {
                    return;
                }
            });
        },


        /**
         * 获取编辑模块
         */
        getGroupIndexModule: function () {
            return uc.Module.getModuleByName("org.uc.GroupModule");
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
            return uc.getWinHeight() - uc.getElementsHeight(["queryArea"  , "gridHeader"]) - 23
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

            // 批量添加
            $("#userBtnAdd").click(function(){
                self.getAddUsersModule().addUsers();
            });

            // 批量删除
            $("#btnBatchDeleteUsers").click(function(){
                self.batchDeleteUserOfGroup();
            });
        },

        /**
         *  批量删除组内员工
         */
        batchDeleteUserOfGroup: function(){
            var self = this;
            var selectedItems = self.grid.getSelection();
            if(!selectedItems || selectedItems.length < 1){
                BUI.Message.Alert("请先选择要移除的员工");
                return;
            }
            var selectedIds = [];
            for (var i = 0; i < selectedItems.length; i++) {
                var item = selectedItems[i];
                selectedIds.push(item.id);
            }


            var ids = selectedIds.join(",");

            var url = basePath + "/platform/privileges/groups/delete_users.do" , type = "DELETE";
            self.groupId = self.getGroupIndexModule().currGroupId;
            if(!self.groupId){
                BUI.Message.Alert("请先选择用户组");
                return;
            }

            uc.ajax({
                url : url,
                type : type,
                data :  {ids: ids , groupId: self.groupId},
                success : function(data, textStatus, jqXHR){
                    uc.showSuccess("移除成功");
                    self.selectEntities(self.groupId);
                }
            });
        },

        /**
         *
         */
        getPrivilegesModule: function(){
            return uc.Module.getModuleByName("org.uc.PrivilegeModule");
        },


        /**
         *
         * @returns {*}
         */
        getAddUsersModule: function(){
          return uc.Module.getModuleByName("org.uc.privileges.addUserModule");
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
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/privileges/users";
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

        }
    });


    new IndexModule({
        name: "org.uc.UserOrGroupModule",
        containerId: "usersIndexModule"
    });


})(window);
