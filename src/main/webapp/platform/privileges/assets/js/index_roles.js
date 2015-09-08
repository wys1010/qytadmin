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

        },

        /**
         * 调整高度
         */
        resizeWks: function () {
            var self = this;
            $("#rolesTree").height(uc.getWinHeight() - 100);
            if(self.tree){
                self.tree.set("height", $("#rolesTree").height());
            }
        },


        /**
         * 查询
         */
        selectEntities: function () {
            var self = this;
            uc.ajax({
                type: "GET",
                data:{},
                url: self.baseRestUrl + ".do",
                success: function(data){
                    self.createRoles(data);
                }
            });
        },

        showRolesOfCurrGroup:function(){
            var self = this;
            var groupId = self.getGroupModule().currGroupId;
            uc.ajax({
                type: "GET",
                data:{},
                url:  basePath + "/platform/privileges/" + groupId + ".do",
                success: function(data){
                    var items = self.tree.getItems();
                    self.tree.clearAllChecked();
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        var treeNode = self.tree.getItem(item.roleId);
                        if(treeNode){
                            self.tree.setNodeChecked(treeNode,true);
                        }
                    }
                }
            });
        },

        /**
         * 创建role树
         */
        createRoles: function(roles){
            var self = this;
            self.tree = new BUI.Tree.TreeList({
                render : '#rolesTree',
                nodes : uc.biz.getRoles(),
                checkType: 'all', //checkType:勾选模式，提供了4中，all,onlyLeaf,none,custom
                showLine : true //显示连接线
            });
            self.tree.render();
        },

        /**
         * 获取编辑模块
         */
        getGroupIndexModule: function () {
            return uc.Module.getModuleByName("org.uc.GroupModule");
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

            $("#btnRolesSave").click(function(){
                self.savePrivileges();
            });

        },

        /**
         *
         */
        savePrivileges: function(){
            var self = this;
            var groupId = self.getGroupIndexModule().currGroupId;
            if(!groupId){
                BUI.Message.Alert('确定删除该记录？');
                return;
            }
            
            var items = self.tree.getItems();
            var ids = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if(item.leaf && item.checked){
                    ids.push(item.id);
                }
            }
            ids = ids.join(",");
            uc.ajax({
                url : basePath + "/platform/privileges/update.do",
                type : "PUT",
                data :  {roleIds: ids , groupId: groupId},
                success : function(data, textStatus, jqXHR){
                    uc.showSuccess("保存成功");
                    self.showRolesOfCurrGroup();
                }
            });
        },

        /**
         *
         */
        getPrivilegesModule: function(){
            return uc.Module.getModuleByName("org.uc.PrivilegeModule");
        },


        getGroupModule: function(){
            return uc.Module.getModuleByName("org.uc.GroupModule");
        },

        /**
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/privileges/roles";
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

            this.selectEntities();

        }
    });


    new IndexModule({
        name: "org.uc.RolesIndexModule",
        containerId: "rolesIndexModule"
    });


})(window);
