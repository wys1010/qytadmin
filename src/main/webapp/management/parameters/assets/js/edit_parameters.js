/**
 * 
 * @version 1.0
 * @description  {js描述}
 * @author zheng.sk
 * @Time 2014年10月6日 下午8:38:43
 */

(function (global) {

    var ParametersEditModule = uc.Module.extend({

        /*******************************************************
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/management/parameters";

            self.defaultData = {
                id: -1,
                name: null,
                value: null,
                status: 2,
                remark:null,
                operatorId: -1,
                updatedAt: null,
                operator: "",
                createdAt: null
            }

            self.actionMode = "new";
            self.dialog = null;
        },

        getIndexModule: function () {
            return uc.Module.getModuleByName("org.uc.parameters.index");
        },

        createCmps: function () {
            var self = this;

            // from
            self.form = new BUI.Form.Form({
                id: 'formEdit',
                srcNode: '#formEdit',
                errorTpl: '<span class="x-icon x-icon-small x-icon-error" data-title="{error}">!</span>'
            }).render();
            //不使用模板的，左侧显示
            var tips = new BUI.Tooltip.Tips({
                tip: {
                    trigger: '.x-icon-error', //出现此样式的元素显示tip
                    alignType: 'top', //默认方向
                    elCls: 'tips tips-warning tips-no-icon tip1',
                    zIndex: 10002,
                    offset: 10 //距离左边的距离
                }
            });
            tips.render();

            self.statusRadio = new uc.StatusRadios({id: "statusWrap"});
            
            // 操作人、创建时间、修改时间
            self.operatorBar = new uc.OperationBar({id: "operatorBar"});

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
                id: 'editPage',
                width: 700,
                height: 320,
                //配置DOM容器的编号
                contentId: 'editPage',
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

            self.$(".uc-only-update").hide();
            self.$(".uc-only-new").show();

            // 新增时id手动录入
            self.$("#id").attr("readonly", false);
            self.$("#id").removeClass("readonly");
            self.statusRadio.setValue(0);
            self.$("#name").removeClass("disabled");
            self.$("#name").removeAttr("disabled");
            
        },

        editEntity: function (id) {
            var self = this;
            self.actionMode = "update";

            // 弹出框的显示信息
            self.dialog.set("title", "编辑", true);
            self.dialog.show();

            // 编辑时id不允许修改
            self.$("#id").attr("readonly", true);
            self.$("#id").addClass("readonly");

            self.$(".uc-only-update").show();
            self.$(".uc-only-new").hide();
            
            self.$("#name").attr("disabled", "disabled");
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
            self.$("#id").val(data.id);
            self.$("#name").val(data.name);
            self.$("#value").val(data.value);
            self.$("#remark").val(data.remark);
            self.statusRadio.setValue(data.status);
        },

        getValues: function () {
            var self = this;
            var obj = {};
            obj.id = self.$("#id").val();
            obj.name = self.$("#name").val();
            obj.value = self.$("#value").val();
            obj.remark = self.$("#remark").val();
            obj.status = self.statusRadio.getValue();
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
            // 主动校验
            self.form.valid();

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


    new ParametersEditModule({
        name: "org.uc.parameters.edit",
        containerId: "parametersEditModule"
    });


})(window);