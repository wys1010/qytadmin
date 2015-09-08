/**
 * @author Wangyiqun
 * @date 2015年03月20日
 * k.App
 */
(function(win){
    if(!win.k){
        win.k = {}
    }
    var k = win.k;

    /**
     *  控制器
     * @param name
     * @param proto
     * @constructor
     */
    k.Controller = function(name,proto){
        this.name = name;
        this.proto = $.extend({
            injects:[],
            controller:{}
        },proto,true);
        this.$controller = null;

        this._extendedByTs = false;
    }

    k.Controller.prototype.extend = function(proto){
        if(proto.prototype){
            this._extendedByTs = true;
            this._$controller = proto;
            //$.extend(this.proto,proto,true);
        }else{
            $.extend(this.proto,proto,true);
        }

    }

    k.Controller.prototype.init = function(page){
        var me = this;
        this.page = page;


        if(this._extendedByTs){

            var realCtrl = this._$controller;

            var proxy = function(){
                // 注入ks属性
                this.ksPage = me.page;
                this.ksName = me.name;
                this.webRoot = win.webRoot;
                me._$controller.apply(this,arguments);
            }

            proxy.$inject = realCtrl.$inject;
            proxy.prototype = me._$controller.prototype;

            this.$proxy = proxy

            return;
        }

        var proto = this.proto;

        /**
         * 构建控制器构造函数
         * @type {string}
         */
        var constructStr = "function(" + me.proto.injects.join(",") +"){";
        for (var i = 0; i < me.proto.injects.length; i++) {
            var inject = me.proto.injects[i];
            constructStr += "this." + inject + " = " + inject + ";"
        }

        if(proto.ready && $.isFunction(proto.ready)){
            constructStr += "this.ready();";
        }
        constructStr += "}"
        var _ctrl = eval("(" + constructStr + ")");

        $.extend(_ctrl.prototype,this.proto,true);

        _ctrl.$inject = this.injects;
        me.$controller = _ctrl;
    }
})(window);