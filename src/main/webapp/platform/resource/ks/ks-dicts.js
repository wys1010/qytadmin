/**
 * ks 字典服务
 * @author Wangyiqun
 * @date 2014-12-30
 */
(function () {

    if(! window.ks){
        window.ks = {};
    }
    var ks = window.ks;

    if(ks.dict){
        return ;
    }

    ks.dict = {};

    ks.dict._cache = {};






    ks.Dict = function(dict){
        this._data = dict;
        this.id = dict.id;
        this.name = dict.name;
        this._items = [];

        this._valueForItem = {};

        ks.dict._cache[dict.id] = this;
    }

    ks.Dict.prototype._addItem = function(item){
        var simpleItem = {id:item.id,name:item.name,value:item.value};
        this._items.push(simpleItem);
        this._valueForItem[item.value + ''] = simpleItem;
    }

    ks.Dict.prototype.getItems = function(){
        return this._items;
    }


    ks.dict.getDict = function(dictId){
        return ks.dict._cache[dictId];
    };

    ks.dict.getDictItems = function(dictId){
        var dict = ks.dict._cache[dictId];
        if(!dict){
            return [];
        }
        return dict.getItems();
    };

    ks.dict.getItemLabelOfDict = function(dictId,value){
        var dict = ks.dict._cache[dictId];
        if(!dict){
            return '';
        }
        var item = dict._valueForItem[value + ''];
        if(item){
            return item.name;
        }
        return '';
    }


    if(window.top.uc){
        for (var i = 0; i < window.top.uc.Dicts._dicts.length; i++) {
            var dictItem = window.top.uc.Dicts._dicts[i];
            new ks.Dict(dictItem);
        }

        for (var i = 0; i < window.top.uc.Dicts._dictItems.length; i++) {
            var item = window.top.uc.Dicts._dictItems[i];
            var dict = ks.dict.getDict(item.dictId);
            if(!dict){
                throw new Error('字典项对应的字典:'+item.dictId +'不存在');
            }
            dict._addItem(item);
        }
    }




    angular.module('ks.dicts', ['ks'])
        .provider('ksDicts',function () {


            this.config = function () {
                //loadResources();
            };

            this.$get = ['$filter','$http', function ( $filter,$http) {

                var self = this;


                return {
                    getDictItems: function(id){
                        return ks.dict.getDictItems(id);
                    },
                    getItemLabel: function(id,value){
                        return ks.dict.getItemLabelOfDict(id,value);
                    }
                }
            }]

        });


})();