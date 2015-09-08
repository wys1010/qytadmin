/**
 * @author Wangyiqun
 * @date 2014-04-25
 */


(function (global) {

    var DictItemEditModule = uc.Module.extend({

        /*******************************************************
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/dict_items";
            self.dict = null;
            self.defaultData = {

            }

            self.actionMode = "new";
            self.dialog = null;
        },

        getIndexModule : function(){
            return uc.Module.getModuleByName("org.uc.dictItem.index");
        },

        createCmps: function () {
            var self = this;

            // from
            self.form = new BUI.Form.Form({
                id:'formEditDictItem',
                srcNode : '#formEditDictItem'
            }).render();


            // 操作人、创建时间、修改时间
            self.operatorBar = new uc.OperationBar({id : "operatorBarDictItem"});
        },


        /*******************************************************
         * 绑定事件
         */
        bindEvents: function () {
            var self = this;

            self.dialog.on("hide" , function(){
                self.form.clearFields();
                self.setFields(self.defaultData);
                self.form.clearErrors(true);
                self.form.clearErrors(true);

            })

            //组件渲染完毕后初始化页面元素
            self.dialog.on("afterRenderUI",function(){
                self.createCmps();
            });
        },


        /**
         * 初始化窗口
         */
        initDialog : function(){
            var self = this;
            self.dialog = new BUI.Overlay.Dialog({
                id:'editDictItemPage',
                width:560,
                height:210,
                //配置DOM容器的编号
                contentId:'editDictItemPage',
                buttons:[
                    {
                        text:'保存',
                        elCls : 'button button-primary',
                        handler : function(){
                            self.saveEntity();
                        }
                    },{
                        text:'关闭',
                        elCls : 'button',
                        handler : function(){
                            this.close();
                        }
                    }
                ]
            });
        },

        addEntity : function(dict){
            var self = this;
            self.actionMode = "new";
            self.dict = dict;

            // 弹出框的显示信息
            self.dialog.set("title" , "新增<label style='color: darkblue'>(" + dict.name + ")</label>" , true);
            self.dialog.show();

            self.$(".uc-only-update").hide();
            self.$(".uc-only-new").show();

            // 新增时id手动录入
            self.$("#id").attr("readonly" , false);
            self.$("#id").removeClass("readonly");
        },

        editEntity : function(id){
            var self = this;
            self.dict = uc.Module.getModuleByName("org.uc.dict.index").grid.getSelected();
            self.actionMode = "update";

            // 弹出框的显示信息
            self.dialog.set("title" , "编辑" , true);
            self.dialog.show();

            // 编辑时id不允许修改
            self.$("#id").attr("readonly" , true);
            self.$("#id").addClass("readonly");

            self.$(".uc-only-update").show();
            self.$(".uc-only-new").hide();

            uc.ajax({
                url : self.baseRestUrl + "/" + id + ".do",
                type : "GET",
                dataType : "json",
                success : function(data){
                    self.setFields(data);
                }
            })
        },


        setFields : function(data){
            var self = this;
            self.operatorBar.setValue(data);
            self.$("#id").val(data.id);
            self.$("#name").val(data.name);
            self.$("#value").val(data.value);
            self.$("#remark").val(data.remark);
        },

        getValues : function(){
            var self = this;
            var data = {};
            data.id = self.$("#id").val();
            data.name = self.$("#name").val();
            data.value = self.$("#value").val();
            data.remark = self.$("#remark").val();
            return data;
        },

        /**
         * 保存
         */
        saveEntity : function(){
            var self = this;

            // 主动校验
            self.form.valid();
            // 判断校验结果
            if(!self.form.isValid()){
                BUI.Message.Alert("表单填写错误，请修正后再提交" , "error");
                return;
            }

            var url = self.baseRestUrl + "/add.do" , type = "POST";
            if(self.actionMode == 'update'){
                url = self.baseRestUrl + "/update.do" ;
                type = "PUT";
            }

            var data = self.getValues();
            data.dictId = self.dict.id;

            uc.ajax({
                url : url,
                type : type,
                data :  data,
                form : self.form , // 指定form，uc.ajax自动显示校验错误
                success : function(data, textStatus, jqXHR){
                    uc.showSuccess("保存成功");
                    self.dialog.close();
                    self.getIndexModule().selectEntities(self.dict.id);
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


    new DictItemEditModule({
        name: "org.uc.dictItem.edit",
        containerId: "dictItemEditModule"
    });


})(window);



