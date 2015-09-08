package com.qyt.management.uc.auth.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.qyt.management.cache.service.PermissionCurdCacheService;
import com.qyt.management.cache.service.PermissionCurdNotifyService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.exception.NotLoginException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.uc.auth.domain.Menu;
import com.qyt.management.uc.auth.domain.Permission;
import com.qyt.management.uc.auth.domain.Role;
import com.qyt.management.uc.user.domain.Staff;

/**
 * 权限服务
 * 
 * @author caiwb
 */
@Service
public interface PrivilegesService extends PermissionCurdCacheService, PermissionCurdNotifyService {

    /**
     * 查询所有角色
     */
    public List<Role> selectRoles();

    /**
     * 查询角色
     */
    public Role selectRoleById(Integer roleId);

    /**
     * 更新角色
     */
    public void updateRole(Role role) throws BusinessException;

    /**
     * 删除角色
     */
    public void deleteRole(Integer roleId);

    /**
     * 新增角色
     */
    public void insertRole(Role role) throws BusinessException;

    /**
     * 批量新增角色内的员工
     */
    public void batchInsertStaffsOfRole(List<Integer> staffIds, Integer roleId);

    /**
     * 批量删除角色内的员工
     */
    public void batchDeleteStaffsOfRole(List<Integer> staffIds, Integer roleId);

    /**
     * 查询角色下的所有员工
     */
    public void selectStaffsOfRole(PagingBean<Staff> pb, Integer roleId);

    /**
     * 查询指定不在角色内的所有员工
     */
    public void selectStaffsNotInRole(PagingBean<Staff> pb, Integer roleId);

    /**
     * 修改角色的权限
     */
    public void batchUpdateRolePermissions(String permissions, Integer roleId);

    /**
     * 查询所有权限
     */
    public List<Permission> selectAllPermissions();

    /**
     * 查询角色下的权限
     */
    public List<Integer> selectPermissionOfRole(Integer roleId);

    /**
     * 查询当前员工的所有菜单
     * */
    public List<Menu> selectMenusOfCurrStaff() throws NotLoginException, BusinessException;

    /**
     * 查询当前员工的所有权限
     */
    public List<Permission> selectAllPermissionsOfCurrStaff() throws NotLoginException, BusinessException;


    List<Role> pickerRoles();

}
