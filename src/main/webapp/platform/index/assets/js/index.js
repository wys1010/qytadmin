(function () {

    var menuTree , tabbar;

    var resizeWks = function () {
        var height = uc.getWinHeight() - 66;
        $(".uc-tabbar-iframe").height(height);
        $("#tabContainer").height(height);
        $(".menus-inner-wrap").height(height - 6)
    }

    window.jumpToProfile = function(){
        tabbar.addTab({
            id:'profile',
            text:'个人资料',
            src: window.basePath + '/uc/user/staffs/profile.do'
        });
    }


    /**
     * 加载树菜单
     */
    function initMenuTree() {

        var $menuWrap = $("#sysMenu");
        var menuData = uc.biz.menusData;
        for (var i = 0; i < menuData.length; i++) {
            var rootMenu = menuData[i];
            var $cataItam = $("<a class='cata-item' href='javascript:void(0)'></a>").appendTo($menuWrap);
            var $icon = $("<span class='fa '></span>").appendTo($cataItam);

            $cataItam.append("<span class='title'> "+rootMenu.text+"</span>");
            $cataItam.attr("id",'cataItem_' + rootMenu.id);


            switch(rootMenu.text){
                case '系统管理':
                    $icon.addClass('fa-cog');
                    break;
                case '基础资料':
                    $icon.addClass('fa-database');
                    break;
                case '仓库管理':
                    $icon.addClass('fa-truck');
                    break;
                case '商城管理':
                    $icon.addClass('fa-shopping-cart');
                    break;
                case '演示系统':
                    $icon.addClass('fa-youtube-play');
                    break;
                case 'CRM管理':
                    $icon.addClass('fa-group');
                    break;
                case '资讯管理':
                    $icon.addClass('fa-newspaper-o');
                    break;
                default :
                    $icon.addClass('fa-list-ul');
            }

            var $subWrap = $("<div class='sub-wrap'></div>").appendTo($menuWrap);
            $subWrap.attr("id","wrap_" + rootMenu.id);

            if(i != 0 ){
                $subWrap.addClass("hidden");
            }


            for (var j = 0; j < rootMenu.children.length; j++) {
                var item = rootMenu.children[j];
                var $leafItem = $("<a class='leaf-item' href='javascript:void(0)'><span class='fa fa-bookmark-o'></span></a>").appendTo($subWrap);
                $leafItem.append("<span> "+item.text+"</span>");
                $leafItem.attr("data-url",item.url);
                $leafItem.attr("id",item.id);
            }
        }

        $menuWrap.bind("click",function(e){
            var $target = $(e.target);
            var $leafItem = $target.closest(".leaf-item");

            // 点击叶子节点
            if($leafItem.size() > 0){
                tabbar.addTab({
                    id: $leafItem.attr("id"),
                    text: $leafItem.text(),
                    src: basePath + $leafItem.attr("data-url")
                });
                e.preventDefault();
                e.stopPropagation();
            }

            var $cataItem = $target.closest(".cata-item");
            if($cataItem.size() > 0){
                //$menuWrap.find(".sub-wrap").removeClass("focus");
                $menuWrap.find(".sub-wrap").addClass("hidden");
                //$cataItem.next(".sub-wrap").addClass("focus");
                $cataItem.next(".sub-wrap").removeClass("hidden")
            }
        })



    }

    /**
     * 初始化框架切换卡
     */
    function initTabbar() {
        tabbar = new uc.Tabbar({
            maxTabNum: 10,
            barWrap: "#barWrap",
            contentWrap: "#tabContainer"
        });


    }

    /**
     * 初始化各组件
     */
    function initCmps() {
        initTabbar();
    }

    /**
     * 绑定事件
     */
    function bindEvents() {
        // 高度自适应
        uc.autoFitHeight(function (winHeight) {
            resizeWks();
        });
    }


    /**
     * ready
     */
    $(function () {
        uc.biz.loadRoles();
        uc.biz.loadMenus(initMenuTree);
        uc.biz.loadAllRolesOfCurrUser();
        initCmps();
        bindEvents();
        resizeWks();

    });
})();



