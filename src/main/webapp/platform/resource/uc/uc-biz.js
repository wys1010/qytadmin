/**
 * uc枚举
 * @author Wangyiqun
 * @date  2014年07月17日
 */
(function(){

    var uc = window.uc;


    uc.biz = {};

    uc.biz.rolesData = [];

    uc.biz.menusData = null;

    uc.biz.allRolesOfCurrUser = [];

    uc.biz.allRolesOfCurrUserMap = {};

    /**
     * 查询用户所有权限
     */
    uc.biz.loadAllRolesOfCurrUser = function(){
        uc.ajax({
            url: basePath + "/uc/privileges/permissions/curr_user.do",
            success:function(roles){
                uc.biz.allRolesOfCurrUser = roles;
                for (var i = 0; i < roles.length; i++) {
                    var role = roles[i];
                    uc.biz.allRolesOfCurrUserMap[role.code] = role;
                }
            }
        });
    }

    /**
     * 判断用户是否有指定权限
     * @param roleCode
     * @returns {boolean}
     */
    uc.biz.hasRole = function(roleCode){
        if(top.uc.biz.allRolesOfCurrUserMap[roleCode]){
            return true;
        }
        return false;
    }



    uc.biz.loadMenus = function(callback){

        uc.ajax({
            url: basePath + "/uc/privileges/menus.do",
            success:function(menus){
                uc.biz.menusData = uc.treeHelper.convert2TreeNodes(menus);
                for(var i = 0; i < uc.biz.menusData.length; i++){
                    var root = uc.biz.menusData[i];
                    // 如果没用叶子菜单，则不显示模块名
                    if(!root.children || root.children.length < 1){
                        uc.biz.menusData.splice(i,1);
                        i--;
                    }
                }
                if(callback && $.isFunction(callback)){
                    callback.call(menus);
                }
            }
        });
    }

    uc.biz.loadRoles = function(){

        uc.ajax({
            url: basePath + "/uc/privileges/permissions.do",
            success:function(permissions){
                var treeMap = {};
                for (var i = 0; i < permissions.length; i++) {
                    var sysRole = {};
                    var role = permissions[i];
                    var subSys = role.subSys;
                    var subModule = role.subModule;
                    if(role.menu){
                        role.text = role.name + "（菜单）";
                    }else{
                        role.text = role.name;
                    }
                    role.id = role.id;
                    if(!treeMap[subSys]){
                        treeMap[subSys] = {};
                        sysRole = {};
                        sysRole.text = subSys;
                        sysRole.id = subSys;
                        sysRole.children = [];
                        sysRole.expanded = true;
                        uc.biz.rolesData.push(sysRole);
                        treeMap[subSys].roleData = sysRole;

                    }else{
                        sysRole = treeMap[subSys].roleData
                    }
                    var sysMap = treeMap[subSys];
                    var moduleRole = {};
                    if(!sysMap[subModule]){
                        sysMap[subModule] = [];
                        moduleRole.text = subModule;
                        moduleRole.id = subModule;
                        moduleRole.children = [];
                        moduleRole.expanded = true;
                        sysMap[subModule].roleData =  moduleRole;
                        sysRole.children.push(moduleRole);
                    }else{
                        moduleRole = sysMap[subModule].roleData;
                    }

                    moduleRole.children.push(role);
                }

                //console.log(uc.biz.rolesData)
            }
        });

    }

    uc.biz.getRoles = function(){
        return top.uc.biz.rolesData;
    }


})();