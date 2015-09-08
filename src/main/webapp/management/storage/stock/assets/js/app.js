/**
 * @author Wangyiqun
 * @date 2015年03月24日
 */
(function () {


    var baseUrl = '/management/storage/stock/';

    var app = new k.App({
        name: "stockApp",
        templateUrl: baseUrl + 'root.html'
    });

    var indexPage = new k.Page({
        name: 'index'
    });


    var editPage = new k.Page({
        paramNames: ['id','op'],
        name: "edit",
        templateUrl: baseUrl + 'tpl_stock_edit.html',
        isPopUp: true
    });

    var recordPage = new k.Page({
        paramName: ['id'],
        name: "record",
        templateUrl: baseUrl + 'tpl_stock_record.html',
        isPopUp: true
    });


    app.addPage(indexPage);
    app.addPage(editPage);
    app.addPage(recordPage);


})();

