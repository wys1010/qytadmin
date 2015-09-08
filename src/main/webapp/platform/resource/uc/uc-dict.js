/**
 * uc枚举
 * @author Wangyiqun
 * @date  2014年07月17日
 */
(function(){

    var uc = window.uc;


    /**
     * uc枚举类
     * @param data [["男","<label>男</label>"],["女","<label>女</label>"]]
     * @constructor
     */
    uc.Dict = function(data){
        this.data = data;

        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            for (var j = 0; j < row.length; j++) {
                var item = row[j];

            }
        }
    };

    /**
     * 根据枚举的序列值获取text
     * @param ordinal
     */
    uc.Dict.prototype.getTextByOrdinal = function(ordinal){
        return this.data[ordinal][0];
    }

    /**
     * 根据枚举的序列值获取html
     * @param ordinal
     * @returns {*}
     */
    uc.Dict.prototype.getHtmlByOrdinal = function(ordinal){
        return this.data[ordinal][1];
    }

    uc.Dicts = {
        _dicts : null,
        _dictItems : null,
        dictsMap: {},

        /**
         *  加载完所有字典与字典项之后初始化字典组件
         * @param dicts
         * @param dictItems
         */
        initAllDicts : function(dicts, dictItems){
            uc.Dicts._dicts = dicts;
            uc.Dicts._dictItems = dictItems;

            // 解析字典
            for (var i = 0; i < dicts.length; i++) {
                var dict = dicts[i];
                uc.Dicts.dictsMap[dict.id] = dict;
                dict.children = [];
                dict._itemsValueMap = {};
            }

            // 解析字典项
            for (var j = 0; j < dictItems.length; j++) {
                var dictItem = dictItems[j];
                var dict = uc.Dicts.dictsMap[dictItem.dictId];
                if(!dict){
                    alert("加载字典失败，字典项对应的字典：" +  dictItem.dictId + "不存在!");
                    return;
                }
                dictItem.text = dictItem.name;
                dict.children.push(dictItem);

                // 构建以字典项值为key的map，使得通过字典项值与字典id获取字典项更快
                dict._itemsValueMap[dictItem.value] = dictItem;
            }
//            console.log("dictsMap:" , uc.Dicts.dictsMap);
        },


        /**
         * 通过字典id获取字典
         * @param dictId
         * @returns {*}
         */
        getDictById: function(dictId){
            return top.uc.Dicts.dictsMap[dictId];
        },

        /**
         * 根据字典id获取字典项列表
         * @param dictId
         * @returns {*}
         */
        getItemsOfDict : function(dictId){
            var dict = top.uc.Dicts.dictsMap[dictId];
            if(!dict){
                alert("字典：" + dictId + "不存在，获取字典项失败!");
                return ;
            }
            var results = [];
            for (var i = 0; i < dict.children.length; i++) {
                var o = dict.children[i];
                results.push(o);
                
            }
            return results;
        },

        /**
         * 根据字典id与字典项的值获取字典项
         */
        getItemByValueOfDict: function(dictId, value){
            var dict = top.uc.Dicts.getDictById(dictId);
            if(!dict){
                alert("获取字典项失败：指定的字典" + dictId + "不存在！");
                return ;
            }
            return dict._itemsValueMap[value];
        },

        /**
         * 根据字典id与字典项的值获取字典项中某一属性的值
         * @param dictId
         * @param value
         */
        getItemAttrByValueOfDict: function(dictId, value , attrName){
            var item = top.uc.Dicts.getItemByValueOfDict(dictId , value);
            if(!item){
                return null;
            }
            return item[attrName];
        },

        /**
         * 根据字典id与字典项的值获取字典项中某一属性的值
         * @param dictId
         * @param value
         */
        getItemText: function(dictId, value){
            return top.uc.Dicts.getItemAttrByValueOfDict(dictId, value , "text");
        },

        /**
         * 创建字典下拉列表
         * @param config
         * @return Bui.Select.Select
         */
        createSelectorOfDict:function(dictId,config){
            var cfg = $.extend({
                blankItem:true,
                value: -1
            } , config,true);
            var items = uc.Dicts.getItemsOfDict(dictId);
            cfg.items=items;
            if (cfg.blankItem && items[0].value != "-1") {
                items.splice(0, 0, {text: '===请选择===', value: '-1'}); //从第0个位置开始插入
            }
            var selector = new BUI.Select.Select(cfg);
            selector.render();
            if(cfg.value){
                selector.setSelectedValue(cfg.value);
            }
            return selector;
        }

    };





})();