(function () {


    // app 声明
    var app = new k.App({
        name:"MyApp",
        templateUrl:'/demos/ks/test/root.html'
    });

    // 查询页面
    var selectPage = new k.Page({
        name:'select',
        controller:{
            showMyName:function(){
                alert("111")
            }
        }
    });

    // 弹出编辑页面
    var editPage = new k.Page({
        name:"edit",
        templateUrl: '/demos/ks/test/edit.html',
        isPopUp:true
    });

    app.addPage(selectPage);
    app.addPage(editPage);

    k.loadScript("/demos/ks/test/assets/js/select.js");
    k.loadScript("/demos/ks/test/assets/js/edit.js");

    app.init();


})();

