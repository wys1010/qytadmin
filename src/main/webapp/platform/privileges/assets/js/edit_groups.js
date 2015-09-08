/**
 * @author Wangyiqun
 * @date 2014-04-25
 */


(function (global) {

    var EditModule = uc.Module.extend({

        /*******************************************************
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/privileges/groups";

            self.defaultData = {
                name: "",
                remark: ""
            }

            self.actionMode = "new";
            self.dialog = null;
        },

        getIndexModule: function () {
            return uc.Module.getModuleByName("org.uc.GroupModule");
        },

        createCmps: function () {
            var self = this;

            // from
            self.form = new BUI.Form.Form({
                id: 'formGroupEdit',
                srcNode: '#formGroupEdit'
            }).render();

            self.operatorBar = new uc.OperationBar({id: "operatorBarGroup"});
        },


        /*******************************************************
         * 绑定事件
         */
        bindEvents: function () {
            var self = this;

            self.dialog.on("hide", function () {
                self.form.clearFields();
                self.setFields(self.defaultData);
                self.form.clearErrors(true);
                self.form.clearErrors(true);

            })

            //组件渲染完毕后初始化页面元素
            self.dialog.on("afterRenderUI", function () {
                self.createCmps();
            });
        },


        /**
         * 初始化窗口
         */
        initDialog: function () {
            var self = this;
            self.dialog = new BUI.Overlay.Dialog({
                id: 'groupsEditModule',
                width: 500,
                height: 180,
                //配置DOM容器的编号
                contentId: 'groupsEditModule',
                buttons: [
                    {
                        text: '保存',
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

        addEntity: function () {
            var self = this;
            self.actionMode = "new";

            // 弹出框的显示信息
            self.dialog.set("title", "新增", true);
            self.dialog.show();

            $(".uc-only-update").hide();
            $(".uc-only-new").show();

        },

        editEntity: function (id) {
            var self = this;
            self.actionMode = "update";

            // 弹出框的显示信息
            self.dialog.set("title", "编辑", true);
            self.dialog.show();


            $(".uc-only-update").show();
            $(".uc-only-new").hide();

            uc.ajax({
                url: self.baseRestUrl + "/" + id + ".do",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("data----------->:", data)
                    self.setFields(data);
                }
            })
        },


        setFields: function (data) {
            var self = this;
            self.operatorBar.setValue(data);
            $("#groupId").val(data.id);
            $("#groupName").val(data.name);
            $("#groupRemark").val(data.remark);
        },

        getValues: function () {
            var self = this;
            var obj = {};
            obj.id = $("#groupId").val();
            obj.name = $("#groupName").val();
            obj.name = encodeURI(obj.name);
            obj.remark = $("#groupRemark").val();
            obj.remark = encodeURI(obj.remark);
            return obj;
        },

        /**
         * 保存
         */
        saveEntity: function () {
            var self = this;
            var url = self.baseRestUrl + "/add.do" , type = "POST";
            if (self.actionMode == 'update') {
                url = self.baseRestUrl + "/update.do";
                type = "PUT";
            }

            uc.ajax({
                url: url,
                type: type,
                data: self.getValues(),
                form: self.form, // 指定form，uc.ajax自动显示校验错误
                success: function (data, textStatus, jqXHR) {
                    uc.showSuccess("保存成功");
                    self.dialog.close();
                    self.getIndexModule().selectEntities();
                }
            });

        },

        /*******************************************************
         * ready
         */
        ready: function () {

            // 初始化变量
            this.initVars();

            // 创建组件
            this.initDialog();

            // 绑定事件
            this.bindEvents();

        }
    });


    new EditModule({
        name: "org.uc.groupsEditModule",
        containerId: "groupsEditModule"
    });


})(window);


