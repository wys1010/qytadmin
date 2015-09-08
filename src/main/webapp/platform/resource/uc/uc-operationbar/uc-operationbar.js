/**
 * 操作人时间等组件
 * @author Wangyiqun
 * @date 2014-03-15
 */
(function(){
    /**
     * 操作人、创建时间、最后修改时间
     * @constructor
     */
    uc.OperationBar = function(config){
        var cfg = $.extend({

        },config,true);

        if(!cfg.id){
            alert("OperationBar组件构造失败,id属性未设置");
        }
        var self = this;
        self.cfg = cfg;
//        uc.uis[cfg.id] = self;

        this.wrap = $("#" + cfg.id);
        this.innerWrap = $("<div class='uc-operation-bar clearfix'></div>").appendTo(self.wrap);

        this.operatorWrap = $("<span class='uc-operation-field-wrap inline-block'  ><label class='uc-operation-label inline-block'></label></span>").appendTo(self.innerWrap);
        this.operatorContent = $("<label class='uc-operation-content inline-block operator-name'   ></label>").appendTo(self.operatorWrap);

        this.createTimeWrap = $("<span class='uc-operation-field-wrap inline-block'><label class='uc-operation-label inline-block'>创建于:</label></span>").appendTo(self.innerWrap);
        this.createTimeContent = $("<label class='uc-operation-content inline-block'></label>").appendTo(self.createTimeWrap);

        this.updateTimeWrap = $("<span class='uc-operation-field-wrap inline-block'><label class='uc-operation-label inline-block'>最后更新于:</label></span>").appendTo(self.innerWrap);
        this.updateTimeContent = $("<label class='uc-operation-content inline-block'></label>").appendTo(self.updateTimeWrap);

    }

    uc.OperationBar.prototype = {

        /**
         * 设置
         * @param data
         */
        setValue : function(data){
            if(!data){
                data = {operator:""}
            }
            this.operatorContent.text(data.operatorName||data.operator || "");
            if(!data.createdAt){
                this.createTimeContent.text("");
            }else{
                this.createTimeContent.text(BUI.Date.format(new Date(data.createdAt),"yyyy-mm-dd HH:MM:ss"));
            }

            if(!data.updatedAt){
                this.updateTimeContent.text("");
            }else{
                this.updateTimeContent.text(BUI.Date.format(new Date(data.updatedAt),"yyyy-mm-dd HH:MM:ss"));
            }
        },

        /**
         * 清空
         * @param data
         */
        clear : function(data){
            this.operatorContent.text('');
            this.createTimeContent.text('');
            this.updateTimeContent.text('');
        }
    }
})();