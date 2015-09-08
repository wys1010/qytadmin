/**
 * ns框架核心
 * @author Wangyiqun
 * @date 2014-03-15
 */
(function(){


    if(window.uc){
        return;
    }

    var uc = window.uc = {};

    uc.modules = {};

    uc.getWinHeight = function() {
        var de = document.documentElement;
        return self.innerHeight||(de && de.clientHeight)||document.body.clientHeight;
    }

    uc.getWinWidth = function() {
        var de = document.documentElement;
        return self.innerWidth||(de && de.clientWidth)||document.body.clientWidth;
    }

    uc.getY = function(id){
        var element = $(id)[0];
        var y = 0;
        for (var e = element; e; e = e.offsetParent) {
            y += e.offsetTop;
        }//此时y为包含scrollHeight
        for (e = element.parentNode; e && e != document.body; e = e.parentNode) {
            if (e.scrollTop)
                y -= e.scrollTop;
        }
        return y;//返回不包含scrollHeight的y
    };
    /**
     * 得到元素的可见页面的x坐标
     * @param {Object} id
     */
    uc.getX = function(id){
        var element = $(id)[0];
        var x = 0;
        for (var e = element; e; e = e.offsetParent) {
            x += e.offsetLeft;
        }//此时y为包含scrollWidth
        for (e = element.parentNode; e && e != document.body; e = e.parentNode) {
            if (e.scrollLeft)
                x -= e.scrollLeft;
        }
        return x;//返回包含scrollWidth的y
    };

    /**
     * 获取若干元素的总高度
     * @param ids
     */
    uc.getElementsHeight = function(ids){
        var height = 0 ;
        for(var i = 0 ; i < ids.length; i++){
            height += $("#" + ids[i]).height();
        }
        return height;
    }

    /**
     * 自适应高度，参数为调整需要自适应的函数,该函数可以接受窗口高度的参数
     */
    uc.autoFitHeight= function(fun){
        if($.isFunction(fun)){
            $(window).resize(function() {
                fun.call(this,uc.getWinHeight());
            });
        }
    }

    uc.showServerException = function(text){
        var dialog = new BUI.Overlay.Dialog({
            title:'服务器出现异常',
            width:500,
            height:350,
            mask:true,  //设置是否模态
            bodyContent:"<div style='width:470px;height:294px;overflow:auto;' >"+text+"</div>",
            closeAction:'destroy',
            buttons:[]
        });
        dialog.show();
    }

    uc.PromptToLoginPage = function(text){
        if(!text){
            text = "您未登录或者登录超时，请重新登录。";
        }
        var dialog = new BUI.Overlay.Dialog({
            title:'请求失败',
            width:300,
            height:130,
            mask:true,  //设置是否模态
            bodyContent:"<div  style='font-size:14px'>"+text+"</div>",
            closeAction:'destroy',
            buttons:[{
                text:'重新登录',
                elCls : 'button button-primary',
                handler : function(){
                    top.location.href = window.basePath+"/passport/login.do"
                }
            },{
                text:'取消',
                elCls : 'button button-primary',
                handler : function(){
                    this.close();
                }
            }]
        });
        dialog.show();
    }

    uc.showFormErrors = function(errorInfo , form){
        for(var fieldName in errorInfo){
            var field = form.getField(fieldName);
            if(field){
                field.showErrors([errorInfo[fieldName]]);
            }
        }
    }


    uc.buiAjaxErrorHandler = function(event , errorFun){
        uc.ajaxErrorHandler.apply(null ,[event.error.jqXHR , event.error.jqXHR.statusText , event.error.errorThrown , errorFun]);
    }

    /**
     * ajax请求异常处理
     * @param jqXHR
     * @param textStatus
     * @param errorThrown
     * @param errorFun
     */
    uc.ajaxErrorHandler = function(jqXHR, textStatus, errorThrown , errorFun , validErrorFun , form){
        //请求超时处理
        if(textStatus=="timeout"){
            BUI.Message.Alert('请求超时，请重新请求','warning');
        }
        else{//其他异常处理
            var errorMsg = "" , errorType = "";
            var unexpectedException = false;//非预期的异常标志
            if(jqXHR.readyState==4){//请求完成，并且后台发来异常错误信息
                var text = jqXHR.responseText;
                /**
                 * 异常代码401，含义：未登录
                 * 处理方式：
                 * 1.用户点击重新登陆按钮，被系统带到登陆界面
                 * 2.用户点击留在当前界面，则关闭弹出框，继续留在当前
                 */
                if(jqXHR.status==401){
                    uc.PromptToLoginPage(text);
                }
                /**
                 * 异常代码403，含义：访问指定功能时权限不足
                 * 处理方式：
                 * 告知用户没有权限做此操作
                 */
                else if(jqXHR.status==403){
                    errorMsg = "您没有权限做此操作！";
                    errorType = "warning";
                }
                /**
                 * 异常代码404，含义：未找到页面或功能
                 * 处理方式：
                 * 告知用户未找到页面或功能
                 */
                else if(jqXHR.status==404){
                    errorMsg = "未找到页面或功能！";
                    errorType = "warning";
                }
                else if(jqXHR.status==500){//服务器异常
                    //从html中截取有效地错误信息
                    if(text.indexOf("<html>")>=0){
                        var start = text.indexOf("<pre>"),
                            end = text.indexOf("</pre>");
                        text = text.substring(start,end+6);
                    }
                    uc.showServerException(text);
                }
                /**
                 * 校验异常
                 */
                else if(jqXHR.status==632){
                    errorMsg = text;
                    errorType = "warning";
                }
                /**
                 * 异常代码631，含义：出现业务异常
                 * 处理方式：
                 * 告知用户业务异常内容
                 */
                else if(jqXHR.status==631){
                    errorMsg = text;
                    errorType = "warning";
                }
                else
                    unexpectedException = true;
            }
            else{
                unexpectedException = true;
            }
            if(unexpectedException){//出现非预期异常，将异常状态值、状态码和状态消息提示出来
                var readyStateText = "";
                if(jqXHR.readyState==0){
                    readyStateText = "请求未初始化（服务可能已停止，请检查服务）";
                }
                else if(jqXHR.readyState==1){
                    readyStateText = "请求已经建立，但是还没有发送";
                }
                else if(jqXHR.readyState==2){
                    readyStateText = "请求已发送，正在处理中";
                }
                else if(jqXHR.readyState==3){
                    readyStateText = "请求在处理中,服务器还没有完成响应的生成";
                }
                else if(jqXHR.readyState==4){
                    readyStateText = "响应完成，已获取到服务器响应";
                }
                errorMsg = "状态值 :  "+readyStateText+"<br/>状态码  :  "+jqXHR.status+"<br/>异常内容 :  "+jqXHR.statusText;
                errorType = "error";

            }
        }

        /**
         * 校验错误
         */
        if(jqXHR.status === 632){

            var errorInfo = eval("(" + errorMsg + ")");
            /**
             * 如果设置了错误处理函数，则不在处理
             */
            if(validErrorFun && $.isFunction(validErrorFun)){

                validErrorFun.call(null , errorInfo);

            }
            // 如果没用错误处理函数，但是设置了form参数，则自动在form中显示错误信息
            else if(form){
                uc.showFormErrors(errorInfo , form);
            }
            // 未捕捉，则直接弹窗提示
            else{
                BUI.Message.Alert(errorMsg, 'error');
            }

        }else
        //执行程序员的错误处理函数
        if(errorFun && $.isFunction(errorFun)){
            errorFun.apply({},[jqXHR, textStatus, errorThrown ]);
        }else{
            BUI.Message.Alert(errorMsg, 'error');
        }

    }


    /**
     * @Title: 框架请求方法
     * @Description: 统一调用该方法做数据请求
     * @author nidongsheng
     * @date 2013-10-19
     *
     * @param config 具体属性请参照jQuery.ajax(settings)方法的settings属性 框架jquery版本为1.8.1
     */
    uc.ajax = function(config){
        if(!config.url){//当请求的url地址不存在时，抛出错误提示
            BUI.Message.Alert('请填写url地址','error');
            return;
        }

        //覆盖查询成功的回调函数
        //缓存用户定义的查询成功的回调函数
        var successFun = config.success,
            errorFun = config.error,
            validErrorFun = config.validError,
            form = config.form;

        /**
         * 1.data:回填数据
         * 2.textStatus:服务器返回的状态值
         * 3.jqXHR jquery 以xmlHTTPRequest为基础封装出来的对象
         */
        config.success = function(data,textStatus,jqXHR){
            //1.程序员回调函数
            successFun.apply({},[data,textStatus,jqXHR]);
        }
        /**
         * 1.jqXHR jquery 以xmlHTTPRequest为基础封装出来的对象
         * 2.textStatus:服务器返回的状态值
         * 3.errorThrown 异常对象
         */
        config.error = function(jqXHR, textStatus, errorThrown){
            uc.ajaxErrorHandler.apply(null , [jqXHR, textStatus, errorThrown,errorFun,validErrorFun , form]);
        }
        //当用户取消开启框架错误函数处理时，关闭框架错误函数
        if(config.callFrameError===false){
            config.error = errorFun;
        }
        //做数据请求
        config.cache = false;//取消请求缓存，修正ie系列浏览器下不更新数据的bug
        $.ajax(config);
    }



    uc.final = {};
    /**
     * 表格查询结果为空提示
     * @type {{}}
     */
    uc.final.EMPTY_DATA_TIP = "<div class='uc-empty-data-tip'>查询成功，没有符合条件的记录！</div>";

    /**
     * 简化bui获取组件的工具函数
     * @param id
     * @returns {Controller}
     */
    uc.getBuiCmp = function(id){
        return BUI.Component.Manager.getComponent(id);
    }


    /**
     * 成功提示
     * @param title
     * @param text
     * @returns {BUI.Overlay.Dialog}
     */
    uc.showSuccess = function(title , text){
        if(arguments.length == 1){
            text = title;
        }

        var wrap = $("<div class='bui-message bui-dialog bui-overlay bui-ext-position x-align-cc-cc' style='width:240;height:120;position: absolute;z-index: 10000;display: block'></div>").appendTo(document.body);
        var header = $('<div class="bui-stdmod-header"><div class="header-title">').appendTo(wrap);
        var body = $('<div class="bui-stdmod-body"><div class="x-icon x-icon-success">i</div>').appendTo(wrap);
        var content = $('<div class="bui-message-content">' + text + '</div>').appendTo(body);
        var footer = $('<div class="bui-stdmod-footer"></div>').appendTo(wrap);


        wrap[0].style.left = (uc.getWinWidth() - 240)/2 + "px";
        wrap[0].style.top = (uc.getWinHeight() - 120)/2 + "px";
//        var dialog = new BUI.Overlay.Dialog({
//            title:title || "提示",
//            width:240,
//            height:120,
//            mask:false,  //设置是否模态
//            bodyContent:text,
//            closeAction:'destroy',
//            buttons:[]
//        });

        setTimeout(function(){
            $(wrap).remove();
        } , 1500);

    }


    /**
     * 创建异步请求的selector，并提供字段适配
     */
    uc.createAjaxSelector = function(config){
        var cfg = $.extend({
            url:"",
            value:-1,
            blankItem:true,
            dataConvertor:{
                textField: "name",
                valueField: "id"
            }
        },config, true);
        $.get(cfg.url, function (data) {
            cfg.dataConvertor.blankItem = cfg.blankItem;
            var items  = uc.listHelper.conver2ListNodes(data,cfg.dataConvertor);
            if (cfg.blankItem && items[0].value != "-1") {
                items.splice(0, 0, {text: '===请选择===', value: '-1'}); //从第0个位置开始插入
            }
            // 生产商选择
            cfg.items = items;
            var selector = new BUI.Select.Select(cfg);
            selector.render();
            if(cfg.value){
                selector.setSelectedValue(cfg.value);
            }
            if(cfg.callBack){
                cfg.callBack.call(null,selector);
            }
        });
    }


//    $(function(){
//        setInterval(function(){
//            $(top.document.body).find("#tabContainer").resize();
//            $(window).resize();
//        } , 2000)
//    })

})();