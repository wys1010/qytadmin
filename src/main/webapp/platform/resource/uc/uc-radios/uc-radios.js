/**
 * 状态切换组件
 * @author Wangyiqun
 * @date 2014-03-15
 */
(function(){
    /**
     * 是或否单选框组
     * @param config
     * @constructor
     */
    uc.Radios = function(config){
        var cfg = $.extend({

        },config,true);

        if(!cfg.id){
            alert("Radios组件构造失败,id属性未设置");
            return;
        }

        if(!cfg.values || !$.isArray(cfg.values) || cfg.values.length < 1){
            alert("Radios组件构造失败,values属性未设置,或values不是数组");
            return;
        }
        if(!cfg.labels || !$.isArray(cfg.labels)){
            alert("Radios组件构造失败,labels属性未设置,或labels不是数组");
            return;
        }

        if(cfg.values.length != cfg.labels.length){
            alert("Radios组件构造失败,labels属性与labels数量不一致");
            return;
        }

        var self = this;
        self.cfg = cfg;
        this.value = null;
//        uc.uis[cfg.id] = self;
        this.wrap = $("#" + cfg.id);
        this.wrap.addClass("uc-radios-wrap");

        this.inputs = [];

        for (var i = 0; i < cfg.values.length; i++) {
            var val = cfg.values[i] , lab = cfg.labels[i];
            var input = $("<input id='uc_radio_" + cfg.id + val + "' name='uc_radio_" + cfg.id + "' type='radio'  ></input><label for='uc_radio_" + cfg.id + val + "' >" + lab + "</label>").appendTo(this.wrap);
            input.click(function(){
                self.value = this.id.substring(('uc_radio_' + cfg.id).length) - 0;
                if(cfg.onChecked){
                    cfg.onChecked.call(this , self.value);
                }
            });
            self.inputs.push(input);
        }

        /**
         * 设置默认值
         */
        if(cfg.value){
            self.value = cfg.value;
            self.wrap.find("#uc_radio_" + cfg.id + cfg.value).attr("checked" , true);
        }else{
            self.value = self.cfg.values[0];
            self.inputs[0].attr("checked" , true);
        }
    };


    /**
     * 状态组件原型
     * @type {{setValue: setValue, getValue: getValue, toggle: toggle}}
     */
    uc.Radios.prototype = {

        /**
         * 赋值
         * @param value
         */
        setValue : function(value){
            var self = this;
            if(value === null){
                value = self.cfg.values[0];
                self.value = self.cfg.values[0];
                self.inputs[0].attr("checked" , true);
                return;
            }
            self.value = value;
//            console.log("uc.Radios.prototype.setValue:" , self.wrap)
            self.wrap.find("#uc_radio_" + self.cfg.id + value).attr("checked" , true);
        },

        /**
         * 取值
         * @returns {*|undefined|String|String[]|Number}
         */
        getValue : function(){
            return this.value;
        }

    }
})();