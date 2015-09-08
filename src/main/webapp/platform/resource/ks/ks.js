/**
 * ks 模块
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function(){
    angular.module('ks',[]).factory('k', function(){
        var ks = {

        };


        ks.serverName = window.serverName;
        ks.rootPath = window.rootPath;

        ks.getRoot = function(){
            return window.webRoot;
        }
        ks.getWinHeight = function() {
            var de = document.documentElement;
            return self.innerHeight||(de && de.clientHeight)||document.body.clientHeight;
        }

        ks.getWinWidth = function() {
            var de = document.documentElement;
            return self.innerWidth||(de && de.clientWidth)||document.body.clientWidth;
        }


        ks.getY = function(selector){
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
         * @param {Object} selector
         * @return x
         */
        ks.getX = function(selector){
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


        /**
         * 自动调整弹出窗口位置,暂时只考虑弹出窗口大小小于页面大小的情况
         * @param ele
         */
        ks.autoFitPopUp = function(ele){
            var popPos = {
                width:$(ele).width(),
                height:$(ele).height(),
                x:ks.getX(ele),
                y:ks.getY(ele)
            }

            var win = {
                width:ks.getWinWidth(),
                height:ks.getWinHeight()
            }

            // 弹出框超出窗口宽度，则居左
            if(popPos.width >= win.width){
                $(ele).css("left" , "0");
                return;
            }

            // 弹出框高度超过窗口高度，居顶
            //if(popPos.height >= win.width){
            //    $(ele).css("top" , "0");
            //    return;
            //}






            var marginRight =  win.width - ( popPos.x + popPos.width );
            var marginBottom = win.height - (popPos.y + popPos.height );


            if(popPos.x < 0 ){
                $(ele).css("left" , parseFloat($(ele).css("left")) - popPos.x + "px")
            }else if(marginRight < 0){
                $(ele).css("left" , parseFloat($(ele).css("left")) + marginRight - 20 + "px")
            }

            //if(marginBottom < 0){
            //    $(ele).css("top" , parseFloat($(ele).css("top")) + marginRight + "px")
            //}




            console.log("popPos:",popPos);
            console.log("win:", win);
            console.log("marginRight:",marginRight);
        }



        ks.convertOrgTreeData = function convertData(organizations) {

            var ds = [];

            for (var key in organizations) {
                var organization = organizations[key];

                if (organization.parentId == null) {
                    var treeItem = {};
                    treeItem.id = organization.id;
                    treeItem.text = organization.name;
                    treeItem._iconCls = "uc-icon-module";
                    treeItem.children = [];
                    treeItem.organization = organization;

                    findTreeItems(organizations, organization, treeItem.children);

                    ds.push(treeItem);
                }
            }

            return ds;

        }

        function findTreeItems(organizations, organization, treeItems) {
            for (var key in organizations) {
                var current = organizations[key];

                if (current.parentId == organization.id) {
                    var treeItem = {}
                    treeItem.id = current.id;
                    treeItem._iconCls = "uc-icon-leaf";
                    treeItem.text = current.name;
                    treeItem.organization = current;
                    treeItem.children = [];

                    treeItems.push(treeItem);

                    findTreeItems(organizations, current, treeItem.children);

                    if (treeItem.children.length <= 0)
                        treeItem.children = null;
                }
            }
        }

        return ks;
    }).directive('dateFormat', ['$filter',function($filter) {
        var dateFilter = $filter('date');
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                function formatter(value) {
                    return dateFilter(value, 'yyyy-MM-dd HH:mm:ss'); //format
                }

                function parser() {
                    return ctrl.$modelValue;
                }

                ctrl.$formatters.push(formatter);
                ctrl.$parsers.unshift(parser);

            }
        };
    }]); ;
})();