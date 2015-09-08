/**
 * @author Wangyiqun
 * @date 2015年03月20日
 * k.Page
 */
(function(win){
    if(!win.k){
        win.k = {}
    }
    var k = win.k;

    k.Page = function(config){
        this.cfg = $.extend({
            controller:{}
        },config,true);

        this.name = this.cfg.name;
        this.paramName = this.cfg.paramName;
        this.paramNames = this.cfg.paramNames;
        this.templateUrl = window.webRoot + this.cfg.templateUrl;
        this.url = this.cfg.url;
        this.isPopUp = this.cfg.isPopUp;
        var ctrlName = this.name.replace(/[\w]/,function($){return $.toUpperCase()}) + "Controller";
        this.controller = new k.Controller(ctrlName,this.cfg.controller);
        this.ctrlName = ctrlName;
    }

    k.Page.prototype.extend = function(proto){
        this.controller.extend(proto);
    }
})(window);