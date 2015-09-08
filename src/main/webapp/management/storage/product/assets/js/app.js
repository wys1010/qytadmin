/**
 * @author Wangyiqun
 * @date 2015年03月24日
 */
(function () {


    var baseUrl = '/management/storage/product/';

    var app = new k.App({
        name: "productApp",
        templateUrl: baseUrl + 'root.html'
    });

    var indexPage = new k.Page({
        name: 'index'
    });


    var editPage = new k.Page({
        paramNames: ['id','op'],
        name: "edit",
        templateUrl: baseUrl + 'tpl_product_edit.html',
        isPopUp: true
    });



    app.addPage(indexPage);
    app.addPage(editPage);


})();

