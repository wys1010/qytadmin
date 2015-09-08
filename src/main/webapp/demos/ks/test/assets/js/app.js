/**
 * @author Wangyiqun
 * @date 2015年01月04日
 */
(function () {


    // app 声明
    var app = new k.App({
        name:"MyApp",
        templateUrl:'/demos/ks/test/root.html'
    });

    // 查询页面
    var selectPage = new k.Page({
        name:'select'  //SelectController
    });

    // 弹出编辑页面
    var editPage = new k.Page({
        paramName:'id', // root.edit   /edit/:id
        name:"edit", // EditController
        templateUrl: '/demos/ks/test/edit.html',
        isPopUp:true
    });

    app.addPage(selectPage);
    app.addPage(editPage);

    k.loadScript("/demos/ks/test/assets/js/select.js");
    k.loadScript("/demos/ks/test/assets/js/edit.js");

    app.init();


})();

