package com.qyt.management.uc.auth.ctrl;

import com.qyt.management.platform.helper.ParameterHelper;
import com.qyt.management.uc.auth.domain.Menu;
import com.qyt.management.uc.auth.domain.Permission;
import com.qyt.management.uc.auth.domain.Role;
import com.qyt.management.uc.user.service.StaffService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.uc.auth.service.PrivilegesService;
import com.qyt.management.uc.user.domain.Staff;
import com.qyt.management.uc.user.domain.User;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

/**
* @author wangyiqun
* @date 3/12/14
*/
@Controller
@RequestMapping(value="uc/privileges")
public class PrivilegesController {

    private static final Logger logger = LoggerFactory.getLogger(PrivilegesController.class);

    @Autowired
    private PrivilegesService privilegesService;

    @Autowired
    private StaffService staffService;

    public static final String PAGE_INDEX = "uc/roles/index_roles";


    /**
     * 返回页面
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "index",method = RequestMethod.GET)
    public String doSearch(HttpServletRequest request ) throws Exception {
        return PAGE_INDEX;
    }




    /**
     * 查询所有组
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "roles",method = RequestMethod.GET)
    @ResponseBody
    public List<Role> selectGroups(HttpServletRequest request ) throws Exception {
        return privilegesService.selectRoles();
    }


    /**
     * 查询所有组
     * @param roleId
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "roles/{roleId}",method = RequestMethod.GET)
    @ResponseBody
    public Role selectGroupById(@PathVariable Integer roleId,HttpServletRequest request ) throws Exception {


        Role role =  privilegesService.selectRoleById(roleId);
        if(null != role.getCreatedBy()){
            Staff staff = staffService.selectEntityByIdEx(role.getCreatedBy());
            if(null != staff){
                role.setCreatedByName(staff.getName());
            }

        }
        return role;
    }

    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "roles/update",method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_ROLES_UPDATE"})
    public void updateRole(@Valid Role role, BindingResult result) throws Exception {

        decodeGroup(role);
        ValidatorHelper.validate(result);
        privilegesService.updateRole(role);
    }


    @RequestMapping(value = "picker/roles",method = RequestMethod.GET)
    @ResponseBody
    public List<Role> pickerRoles(HttpServletRequest request ) throws Exception {
        return privilegesService.pickerRoles();
    }


    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "roles/add",method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_ROLES_UPDATE"})
    public void insertGroup(@Valid Role role, BindingResult result) throws Exception {
        ParameterHelper.trimToEmpty4StringFields(role);
        ValidatorHelper.validate(result);
        privilegesService.insertRole(role);
    }


    private void decodeGroup(Role role) throws UnsupportedEncodingException {
        if(null != role.getName()){
            role.setName(URLDecoder.decode(role.getName(), "utf8"));
        }

        if(null != role.getRemark()){
            role.setRemark(URLDecoder.decode(role.getRemark(), "utf8"));
        }

    }


    private void decodeUser(User user) throws UnsupportedEncodingException {
        user.setName(StringUtils.trimToNull(user.getName()));
        if(null != user.getName()){
            user.setName(URLDecoder.decode(user.getName(), "utf8"));
        }


    }



    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "roles/delete/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_ROLES_UPDATE"})
    public void deleteRole(@PathVariable Integer id) throws Exception {
        privilegesService.deleteRole(id);
    }


    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "roles/add_users",method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_ROLES_UPDATE"})
    public void addUsersOfRole(String ids, Integer roleId) throws Exception {
        List<Integer> idList = new ArrayList<Integer>();
        String[] idsArr = ids.split(",");
        if(idsArr.length < 1){
            return ;
        }
        for (int i = 0; i < idsArr.length; i++) {
            String id = idsArr[i];
            idList.add(Integer.valueOf(id));
        }

        privilegesService.batchInsertStaffsOfRole(idList, roleId);
    }


    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "roles/delete_users",method = RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_ROLES_UPDATE"})
    public void deleteUsersOfGroupId(String ids, Integer roleId) throws Exception {
        List<Integer> idList = new ArrayList<Integer>();
        String[] idsArr = ids.split(",");
        if(idsArr.length < 1){
            return ;
        }
        for (int i = 0; i < idsArr.length; i++) {
            String id = idsArr[i];
            idList.add(Integer.valueOf(id));
        }

        privilegesService.batchDeleteStaffsOfRole(idList, roleId);
    }

    /**
     * 查询指定组的所有员工
     * @param roleId
     * @param pb
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "users/{roleId}",method = RequestMethod.GET)
    @ResponseBody
    public PagingBean<Staff> selectUsersOfGroup(@PathVariable Integer roleId, PagingBean<Staff> pb, HttpServletRequest request ) throws Exception {
        privilegesService.selectStaffsOfRole(pb, roleId);
        return pb;
    }



    /**
     * 查询指定组的所有员工
     * @param roleId
     * @param pb
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "users_not_in/{roleId}",method = RequestMethod.GET)
    @ResponseBody
    public PagingBean<Staff> selectUsersNotInGroup(@PathVariable Integer roleId, PagingBean<Staff> pb, User user , HttpServletRequest request ) throws Exception {
        decodeUser(user);  //由tomcat处理
        pb.setCondition(user);
        privilegesService.selectStaffsNotInRole(pb, roleId);
        return pb;
    }

    @RequestMapping(value = "permissions",method = RequestMethod.GET)
    @ResponseBody
    public List<Permission> selectAllPermissions() throws Exception {
        return privilegesService.selectAllPermissions();
    }


    @RequestMapping(value = "permissions/curr_user",method = RequestMethod.GET)
    @ResponseBody
    public List<Permission> selectAllRolesOfCurrUser() throws Exception {
        return privilegesService.selectAllPermissionsOfCurrStaff();
    }



    /**
     * 查询指定组的所有授权
     * @param roleId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "permissions/{roleId}",method = RequestMethod.GET)
    @ResponseBody
    public List<Integer> selectPrivilegesOfGroup(@PathVariable Integer roleId) throws Exception {
        return privilegesService.selectPermissionOfRole(roleId);
    }


    /**
     * 查询指定组的所有授权
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "menus",method = RequestMethod.GET)
    @ResponseBody
    public List<Menu> selectMenusOfCurrUser() throws Exception {
        return privilegesService.selectMenusOfCurrStaff();
    }

    /**
     * 查询指定组的所有授权
     * @param permissions
     * @param roleId
     * @throws Exception
     */
    @RequestMapping(value = "update_permissions",method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_ROLES_UPDATE"})
    public void updatePrivileges(String permissions , Integer roleId) throws Exception {
        privilegesService.batchUpdateRolePermissions(permissions , roleId);
    }


}
