/**
 * ks 下拉框指令
 * @author Wangyiqun
 * @date 2014-12-30
 */
(function () {

    /**
     *
     * hierarchy 数据
     *  var data = [
             {
                 text:'结点文本', //string  id 取决于 idField 设置，默认为text
                 _iconCls:'结点图标样式', //string text 取决于 textField  设置，默认为text
                 _expend:true ,//boolean true：展开子节点，false不张开子节点
                 _checked:true,//boolean true 勾选结点，false 不勾选子节点
                 children:[] //array 子节点
                 _data:{}//object 原始数据类型,内部构建
             }
         ]

     list 数据

     var data = [
             {
                 id:'结点id',//string id 取决于 idField 设置，默认为text
                 text:'结点文本', //string text 取决于 textField  设置，默认为text
                 _iconCls:'结点图标样式', //string
                 _expend:true ,//boolean true：展开子节点，false不张开子节点
                 _checked:true,//boolean true 勾选结点，false 不勾选子节点
                 parentId:'xxx'//string 父节点id ,parentId 取决于 parentIdField  设置，默认为parentId
             }
        ]
     */
    var CHECK_STATE = {
        ON:1,
        HALF:0,
        OFF:-1
    }

    var CHECKED_CLS = {
        ON:'fa-check check-on',
        OFF:'check-off',
        HALF:'fa-check check-half'
    }

    var TreeNode = function(config){
        this.cfg = $.extend({
            data:null,
            tree : null,
            parentNode:null
        },config,true);
        this.data = this.cfg.data;
        this.rawData = this.cfg.data._data;
        this.parentNode = this.cfg.parentNode;
        this.children = null;
        this.isLeaf = this.cfg.data._isLeaf;
        this._expanded = this.cfg.data._expanded;
        this.$wrap = null;
        this.tree = this.cfg.tree;
        this.checkState = CHECK_STATE.OFF;
        this.create();
        this.tree.nodes.push(this);
    }

    TreeNode.prototype.refreshCheckState = function(){
        var me = this;
        this.$checkBtn.removeClass(CHECKED_CLS.ON);
        this.$checkBtn.removeClass(CHECKED_CLS.HALF);
        this.$checkBtn.removeClass(CHECKED_CLS.OFF);
        switch (this.checkState){
            case CHECK_STATE.ON:
                this.$checkBtn.addClass(CHECKED_CLS.ON);
                break;
            case CHECK_STATE.OFF:
                this.$checkBtn.addClass(CHECKED_CLS.OFF);
                break;
            case CHECK_STATE.HALF:
                this.$checkBtn.addClass(CHECKED_CLS.HALF);
                break;
            default :;
        }
    }



    TreeNode.prototype.toggleChildren = function(){
        var me = this;
        if(!me.$childrenWrap || !me.$toggleBtn){
            return;
        }
        if(me.$toggleBtn.hasClass("fa-minus")){
            me.$toggleBtn.removeClass("fa-minus");
            me.$toggleBtn.addClass("fa-plus");
            me.$icon.removeClass('fa-folder-open');
            me.$icon.addClass('fa-folder');
            me.$childrenWrap.slideUp('fast');
        }else{
            me.$toggleBtn.removeClass("fa-plus");
            me.$toggleBtn.addClass("fa-minus");
            me.$icon.removeClass('fa-folder');
            me.$icon.addClass('fa-folder-open');
            me.$childrenWrap.slideDown('fast');
        }
    }

    TreeNode.prototype.select = function(){
        if(this.tree.selectedNode){
            this.tree.selectedNode.$wrap.removeClass('selected');
        }
        this.$wrap.addClass('selected');
        this.tree.selectedNode = this;
    }

    TreeNode.prototype.selectOff = function(){
        this.$wrap.removeClass('selected');
        this.tree.selectedNode = null;
    }

    TreeNode.prototype.create = function(){
        var me = this;

        if(me.parentNode){
            this.$wrap = $('<div class="ks-tree-item"></div>').appendTo(me.parentNode.$childrenWrap);
        }else{
            this.$wrap = $('<div class="ks-tree-item"></div>').appendTo(this.tree.$wrap);
        }

        this.$wrap.attr("nodeId",this.data.id);
        if(this.tree.nodesMap[this.data.id]){
            alert("结点id重复，树构建失败");
            return;
        }
        this.tree.nodesMap[this.data.id] = this;

        // 层级缩进填充
        for (var i = 0; i < me.data._level; i++) {
            $('<span class="ks-tree-item-fill-block"></span>').appendTo(this.$wrap);
        }

        //
        if(!this.data._isLeaf){
            if(this.data._expanded === false){
                this.$toggleBtn = $('<a class="ks-tree-toggle-btn fa fa-plus"></a>').appendTo(this.$wrap);
            }else{
                this.$toggleBtn = $('<a class="ks-tree-toggle-btn fa fa-minus"></a>').appendTo(this.$wrap);
            }
        }else{
            $('<span class="ks-tree-item-fill-block"></span>').appendTo(this.$wrap);
        }



        // 可勾选的
        if(this.tree.cfg.checkable === true || this.tree.cfg.checkable === "true"){
            this.$checkBtn = $('<a class="ks-tree-check-btn fa"  href="javascript:void(0)"></a>').appendTo(this.$wrap);
        }

        // 结点图标

        this.$icon = $('<a class="ks-tree-item-icon fa"  href="javascript:void(0)"></a>').appendTo(this.$wrap);
        if(this.data._isLeaf){
            this.$icon.addClass('leaf').addClass('fa-file');
        }else{
            if(this.data._expanded === false){
                this.$icon.addClass('not-leaf').addClass('fa-folder');
            }else{
                this.$icon.addClass('not-leaf').addClass('fa-folder-open');
            }

        }

        this.$content = $('<span class="ks-tree-item-content"></span>').appendTo(this.$wrap);
        this.$content.text(this.data.text);

        // 如果还有子节点
        if(this.data.children && me.data.children.length > 0 ){
            me.children = [];
            me.$childrenWrap = $('<div class="ks-children-wrap"></div>').appendTo(me.$wrap.parent());
            for (var i = 0; i < me.data.children.length; i++) {
                var nodeData = me.data.children[i];
                var childNode = new TreeNode({
                    data:nodeData,
                    tree:me.tree,
                    parentNode:me
                });
                me.children.push(childNode);
            }
            if(this.data._expanded === false){
                me.$childrenWrap.hide();
            }
        }
    }


    var Tree = function(config){

        this.cfg = $.extend({
            idField:'id',
            parentIdField:'parentId',
            textField:'text',
            childrenField:'children',
            data:null,
            dataType:'hierarchy',
            treeLineVisible:"false",
            width:null,
            expandAll:true,
            height:null,
            checkable:"false",
            $wrap : null
        },config,true);
        this.nodes = [];
        this.rootNodes = [];
        this.rawData = this.cfg.data;
        this.rawDataList = [];
        this.$wrap = this.cfg.$wrap;

        this.rebuildTree(this.cfg.data);

    }

    Tree.prototype.rebuildTree =  function(datas){
        this.nodes = [];
        this.rootNodes = [];
        this.rawData = datas;
        this.rawDataList = [];
        this.selectedNode = null;
        this.nodesMap = {}
        this.checkedIds = [];
        this.convertData(datas);
        this.$wrap.empty();

        if(!this.data || this.data.length < 1){
            return;
        }
        for (var i = 0; i < this.data.length; i++) {
            var dat = this.data[i];
            var rootNode = new TreeNode({
                data:dat,
                tree : this
            });
            this.rootNodes.push(rootNode);
            this.nodes.push(rootNode);
        }
    }
    var nodeId = 1;
    var _convertHierarchyData = function(tree,parentChildrenArray,datas,level){
        if(!datas){
            return null;
        }
        for (var i = 0; i < datas.length; i++) {
            var node = {}, rawNode = datas[i];
            if(!rawNode.id){
                alert("结点缺少id信息，树构建失败");
                return;
            }
            node._data = rawNode;
            node.text = rawNode[tree.cfg.textField];
            node.id = rawNode[tree.cfg.idField];
            node._iconCls = rawNode._iconCls;
            node._expanded = rawNode._expanded;
            node._checked = rawNode._checked;
            node._level = level + 1;
            node._index = i;
            tree.rawDataList.push(node);
            var children = rawNode[tree.cfg.childrenField];

            parentChildrenArray.push(node);
            if (children && children.length > 0) {
                node.children = [];
                _convertHierarchyData(tree,node.children, children,node._level);
            }else{
                node._isLeaf = true;
            }
        }
    }


    Tree.prototype.getCheckedNodes = function(){
        if(!this.nodesMap){
            return null;
        }
        if(!this.checkedIds || this.checkedIds.length < 1){
            return null;
        }
        var result =  [];
        for (var i = 0; i < this.checkedIds.length; i++) {
            var id = this.checkedIds[i];
            result.push(this.nodesMap[id]);
        }
        return result;
    }

    Tree.prototype.getCheckedRawDatas = function(){
        var nodes = this.getCheckedNodes();
        var result = [];
        if(!nodes || nodes.length < 1){
            return null;
        }
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            result.push(node.rawData);
        }
        return result;
    }


    Tree.prototype.convertData = function(data){
        var me = this;
        if(!data){
            return [];
        }
        this.data  = [];
        if(this.cfg.dataType == "hierarchy"){
            _convertHierarchyData(me,this.data ,data,-1);
        }else{

        }
    }


   var  _cateNodeCheckState = function(node){
       if(node.isLeaf){
           return ;
       }
       var checkedCount = 0;
       var halfCheckedCount = 0;
       for (var i = 0; i < node.children.length; i++) {
           var subNode = node.children[i];
           if(!subNode.isLeaf){
               _cateNodeCheckState(subNode);
           }
           if(subNode.checkState == CHECK_STATE.ON){
               checkedCount ++;
           }
           if(subNode.checkState == CHECK_STATE.HALF){
               halfCheckedCount++;
           }
       }
       if(checkedCount === 0 ){
           if(halfCheckedCount > 0){
               node.checkState = CHECK_STATE.HALF;
           }else{
               node.checkState = CHECK_STATE.OFF;
           }

       }else if(checkedCount === node.children.length){
           node.checkState = CHECK_STATE.ON
       }else{
           node.checkState = CHECK_STATE.HALF;
       }

       node.refreshCheckState();
    }

    /**
     *
     * @param ids 选中状态的叶子结点，
     */
    Tree.prototype.refreshCheckState = function(ids){
        this.checkedIds = ids;
        if(!ids){
            return;
        }

        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            var id = node.data.id;
            var index = ids.indexOf(id);
            node.checkState = index >= 0 ? CHECK_STATE.ON : CHECK_STATE.OFF;
            node.refreshCheckState();
        }

        for (var i = 0; i < this.rootNodes.length; i++) {
            var rootNode = this.rootNodes[i];
            _cateNodeCheckState(rootNode);
        }

    }


    angular.module('ks.tree', ['ks'])
        .directive('ksTree',['$cacheFactory','$http',function ($cacheFactory,$http) {
            return {
                scope: {
                    width:'@',//宽度,为空则自适应
                    height:'@',//高度，为空则自适应
                    dataType:'@',//hierarchy：结点数据包含children；list：通过parentId指定父节点，组件自动拼装
                    data:'=',//数据
                    checkable:'@',//是否允许勾选
                    treeLineVisible:'@',//是否显示树线条
                    selectedItem:'=?',//选中项
                    onSelected:'&',//选中事件
                    selectedId:'=?',
                    onChecked:'&',//勾选事件
                    checkedItems:'=?',//勾选中的数据,拿到的数据为原始数据
                    checkedIds:'=?',//选中结点的id列表array
                    idField:'@',//id字段名
                    textField:'@',//显示内容字段名，
                    parentIdField:'@',//父级id字段名，比如 parentId,parentMenu,dataType 为list时有效
                    templateUrl:'@',//结点渲染模板，后期支持
                    expandAll:'@',//是否默认展开所有结点,如果结点中包含_expended设置，_expended优先级高
                    childrenField:'@'//子节点属性名，dataType为hierarchy时有效
                },
                restrict: 'E',
                replace: true,
                link: function ($scope, $element, $attrs, ngModel) {

                    var me = $scope;

                    $.extend($scope,{

                        nodes:null,


                        init:function(){
                            me.tree = new Tree({
                                idField:$attrs.idField,
                                parentIdField:$attrs.parentIdField,
                                textField:$attrs.textField,
                                childrenField:$attrs.childrenField,
                                data: angular.copy($scope.data),
                                dataType:$attrs.dataType,
                                treeLineVisible:$attrs.treeLineVisible,
                                width:$attrs.width,
                                expandAll:$attrs.expandAll,
                                height:$attrs.height,
                                checkable:$attrs.checkable,
                                $wrap : $($element)
                            });
                            me.bindEvents();
                        },

                        selectItem:function(treeNode){
                            treeNode.select();
                            me.selectedItem = treeNode.data._data;
                            me.$digest();
                            me.$parent.$digest();
                            if(me.onSelected && angular.isFunction(me.onSelected)){
                                me.onSelected(me.selectedItem);
                            }
                        },

                        _toggleCheck :function(items,treeNode,isAdd){
                            if(treeNode.isLeaf){
                                // 对于叶子结点来说，只有ON 和 OFF 两种状态
                                var index = items.indexOf(treeNode.data.id);
                                if(isAdd){
                                    if( index < 0){
                                        items.push(treeNode.data.id);
                                    }
                                }else{
                                    if(index >= 0){
                                        items.splice(index,1);
                                    }
                                }

                            }else{
                                for (var i = 0; i < treeNode.children.length; i++) {
                                    var subNode = treeNode.children[i];
                                    if(subNode ){
                                        me._toggleCheck(items,subNode,isAdd);
                                    }
                                }
                            }
                        },

                        checkItem:function(treeNode){

                            var isAdd = false;

                            //  如果原本的node状态为选中，则去选，否则（HALF,OFF） 选中
                            // 注意，如果点击的是非叶子结点，这里不改变该结点的状态，只传递到所有的叶子结点，所有叶子结点更新之后，往上传播
                            isAdd = treeNode.checkState != CHECK_STATE.ON;
                            var ids = angular.copy(me.checkedIds) || [];
                            me._toggleCheck(ids,treeNode,isAdd);

                            me.checkedIds = ids;

                            me.$digest();
                            me.$parent.$digest();
                        },

                        toggleItem:function(treeNode){
                            treeNode.toggleChildren();
                        },

                        isCheckedItemsEqualsIds:function(){
                            if(!me.checkedItems){
                                if(!me.checkedIds){
                                    return true;
                                }else{
                                    return false;
                                }
                            }

                            for (var i = 0; i < me.checkedItems.length; i++) {
                                var item = me.checkedItems[i];
                                if(me.checkedIds.indexOf(item[$attrs.idField]) < 0){
                                    return false;
                                }
                            }

                            if(me.checkedItems.length === me.checkedIds.length){
                                return true;
                            }else{
                                return false;
                            }
                            
                        },

                        bindEvents:function(){

                            me.$watch('data',function(){
                                me.tree.rebuildTree(me.data);
                                me.selectedItem = null;
                                me.checkedItems = null;
                            });
                            /**
                             * 设置选中项
                             */
                            me.$watch('selectedItem',function(){
                                if(!me.selectedItem || !me.selectedItem[$attrs.idField]){
                                    if(me.tree.selectedNode){
                                        me.tree.selectedNode.selectOff();
                                    }
                                    return;
                                }
                                var node = me.tree.nodesMap[me.selectedItem[$attrs.idField]];
                                if(!node){
                                    return;
                                }
                                node.select();
                            });

                            /**
                             * 设置选中项
                             */
                            me.$watch('selectedId',function(){

                                if(!me.selectedId){
                                    if(me.tree.selectedNode){
                                        me.tree.selectedNode.selectOff();
                                    }
                                    me.selectedItem = null;
                                    return;
                                }else{
                                    var node = me.tree.nodesMap[me.selectedId];

                                    if(!node){
                                        me.selectedItem = null;
                                        return;
                                    }else{
                                        me.selectedItem = node.rawData;
                                        node.select();
                                    }

                                }

                            });


                            if($attrs.checkable === "true"){
                                /**
                                 * 勾选项
                                 */
                                me.$watch('checkedItems',function(){
                                    if(me.isCheckedItemsEqualsIds()){
                                        return;
                                    }
                                    var ids = [];
                                    if(me.checkedItems && me.checkedItems.length > 0){
                                        for (var i = 0; i < me.checkedItems.length; i++) {
                                            var item = me.checkedItems[i];
                                            var id = item[me.idField];
                                            ids.push(id);
                                        }
                                    }
                                    me.checkedIds = ids;
                                });

                                me.$watch('checkedIds',function(){
                                    me.tree.refreshCheckState(me.checkedIds);
                                    if(me.isCheckedItemsEqualsIds()){
                                        return;
                                    }
                                    var items = [];
                                    for (var i = 0; i < me.tree.rawDataList.length; i++) {
                                        var data = me.tree.rawDataList[i];
                                        if(me.checkedIds.indexOf(data[$attrs.idField]) >= 0){
                                            items.push(angular.copy(data));
                                        }
                                    }
                                    me.checkedItems = items;
                                });
                            }




                            me.tree.$wrap.dblclick(function(event){
                                var $target = $(event.target);
                                if(!$target.hasClass("ks-tree-item-content")){
                                    return;
                                }
                                var $treeItem = $target.closest(".ks-tree-item");
                                if(!$treeItem){
                                    return;
                                }
                                var treeNode = me.tree.nodesMap[$treeItem.attr("nodeId")];
                                if(!treeNode){
                                    return;
                                }
                                // 展开/收起子结点
                                me.toggleItem(treeNode);

                            });

                            me.tree.$wrap.click(function(event){
                                var $target = $(event.target);
                                var $treeItem = $target.closest(".ks-tree-item");
                                if(!$treeItem){
                                    return;
                                }
                                var treeNode = me.tree.nodesMap[$treeItem.attr("nodeId")];
                                if(!treeNode){
                                    return;
                                }
                                // 选中结点
                                if(!$target.hasClass("ks-tree-toggle-btn")){
                                    me.selectItem(treeNode);
                                }

                                // 勾选结点
                                if($target.hasClass("ks-tree-check-btn")){
                                    me.checkItem(treeNode);
                                }
                                // 展开/收起子结点
                                else if($target.hasClass("ks-tree-toggle-btn")){
                                    me.toggleItem(treeNode);
                                }
                            })
                        }

                    },true);

                    me.init();

                }

            }
        }])
    ;
})();

