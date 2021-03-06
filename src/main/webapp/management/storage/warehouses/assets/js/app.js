/**
 * @author Wangyiqun
 * @date 2015年03月24日
 */
(function () {


    var baseUrl = '/management/storage/warehouses/';

    var app = new k.App({
        name: "warehouseApp",
        templateUrl: baseUrl + 'root.html'
    });

    var indexPage = new k.Page({
        name: 'index'
    });


    var editPage = new k.Page({
        paramNames: ['id','op'],
        name: "edit",
        templateUrl: baseUrl + 'tpl_warehouses_edit.html',
        isPopUp: true
    });



    app.addPage(indexPage);
    app.addPage(editPage);


})();

