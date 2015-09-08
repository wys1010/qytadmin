/**
 * bui扩展
 * @author Wangyiqun
 * @date 2014-03-15
 */
(function(){
    
    uc.bui = {};

    uc.bui.grid = {};


    /**
     * 表格列是否渲染器
     * @param colData
     * @param row
     * @param index
     * @returns {string}
     */
    uc.bui.grid.yesOrNoOperationRenderer = function(colData , row , index){
        if(colData === false){
            return "<span style='color:#f60'>否</span>";
        }else if (colData === true){
            return "<span style='color:#00008b'>是</span>";
        }else{
            return "";
        }
    }


    /**
     * 性别渲染列
     * @param colData
     * @param row
     * @param index
     * @returns {string}
     */
    uc.bui.grid.genderRenderer = function(colData , row , index){
        if(colData === 1){
            return "<span style='color:#000'>女</span>";
        }else if (colData === 0){
            return "<span style='color:#000'>男</span>";
        }else{
            return "";
        }
    }

    /**
     * 创建bui grid 操作列渲染器
     * @param config
     * @returns {Function}
     */
    uc.bui.grid.createOperationRenderer = function(config){
        var cfg = $.extend({
            isDeleteOnlyForEnable : true,
            isOrderable : false,
            isEnable : true,
            isEditable : true,
            isDeleteable : true
        },config,true);


        return function(colData , record , index){

            var operationCol = '<div class="uc-grid-tool-wrap" >';
            if(cfg.isEditable){

                operationCol += '<a class="grid-command  uc-edit uc-grid-btn" href="javascript:void(0)" >' +
                    '编辑' +
                    '</a>';
            }

            if(cfg.isDeleteable){
                // 如果设置了删除过滤
                if(cfg.isDeleteOnlyForEnable){
                    if(record.status == uc.StatusRadios.UNENABLE){
                        operationCol += '<a class="grid-command  uc-delete uc-grid-btn" href="javascript:void(0)"  >删除</a>';
                    }
                }else{
                    operationCol += '<a class="grid-command  uc-delete uc-grid-btn"  href="javascript:void(0)" >删除</a>';
                }
            }
//
            if(cfg.isEnable){
                if(record.status == uc.StatusRadios.UNENABLE || record.status == uc.StatusRadios.DISABLE){
                    operationCol += '<a class="grid-command  uc-enable uc-grid-btn" href="javascript:void(0)"  >启用</a>';
                }else if(record.status == uc.StatusRadios.ENABLE ){
                    operationCol += '<a class="grid-command  uc-disable uc-grid-btn" href="javascript:void(0)"  >禁用</a>';
                }
            }

            // 排序
            if(cfg.isOrderable){
                operationCol += "<a class='grid-command  uc-down uc-grid-btn' title='点击降低顺序' href='javascript:void(0)' >↓</a>" +
                    "<a class='grid-command  uc-up uc-grid-btn'  title='点击提升顺序' href='javascript:void(0)' >↑</a>";
            }

            if(cfg.custom && $.isArray(cfg.custom)){
                for(var i = 0; i < cfg.custom.length; i++){
                    var operator = cfg.custom[i];
                    if(operator.filter && $.isFunction(operator.filter)){
                        if(operator.filter(colData , record , index)){
                            operationCol += "<span class='grid-command  uc-grid-btn" + operator.className + "' title=' " + (operator.title || "") + " '>";
                            if(operator.iconCls){
                                operationCol += "<span class='" + operator.iconCls + "'></span>";
                            }
                            operationCol +=  operator.text + "</span>";
                        }
                    }else{
                        operationCol += "<span class='grid-command  uc-grid-btn" + operator.className + "' title=' " + (operator.title || "") + " '>"
                        if(operator.iconCls){
                            operationCol += "<span class='" + operator.iconCls + "'></span>";
                        }
                        operationCol += operator.text + "</span>";
                    }

                }
            }

            operationCol += '</div>'
            return operationCol;
        }
    }

    /**
     * 创建表格状态列
     * @returns {Function}
     */
    uc.bui.grid.createStatusRenderer = function(){
        return  function(colData , record , index){
            if(record.status == uc.StatusRadios.UNENABLE){
                return "<span style='color:blue'>未启用</span>"
            }else if(record.status == uc.StatusRadios.ENABLE){
                return "<span style='color:green'>启用</span>"
            }else{
                return "<span style='color:red'>禁用</span>"
            }
        }
    }

    /**
     * 表格操作列枚举
     * @type {{EDIT: number, DELETE: number, UP: number, DOWN: number}}
     */
    uc.bui.grid.OperationEnum = {
        EDIT : 1,
        DELETE : 2,
        UP : 3,
        DOWN : 4,
        ENABLE : 5,
        DISABLE : 6
    };





    /**
     * 获取操作类型
     * @param event
     * @returns {number}
     */
    uc.bui.grid.getOperation = function(event){
        var dom = event.domTarget;
        if($(dom).hasClass("uc-edit") || $(dom).parent().hasClass("uc-edit")){
            return  uc.bui.grid.OperationEnum.EDIT;
        }else if($(dom).hasClass("uc-delete") || $(dom).parent().hasClass("uc-delete")){
            return  uc.bui.grid.OperationEnum.DELETE;
        }else if($(dom).hasClass("uc-up") || $(dom).parent().hasClass("uc-up")){
            return  uc.bui.grid.OperationEnum.UP;
        }else if($(dom).hasClass("uc-down") || $(dom).parent().hasClass("uc-down")){
            return  uc.bui.grid.OperationEnum.DOWN;
        }else if($(dom).hasClass("uc-enable") || $(dom).parent().hasClass("uc-enable")){
            return  uc.bui.grid.OperationEnum.ENABLE;
        }else if($(dom).hasClass("uc-disable") || $(dom).parent().hasClass("uc-disable")){
            return  uc.bui.grid.OperationEnum.DISABLE;
        }

    }

    /**
     * 是否为自定义操作
     * @param event
     * @param className
     * @returns {*|jQuery}
     */
    uc.bui.grid.isCustomOperation = function(event , className){
        var dom = event.domTarget;
        return $(dom).hasClass(className);
    }
})();