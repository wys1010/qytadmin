package com.qyt.management.uc.auth.dao;

import com.qyt.management.uc.auth.domain.*;
import org.apache.ibatis.annotations.Param;

import com.qyt.management.cache.dao.PermissionCurdCacheMapper;
import com.qyt.management.uc.user.domain.Staff;

import java.util.List;

/**
 * 权限相关
 * 
 * @author caiwb
 */
public interface PrivilegesMapper extends PermissionCurdCacheMapper {

    public Role selectRoleById(Integer roleId);

    public Role selectRoleByName(String roleName);

    public List<Role> selectRoles();

    public void insertRole(Role role);

    public void updateRole(Role role);

    public void deleteRole(Integer roleId);

    /**
     * 删除角色下的所有员工
     * */
    public void deleteAllStaffsOfRole(Integer roleId);

    /**
     * 删除员工的所有角色
     * */
    public void deleteRolesOfStaff(Integer staffId);

    /**
     * 查询角色下的所有员工
     */
    public List<Staff> selectStaffsOfRole(@Param("staff") Staff staff, @Param("roleId") Integer roleId, @Param("start") Integer start, @Param("limit") Integer limit);

    /**
     * 查询总数
     */
    public int selectStaffsCountOfRole(@Param("staff") Staff staff, @Param("roleId") Integer roleId);

    /**
     * 查询指定角色外的所有员工
     */
    public List<Staff> selectStaffsNotInRole(@Param("staff") Staff staff, @Param("roleId") Integer roleId, @Param("start") Integer start, @Param("orgIds") List orgIds, @Param("limit") Integer limit);

    /**
     * 查询总数
     */
    public int selectStaffsCountNotInRole(@Param("staff") Staff staff, @Param("orgIds") List orgIds, @Param("roleId") Integer roleId);

    /**
     * 查询指定角色外的所有员工
     */
    public List<Staff> selectStaffsNotInRole4Root(@Param("staff") Staff staff, @Param("roleId") Integer roleId, @Param("start") Integer start, @Param("limit") Integer limit);

    /**
     * 查询总数
     */
    public int selectStaffsCountNotInRole4Root(@Param("staff") Staff staff, @Param("roleId") Integer roleId);

    /**
     * 查询指定角色外的所有员工
     */
    public List<Staff> selectStaffsNotInRole4Leaf(@Param("staff") Staff staff, @Param("roleId") Integer roleId, @Param("start") Integer start, @Param("orgId") Integer orgId, @Param("limit") Integer limit);

    /**
     * 查询总数
     */
    public int selectStaffsCountNotInRole4Leaf(@Param("staff") Staff staff, @Param("orgId") Integer orgId, @Param("roleId") Integer roleId);

    /**
     * 批量添加角色内的员工
     */
    public void batchInsertStaffsOfRole(@Param("staffIds") List<Integer> staffIds, @Param("roleId") Integer roleId);

    /**
     * 批量删除角色内的员工
     */
    public void batchDeleteStaffsOfRole(@Param("staffIds") List<Integer> staffIds, @Param("roleId") Integer roleId);

    /**
     * 批量新增权限
     */
    public void batchInsertRolePermissions(@Param("rolePermissions") List<RolePermission> rolePermissions);

    /**
     * 删除角色下的全部权限
     */
    public void deleteAllPermissionsOfRole(@Param("roleId") Integer roleId);

    /**
     * 查询员工的所有权限
     */
    public List<Permission> selectAllPermissionsOfStaff(Integer staffId);

    /**
     * 查询角色的所有权限
     */
    public List<Integer> selectPermissionsOfRole(Integer roleId);

    /**
     * 查询所有权限
     */
    public List<Permission> selectAllPermissions();

    /**
     * 查询员工的所有菜单
     * */
    public List<Menu> selectAllMenusOfStaff(Integer staffId);

    /**
     * 添加员工下的角色
     * @param staffId
     * @param roleIds
     */
    public void insertStaffMultiRoles(@Param("staffId") Integer staffId, @Param("roleIds") List<Integer> roleIds);
    
    /**
     * 查询员工的所有角色
     */
    public List<StaffRole> selectAllRolesOfStaff(Integer staffId);
}
