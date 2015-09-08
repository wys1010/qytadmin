/**
 * uc枚举
 * @author Wangyiqun
 * @date  2014年07月17日
 */
(function(){

    var uc = window.uc;


    uc.AutoComplete = function(config){

        this.cfg = $.extend({
            listWidth:150,
            listHeight:200,
            textField:"name",
            idField:"id",
            onSelected:null
        },config,true);
        this.$input = $(this.cfg.input);
        this.data = this.cfg.data;
        this.items = [];
        this.createdComplete = false;
        this.create();


    };

    uc.AutoComplete.prototype.create = function(){
        var self = this;
        this.$input.addClass("uc-ac-input");
        this.$posWrap = $("<div class='uc-ac-list-pos-wrap'></div>").appendTo(this.$input.parent());
        this.$listWrap = $("<ul class='uc-ac-list-wrap'></ul>").appendTo(this.$posWrap);
        this.$listWrap.width(this.cfg.listWidth);
        this.$posWrap.width(this.cfg.listWidth);

        $(document.body).mouseup(function(event){
//            console.log("$(event.relatedTarget:", $(event.target))
            if($(event.target).closest(".uc-ac-list-wrap").size() <= 0 && !$(event.target).hasClass("uc-ac-input") ){
                self.$listWrap.hide();
            }
        });
        this.$input.on("focus",function(){
            self.$listWrap.show();
            self.filter();
        });
//        this.$input.on("blur",function(){
//            self.$listWrap.hide();
//        })
        this.$input.keyup(function(){
            self.filter();
        });

        for (var i = 0; i < this.data.length; i++) {
            var itemData = this.data[i];
            var item = {};
            item.data = itemData;
            item.id = itemData[this.cfg.idField];
            item.text = itemData[this.cfg.textField];
            item.$body = $("<li class='uc-ac-list-item'><a href='javascript:void(0)' class='ellipsis'>" + itemData[this.cfg.textField] + "</a></li>").appendTo(this.$listWrap);
            item.$body.width(this.cfg.listWidth);
            this.items.push(item);
            var clickFunFactory = function(item){
                return function(){
                    if(self.cfg.onSelected && $.isFunction(self.cfg.onSelected)){
                        self.cfg.onSelected.call(null,item);
                    }
                    self.$input.val(item.text);
                    self.$listWrap.hide();
                    self.selectedItem = item;
                }
            }
            item.$body.on("click",clickFunFactory(item))
        }

        if(self.$input.val()){
            self.setSelectedValue(self.$input.val());
        }
        this.createdComplete= true;
    }


    uc.AutoComplete.prototype.filter = function(){
        console.log("filting")
        var content = this.$input.val();
        var self = this;
        for (var i = 0; i < self.items.length; i++) {
            var item = self.items[i];
            if(item.text.indexOf(content) >= 0){
                item.$body.show();
            }else{
                item.$body.hide();
            }
        }
    }

    uc.AutoComplete.prototype.setSelectedValue = function(id){
        var self = this;
//        console.log("setSelectedValue:" + id,self.items)
        if(!this.createdComplete){
            self.$input.val(id)
        }
        for (var i = 0; i < self.items.length; i++) {
            var item = self.items[i];
           if(item.id == id){
               self.selectedItem = item;
               self.$input.val(item.text);
           }
        }
    }

    uc.AutoComplete.prototype.getSelectedValue = function(){
        var self = this;
        if(!$.trim(self.$input.val())){
            self.selectedItem = null;
            return null;
        }
        if(self.selectedItem){
            return self.selectedItem.id;
        }
        return null;
    }






})();