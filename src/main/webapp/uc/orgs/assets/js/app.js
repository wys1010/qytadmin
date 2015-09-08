(function () {



    var baseUrl = '/uc/orgs/';
    var jsUrl = baseUrl + 'assets/js/';

    // app 声明
    var app = new k.App({
        name:"OrganizationIndexApp",
        templateUrl:baseUrl+'root.html'
    });

    // 部门查询
    var selectOrgsPage = new k.Page({
        name:'selectOrgs'
    });


    // 员工查询
    var selectStaffsPage = new k.Page({
        name:'selectStaffs'
    });

    //编辑部门
    var editOrgsPage = new k.Page({
        paramName: ['id'],
        name:'editOrgs',
        templateUrl: baseUrl+'tpl_orgs_edit.html',
        isPopUp:true
    })


    //添加员工
    var addStaffsPage = new k.Page({
        name:'addStaffs',
        templateUrl: baseUrl+'tpl_orgs_staffs_add.html',
        isPopUp:true
    })



    app.addPage(selectOrgsPage);
    app.addPage(selectStaffsPage);
    app.addPage(editOrgsPage);
    app.addPage(addStaffsPage);

    k.loadScript(jsUrl+ "orgsIndex.js");
    k.loadScript(jsUrl+ "staffsIndex.js");
    k.loadScript(jsUrl+ "orgsEdit.js");
    k.loadScript(jsUrl+ "staffsAdd.js");

    app.init();


})();

