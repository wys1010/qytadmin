package com.qyt.management.cache.dao;

import java.util.List;

import com.qyt.management.uc.auth.domain.PermissionIdentity;
import com.qyt.management.uc.auth.domain.RoleIdentity;
import com.qyt.management.uc.auth.domain.RolePermission;

/**
 * 权限信息数据缓存
 * 
 * @author caiwb
 */
public interface PermissionCurdCacheMapper {

	public RoleIdentity selectRoleIdentityById(Integer roleId);
    
    public List<RoleIdentity> selectRoleIdentities();
    
    public PermissionIdentity selectPermissionIdentityById(Integer permissionId);
    
    public List<PermissionIdentity> selectPermissionIdentities();
    
    public List<RolePermission> selectRolePermissionIdentityById(Integer roleId);
    
    public List<RolePermission> selectRolePermissionIdentities();
}
