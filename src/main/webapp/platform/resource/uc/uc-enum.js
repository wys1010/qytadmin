/**
 * uc枚举
 * @author Wangyiqun
 * @date  2014年07月17日
 */
(function(){



    if(uc.Enum){
        return;
    }

    /**
     * uc枚举类
     * @param data [["男","<label>男</label>"],["女","<label>女</label>"]]
     * @constructor
     */
    uc.Enum = function(data){
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
    uc.Enum.prototype.getTextByOrdinal = function(ordinal){
        if(ordinal === null || ordinal === undefined){
            return "";
        }
        return this.data[ordinal][0];
    }

    /**
     * 根据枚举的序列值获取html
     * @param ordinal
     * @returns {*}
     */
    uc.Enum.prototype.getHtmlByOrdinal = function(ordinal){
        if(ordinal === null || ordinal === undefined){
            return "";
        }
        return this.data[ordinal][1];
    }

    uc.Enums = {};

    /**
     * 性别枚举
     * @type {uc.Enum}
     */
    uc.Enums.genderEnum = new uc.Enum([["男","<label>男</label>"],["女","<label>女</label>"]]);

    /**
     * 状态枚举
     * @type {uc.Enum}
     */
    uc.Enums.statusEnum = new uc.Enum([["启用","<label style='color:green' >启用</label>"],["禁用","<label style='color:red'>禁用</label>"],["未启用","<label style='color:blue'>未启用</label>"]]);

    /**
     * 用户状态枚举
     * @type {uc.Enum}
     */
    uc.Enums.userStatusEnum = new uc.Enum([["启用","<label style='color:green'>启用</label>"],["禁用","<label style='color:red'>禁用</label>"]]);


})();