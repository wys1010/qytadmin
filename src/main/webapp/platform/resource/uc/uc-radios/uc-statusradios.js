/**
 * 状态切换组件
 * @author Wangyiqun
 * @date 2014-03-15
 */
(function(){
    /**
     * 状态单选框组
     * @param config
     * @constructor
     */
    uc.StatusRadios = function(config){
        var cfg = $.extend({

        },config,true);

        if(!cfg.id){
            alert("StatusRadios组件构造失败,id属性未设置");
        }
        var self = this;
        self.cfg = cfg;
        self.value = 0;
//        uc.uis[cfg.id] = self;
        this.wrap = $("#" + cfg.id);
        this.wrap.addClass("uc-radios-wrap");
        this.unEnableInput = $("<input id='" + cfg.id + "_unenable' name='uc_uncommit_" + cfg.id + "status' type='radio' checked ></input><label for='" + cfg.id + "_unenable' >未启用</label>").appendTo(this.wrap);
        this.enableInput = $("<input id='" + cfg.id + "_enable' name='uc_uncommit_" + cfg.id + "status'  type='radio' ></input><label for='" + cfg.id + "_enable' >启用</label>").appendTo(this.wrap);
        this.disableInput = $("<input id='" + cfg.id + "_disable' name='uc_uncommit_" + cfg.id + "status'  type='radio' ></input><label for='" + cfg.id + "_disable' >禁用</label>").appendTo(this.wrap);

        this.enableInput.click(function(){
            self.value = uc.StatusRadios.ENABLE;
            if(cfg.onChecked){
                cfg.onChecked.call(self , self.value);
            }
        });

        this.unEnableInput.click(function(){
            self.value = uc.StatusRadios.UNENABLE;
            if(cfg.onChecked){
                cfg.onChecked.call(self , self.value);
            }
        });

        this.disableInput.click(function(){
            self.value = uc.StatusRadios.DISABLE;
            if(cfg.onChecked){
                cfg.onChecked.call(self , self.value);
            }
        });

        this.setValue(uc.StatusRadios.UNENABLE);
        this.toggle("unEnable");
    };

    uc.StatusRadios.ENABLE = 0;
    uc.StatusRadios.UNENABLE = 2;
    uc.StatusRadios.DISABLE = 1;



    /**
     * 状态组件原型
     * @type {{setValue: setValue, getValue: getValue, toggle: toggle}}
     */
    uc.StatusRadios.prototype = {

        /**
         * 赋值
         * @param value
         */
        setValue : function(value){
            var self = this;
            if(value == uc.StatusRadios.DISABLE ){
                self.disableInput.attr("checked" , true);
                self.toggle("enable");
            }else if(value == uc.StatusRadios.UNENABLE){
                self.unEnableInput.attr("checked" , true);
                self.toggle("unEnable");
            }else if(value == uc.StatusRadios.ENABLE){
                self.enableInput.attr("checked" , true);
                self.toggle("enable");
            }else{
                alert("uc.StatusRadios设置非法:" + value);
                return ;
            }
            if(self.cfg.onChecked){
                self.cfg.onChecked.call(self , self.value);
            }
            self.value = value;
        },

        /**
         * 取值
         * @returns {*|undefined|String|String[]|Number}
         */
        getValue : function(){
            return this.value;
        },

        /**
         * 切换状态
         * @param status enable 或者 unEnable
         */
        toggle : function(status){
            if(status == "enable"){
                this.unEnableInput.hide();
                this.disableInput.show();
            }else if(status == "unEnable"){
                this.unEnableInput.show();
                this.disableInput.hide();
            }
        }
    }
})();