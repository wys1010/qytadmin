/**
 * ks 分页模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    var kx = window.kx = {};

    kx.getY = function(selector){
        var element = $(selector)[0];
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
    kx.getX = function(selector){
        var element = $(selector)[0];
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


    angular.module('ks.supplierPricePreview', ['ks','ks.cache'])
        .directive('ksSupplierPricePreview', ["$compile",'ksTip',function ($compile,ksTip) {

            return {
                scope: {
                    prices:'=',
                    pricesInfo:'='
                },
                restrict: 'E',
                templateUrl: window.webRoot + '/platform/resource/ks/tpl_ks_supplier_price_preview.html?version=' + window.version,
                link: function (scope, element, attrs, ngModel) {

                    var me = scope;
                    $.extend(me,{

                        editing:false,

                        $currTarget:null,

                        editorStyle:'',

                        currField:null,

                        pricesMap:{},

                        currPrice : null,
                        headers : {
                            index:{
                                title:"序号"
                            },
                            category:{
                                title:"品种",
                                labelField:'category',
                                editorType:'combo',
                                comboLabelField:'category'
                            },
                            designation:{
                                title:"牌号",
                                labelField:'designation',
                                editorType:'txt'
                            },
                            manufacturer:{
                                title:"生产商",
                                labelField:'manufacturerName',
                                editorType:'combo',
                                comboLabelField:'name'
                            },
                            originCountry:{
                                title:"产地",
                                labelField:'originCountryNameCn',
                                editorType:'combo',
                                comboLabelField:'nameCn'
                            },
                            city:{
                                title:"城市",
                                labelField:'cityName',
                                editorType:'combo',
                                comboLabelField:'name'
                            },
                            warehouse:{
                                title:"仓库",
                                labelField:'warehouseName',
                                editorType:'txt'
                            },
                            price:{
                                title:"价格",
                                labelField:'price',
                                editorType:'number'
                            },
                            weight:{
                                title:"数量",
                                labelField:'weight',
                                editorType:'number'
                            },
                            futures:{
                                title:"期货",
                                labelField:'futuresString',
                                editorType:'radio'
                            },
                            operator:{
                                title:"操作"
                            }
                        },

                        editorPos:{
                          left:0, top:0
                        },
                        selectedObj:{

                        },

                        entity:{

                        },

                        init:function(){
                            me.dataHandler();
                            me.initVars();
                            me.bindEvent();
                        },

                        dataHandler:function(){
                            for (var i = 0; i < me.prices.length; i++) {
                                var price = me.prices[i];
                                me.pricesMap[price.id] = price;
                                price.modifies = {};
                            }
                        },

                        initVars:function(){

                            me.$wrap = $(element);
                            me.$header = element.find(".header");
                            me.$body = element.find(".body");
                            me.$editor = element.find(".edit-pan");
                        },

                        openEdit:function($target){
                            me.closeEdit();

                            var $row = $target.closest(".row");

                            me.$currTarget = $target;
                            var x0 = kx.getX($target);
                            var y0 = kx.getY($target) - me.$header.height() + $target.height()  + me.$body[0].scrollTop;
                            me.$editor.css({
                                left:x0,
                                top:y0
                            });
                            me.currField = $target.attr("data-field");
                            var index  = $row.attr("data-row-index");
                            me.currPrice = me.prices[index];
                            $target.addClass("editing");
                            me.editing = true;
                            me.$editor.show();
                            me.$digest();
                        },

                        closeEdit:function(){
                            me.editing = false;
                            if(me.$currTarget){
                                me.$currTarget.addClass("editing");
                                me.$currTarget.removeClass("editing");
                            }
                            me.selectedObj = {};
                            me.entity = {};
                            me.$editor.hide();
                            me.$currTarget = null;
                            me.currField = null;
                        },

                        sure:function(){
                            var result = me.setRowData(me.currPrice);
                            if(result){
                                delete me.currPrice.errors[me.currField];
                                me.closeEdit();
                            }
                        },

                        updatePrice:function(price){

                        },

                        setRowData:function(price,rowIndex){

                            var selectedItem = me.selectedObj[me.currField];
                            var currHeader = me.headers[me.currField];
                            var labelField = currHeader.labelField;
                            var editorType = currHeader.editorType;
                            var comboLabelField = currHeader.comboLabelField;

                            switch(editorType){
                                case 'combo':
                                    if (!selectedItem) {
                                        ksTip.error("请选择有效数据");
                                        return false;
                                    }
                                    price[labelField] = selectedItem[comboLabelField];
                                    break;
                                case 'txt':
                                    price[labelField] = me.entity[me.currField];
                                    break;
                                case 'number':
                                    var newVal = me.entity[me.currField];
                                    if(new Number(newVal).toString() != newVal){
                                        ksTip.error("请输入正确地数字");
                                        return false;
                                    }
                                    price[labelField] = newVal;
                                    break;
                                case 'radio':
                                    if(me.currField == 'futures'){
                                        var val = me.entity.futures;
                                        if(val == 1){
                                            price[labelField] = '期货';
                                        }else{
                                            price[labelField] = '现货';
                                        }
                                    }
                                    break;
                                default: ;

                            }

                            if(rowIndex){
                                $(".preview-grid .row:nth-child(" + (rowIndex + 1) + ") ." + me.currField + " .content").addClass("modify");
                                delete price.errors[me.currField];
                            }
                            me.currPrice.modifies[me.currField] = "modfiy";
                            me.$currTarget.addClass("modify");
                            return true;
                        },

                        updateAllSame:function(){

                            var currHeader = me.headers[me.currField];
                            var labelField = currHeader.labelField;
                            var oldVal = me.currPrice[labelField];
                            for (var i = 0; i < me.prices.length; i++) {
                                var price = me.prices[i];
                                if (price[labelField] == oldVal) {
                                    var result = me.setRowData(price,i);
                                    if(!result){
                                        return;
                                    }
                                }
                            }
                            delete me.currPrice.errors[me.currField];
                            me.closeEdit();
                        },

                        cancel:function(){
                            me.closeEdit();
                        },

                        bindEvent:function(){
                            element.click(function(e){
                                var $target = $(e.target);
                                if($target.hasClass("content") ){
                                    me.openEdit($target);
                                }
                            })

                            element.mousedown(function(e){
                                var $target = $(e.target);
                                if($target.closest('.preview-grid').size()<1){
                                    me.closeEdit($target);
                                }
                            })

                            element.keydown(function(e){
                                var keyCode = e.keyCode;

                            })
                        },

                        hasError: function(row){
                            return row.errors && !$.isEmptyObject(row.errors);
                        }


                    },true);

                    me.init();


                }
            }
        }]);
})();