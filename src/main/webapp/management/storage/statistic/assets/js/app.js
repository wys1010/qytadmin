/**
 * @author Wangyiqun
 * @date 2015年03月24日
 */
(function () {


    var baseUrl = '/management/storage/statistic/';

    var app = new k.App({
        name: "statisticApp",
        templateUrl: baseUrl + 'root.html'
    });

    var indexPage = new k.Page({
        name: 'index'
    });

    app.addPage(indexPage);

})();

