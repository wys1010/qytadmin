/**
 * uc模块
 * @author Wangyiqun
 * @date 2014-03-15
 */
(function(){



    if(uc.Module){
        return;
    }
    uc.modules = {};


    uc.Class = function () {
    }

    uc.Class.extend = function (proto) {
        var base = function () {
            },
            member,
            that = this,
            subclass = proto && proto.init ? proto.init : function () {
                that.apply(this, arguments);
            },
            fn;

        base.prototype = that.prototype;
        fn = subclass.fn = subclass.prototype = new base();

        for (member in proto) {
            if (typeof proto[member] === "object" && !(proto[member] instanceof Array) && proto[member] !== null) {
                fn[member] = $.extend(true, {}, base.prototype[member], proto[member]);
            } else {
                fn[member] = proto[member];
            }
        }
        fn.constructor = subclass;
        subclass.extend = uc.Class.extend;
        return subclass;
    };


    var s = window.uc;
    if (!s.Modules) {
        uc.Modules = {};
    }
    if (!s.ModuleClasses) {
        uc.ModuleClasses = {};
    }

    uc.Module = uc.M = uc.Class.extend({
        init: function (options) {
            // 实例变量赋值
            var instances = ["name"  , "containerId"];

            var self = this;
            $(instances).each(function (_, item) {
                if (!( item in options)) {
                    alert("uc.Module创建失败，缺少必要参数：" + item);
                }
                self[item] = options[item];
            });

            uc.Modules[this.name] = this;

            $(function () {

                self.ready.call(self);
            });
        },

        /**
         * 卸载模块事件，清理变量事件、定时等
         */
        onUnLoad : function(){

        },

        /**
         * 卸载模块，会触发onUnload
         */
        unLoad : function(){
            this.onUnLoad();
        },


        $: function (selector) {
            if(!this.container){
                this.container = $("#" + this.containerId);
            }
            return this.container.find(selector);
        },
        ready: function () {
        }
    });

    /**
     *  通过名字获取module
     * @param name
     */
    uc.Module.getModuleByName = function (name) {
        return uc.Modules[name];
    }

    uc.Module.addClass = function (name, m) {
        uc.ModuleClasses[name] = m;
    };

    uc.Module.getClassByName = function (name) {
        return uc.ModuleClasses[name];
    };



    uc.BaseModule = uc.M.extend({

        init: function (options) {
            var self = this;
            uc.M.fn.init.call(this, options);
        },
        createCmps: function () {

        },
        /*******************************************************
         * 绑定事件
         */
        bindEvents: function () {
        },
        /*******************************************************
         * 初始化变量
         */
        initVars: function () {

        },
        /*******************************************************
         * ready
         */
        ready: function () {

            uc.M.fn.ready.call(this);

            // 创建组件
            this.createCmps();

            // 初始化变量
            this.initVars();

            // 绑定事件
            this.bindEvents();
        }

    });

})();