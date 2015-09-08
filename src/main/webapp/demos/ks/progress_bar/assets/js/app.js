/**
 * @author Wangyiqun
 * @date 2015年01月04日
 */
(function () {


    var basePath = '/demos/ks/progress_bar/';

    var app = new k.App({
        name:"MyApp",
        templateUrl:basePath + 'root.html'
    });

    var selectRolePage = new k.Page({
        name:'selectRole'
    });

    var selectStaffPage = new k.Page({
        name:'selectStaff'
    });


    app.addPage(selectRolePage);
    app.addPage(selectStaffPage);

    k.loadScript(basePath + "assets/js/selectRole.js");
    k.loadScript(basePath + "assets/js/selectStaff.js");

    app.init();


})();

