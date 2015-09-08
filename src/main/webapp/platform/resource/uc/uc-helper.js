/**
 * uc模块
 * @author Wangyiqun
 * @date 2014-03-15
 */
(function () {


    uc.treeHelper = {};

    _converNode = function (data, pNode, pid) {
        var pid = pNode.id;
        var children = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            if (obj.pid == pid) {
                children.push(obj);
            }
        }
        if (children.length > 0) {
            pNode.children = children;
        }

        for (var i = 0; i < children.length; i++) {
            _converNode(data, children[i], children[i].id)

        }
    }

    /**
     * list转换成树节点
     * @param data
     * @param config
     * @returns {*}
     */
    uc.treeHelper.convert2TreeNodes = function (data, config) {
        var cfg = $.extend({
            pidField: "parentId",
            textField: "name"
        }, config, true);

        if (!data || data.length < 1) {
            return data;
        }


        var nodesData = [];

        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            if($.isFunction(config)){
                config.call(null, obj);
            }else{
                obj.text = obj[cfg.textField];
                obj.pid = obj[cfg.pidField];
                obj.expanded = true;
            }
        }

        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            if (!obj.pid) {
                nodesData.push(obj);
                _converNode(data, obj, obj.id);
            }
        }
        return nodesData;
    }

    uc.listHelper = {};

    /**
     * list转换成下拉列表数据
     * @param data
     * @param config
     * @returns {*}
     */
    uc.listHelper.conver2ListNodes = function (data, config) {
        var cfg = $.extend({
            blankItem:true,
            textField: "name",
            valueField: "id"
        }, config, true);

        if($.isFunction(config)){
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                config.call(null , obj);
            }

            if(cfg.blankItem){
                data.unshift({text: '===请选择===', value: -1});
            }
            return data;
        }


        for (var i = 0; i < data.length; i++) {

            var obj = data[i];
            obj.text = obj[cfg.textField];
            obj.value = obj[cfg.valueField];
        }
        if(cfg.blankItem) {
            data.unshift({text: '===请选择===', value: -1})
        }
        return data;
    }

    uc.Regs = {
        CONTAINS_CHINESE: /[\u4E00-\u9FA5]/gi
    }

    uc.parameterHelper = {

        /**
         * encodeURI 中文，如果字符串为空或者不包含中文，则不处理
         * @param str
         * @returns {*}
         */
        encodeIfChinese: function (str) {
            if (!str) {
                return str;
            }
            if (uc.Regs.CONTAINS_CHINESE.test(str)) {
                return encodeURI(encodeURI(str));
            }
            return str;
        },

        /**
         * encodeURI字符串
         * @param param 参数对象
         * @param fields 需要编码的属性数组
         */
        encode: function (param, fields) {
            if(!param || !fields || !$.isArray(fields) || fields.length < 1){
                return;
            }

            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if(param[field]){
                    param[field] = encodeURI(param[field]);
                }

            }
        },

        /**
         * 双重encodeURI字符串
         * @param param 参数对象
         * @param fields 需要编码的属性数组
         */
        doubleEncode: function (param, fields) {
            if(!param || !fields || !$.isArray(fields) || fields.length < 1){
                return;
            }

            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if(param[field]){
                    param[field] = encodeURI(encodeURI(param[field]));
                }

            }
        }



//        /**
//         * 处理查询与保存参数，如果包含中文则encodeURI，如果包含空字符串则trim to null
//         * @param param 参数对象
//         * @param minusToNullFields 如果为负数则设置为null的字段数组
//         */
//        trimOrEncode: function(param, minusToNullFields){
//            for (var field in param) {
//                var value = param[field];
//
//                // 字符串
//                if($.isString(value)){
//
//                    param[field] =
//                }
//
//            }
//        }
    }

})();