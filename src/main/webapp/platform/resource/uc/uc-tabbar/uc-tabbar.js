/**
 * 页面主框架的切换卡
 * @author Wangyiqun
 * @date 2014-03-15
 */
(function(){

    var uc = window.uc;


    /**
     * 切换卡类
     * @param config
     * @constructor
     */
    uc.Tabbar = function(config){
        var cfg = $.extend({
            maxTabNum : 10 ,
            barWrap : null ,
            contentWrap : null
        },config,true);
        var self = this;


        this.cfg = cfg;
        //所有的tabs对象
        this._tabs = {};
        this._tabsArry = [];
        // 顶部切换按钮的容器
        this.$barWrap = $(cfg.barWrap);
        this.$barWrap.addClass("uc-tabbar-bar-wrap")
        // 内容容器
        this.$contentWrap = $(cfg.contentWrap);
        this.focusTab = null;
    }

    /**
     * 新增tab，可以选择iframe或者div容器
     * 如果cfg包含src属性，则为iframe打开
     * 如果cfg包含container属性，则会将制定的div作为内容容器
     * @param cfg
     */
    uc.Tabbar.prototype.addTab = function(cfg){
        if(this._tabsArry && this._tabsArry.length >= this.cfg.maxTabNum){
            alert("您已经打开了太多的标签页，请关闭一些后再打开新的标签页");
            return;
        }
        var cfg = $.extend({
            text : "",
            id : ""
        } , cfg , true);
        var self = this;
        //如果传入的id已经存在，则切换到焦点
        if(self._tabs[cfg.id]){
            self.activeTab(cfg.id);
            return;
        }

        var tab = self._tabs[cfg.id] = new uc.Tab({
            text : cfg.text,
            id : cfg.id,
            tabbar : self,
            src : cfg.src
        });

        if(self.focusTab != null){
            self.focusTab.inActive();
        }

        self.focusTab = tab;
        self.focusTab.active();
        self._tabsArry.push(tab);
    }

    /**
     * 移除一个tab
     * @param id
     */
    uc.Tabbar.prototype.removeTab = function(id){
        var tab = this._tabs[id];
        if(!tab){
            return ;
        }
        var isFocusRemoved = tab == this.focusTab;
        tab.remove();
        var index = this._tabsArry.indexOf(tab);
        this._tabsArry.splice(index , 1);

        // 如果删除后还存在tab
        if(this._tabsArry.length > 0 && isFocusRemoved){
            var newActiveTab = null;
            // index > 0 说明前面还有tab
            if(index > 0){
                newActiveTab = this._tabsArry[index - 1];
            }
            // index == 0 说明前面没用tab了，要切换到后一个tab
            else{
                newActiveTab = this._tabsArry[index];
            }
            this.focusTab = newActiveTab;
            this.focusTab.active();
        }
        delete this._tabs[id];
    }

    /**
     * 根据id获取一个tab
     */
    uc.Tabbar.prototype.getTab = function(id){
        return this._tabs[id];
    }

    /**
     * 指定id的tab切换为焦点
     * @param id
     */
    uc.Tabbar.prototype.activeTab = function(id){
        var self = this;
        var tab = self._tabs[id];
        if(!tab){
            return;
        }
        if(self.focusTab){
            self.focusTab.inActive();
        }
        self.focusTab = tab;
        tab.active();
    }

    /**
     * 切换卡的某一项类
     * @constructor
     */
    uc.Tab = function(config){
        var cfg = $.extend({
            text : ""
        },config,true);
        var self = this;
        self.id = cfg.id;

        this.tabbar = cfg.tabbar;
        this.$wrap = $("<div class='uc-tabbar-bar inline-block'></div>");
        this.$barContent = $("<span class='uc-tabbar-bar-content'></span>").appendTo(self.$wrap);
        this.$closeBtn = $("<a class='uc-tabbar-close-btn inline-block fa fa-times' href='javascript:void(0)'></a>").appendTo(this.$wrap);
        this.$barContent.text(cfg.text);
        this.$wrap.appendTo(self.tabbar.$barWrap);

        this.$wrap.click(function(){
            self.tabbar.activeTab(self.id);
        });

        this.$iframe = $("<iframe  frameborder='0' class='uc-tabbar-iframe'></iframe> ").appendTo(self.tabbar.$contentWrap);
        this.$iframe[0].src = cfg.src;


        this.$closeBtn.click(function(){
            self.tabbar.removeTab(self.id);
        });
    }

    /**
     * 获取焦点
     */
    uc.Tab.prototype.remove = function(){
        this.$wrap.remove();
        this.$iframe[0].src = false;
        this.$iframe.remove();
    }

    /**
     * 获取焦点
     */
    uc.Tab.prototype.active = function(){
        this.$wrap.addClass("focus");
        this.$iframe.show();
        this.$iframe.height(uc.getWinHeight() - 95);
    }

    /**
     * 获取焦点
     */
    uc.Tab.prototype.inActive = function(){
        this.$wrap.removeClass("focus");
        this.$iframe.hide();
    }

})();