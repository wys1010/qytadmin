/**
 * @author Wangyiqun
 * @date 2014-07-15
 */


(function (global) {

    var AddUsersModule = uc.Module.extend({

        /**
         * 创建组件
         */
        createCmps: function () {
            var self = this;
            self.createGrid();
        },


        /**
         * 初始化窗口
         */
        initDialog: function () {
            var self = this;
            self.dialog = new BUI.Overlay.Dialog({
                id: 'addUsersPage',
                width: 700,
                height: 550,
                //配置DOM容器的编号
                contentId: 'addUsersPage',
                buttons: [
                    {
                        text: '确定',
                        elCls: 'button button-primary',
                        handler: function () {
                            self.saveEntity();
                        }
                    },
                    {
                        text: '关闭',
                        elCls: 'button',
                        handler: function () {
                            this.close();
                        }
                    }
                ]
            });
        },

        saveEntity: function () {
            var self = this;
            var selectedItems = self.grid.getSelection();
            if(!selectedItems || selectedItems.length < 1){
                BUI.Message.Alert("请先选择要添加的员工");
                return;
            }
            var selectedIds = [];
            for (var i = 0; i < selectedItems.length; i++) {
                var item = selectedItems[i];
                selectedIds.push(item.id);
            }


            var ids = selectedIds.join(",");

            var url = basePath + "/platform/privileges/groups/add_users.do" , type = "POST";
            self.groupId = self.getGroupIndexModule().currGroupId;

            uc.ajax({
                url : url,
                type : type,
                data :  {ids: ids , groupId: self.groupId},
                success : function(data, textStatus, jqXHR){
                    uc.showSuccess("保存成功");
                    self.dialog.close();
                    self.getIndexModule().selectEntities(self.groupId);
                }
            });
        },

        getGroupIndexModule: function(){
            return uc.Module.getModuleByName("org.uc.GroupModule");
        },

        getIndexModule: function(){
            return uc.Module.getModuleByName("org.uc.UserOrGroupModule");
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
                    { title: '性别', width: 45, sortable: true, dataIndex: 'gender', selectable: true, renderer: uc.bui.grid.genderRenderer},
                    { title: '状态', width: 60, sortable: true, dataIndex: 'status', selectable: true, renderer: uc.bui.grid.createStatusRenderer()}
                ];

            self.store = new Store({
                url: self.baseRestUrl + ".do",
                remoteSort: true,
                pageSize: 20
            });

            self.grid = new Grid.Grid({
                idField: "id",
                id: "addUsersGrid",
                render: '#addUsersGrid',
                loadMask: true,
                forceFit: true,
                itemStatusFields: {selected: 'selected'},
                columns: cols,
                height: 400,
                store: self.store,
                plugins: [Grid.Plugins.CheckSelection],
                bbar: {
                    pagingBar: true
                },
                emptyDataTpl: uc.final.EMPTY_DATA_TIP

            });
            self.grid.render();


            // 主表双击事件
            self.grid.on("itemdblclick", function (event) {
                var dict = event.item;
                self.getEditModule().editEntity(event.item.id);
            })


            // 异常
            self.grid.getAttrVals().store.on("exception", function (event) {
                uc.buiAjaxErrorHandler(event);
            });
        },

        /**
         * 查询
         */
        selectEntities: function () {

            var self = this;

            self.groupId = self.getGroupIndexModule().currGroupId;
            if(!self.groupId){
                BUI.Message.Alert("请先选择要用户组");
                return;
            }

            var store = this.grid.getAttrVals().store;
            store.get('proxy').set('url', basePath + "/platform/privileges/users_not_in/" + self.groupId + ".do");

            var param = {};
            param.name = $("#q_name").val();

            uc.parameterHelper.encode(param, ["name"]);

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
         * 绑定事件
         */
        bindEvents: function () {
            var self = this;


            self.dialog.on("hide", function () {

            })

            //组件渲染完毕后初始化页面元素
            self.dialog.on("afterRenderUI", function () {
                self.createCmps();
            });


            // 查询
            $("#btnSearch").click(function () {
                self.selectEntities();
                return false;
            });

        },

        addUsers: function (groupId) {
            var self = this;
            self.groupId = groupId;
            // 弹出框的显示信息
            self.dialog.set("title", "添加用户", true);
            self.dialog.show();
            self.selectEntities();
        },


        /**
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/privileges/users_not_in";
        },


        /**
         * ready
         */
        ready: function () {
            // 初始化变量
            this.initVars();

            // 创建组件
            this.initDialog();

            // 绑定事件
            this.bindEvents();

//            // 加载完毕之后默认查询
//            this.selectEntities();
        }
    });


    new AddUsersModule({
        name: "org.uc.privileges.addUserModule",
        containerId: "usersIndexModule"
    });


})(window);
