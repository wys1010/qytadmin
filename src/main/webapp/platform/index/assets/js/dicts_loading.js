/**
 * 加载字典
 */
$(function(){

    $.get(basePath + "/platform/dicts/all.do" , function(dicts){
        $.get(basePath + "/platform/dict_items/all.do" , function(dictItems){
           uc.Dicts.initAllDicts(dicts, dictItems);
        })
    })
})