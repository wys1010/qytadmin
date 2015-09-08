package com.qyt.management.cache.service;

import java.util.List;

import com.qyt.management.uc.auth.domain.PermissionIdentity;
import com.qyt.management.uc.auth.domain.RoleIdentity;
import com.qyt.management.uc.auth.domain.RolePermission;

/**
 * 权限信息数据库变更的缓存服务
 * 
 * @author caiwb
 */
public interface PermissionCurdCacheService {
	
	public RoleIdentity selectRoleIdentityById(Integer roleId);
    
    public List<RoleIdentity> selectRoleIdentities();
    
    public PermissionIdentity selectPermissionIdentityById(Integer permissionId);
    
    public List<PermissionIdentity> selectPermissionIdentities();
    
    public List<RolePermission> selectRolePermissionIdentityById(Integer roleId);
    
    public List<RolePermission> selectRolePermissionIdentities();
}
