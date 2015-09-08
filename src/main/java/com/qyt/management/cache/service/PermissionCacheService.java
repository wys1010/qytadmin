package com.qyt.management.cache.service;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.qyt.management.uc.auth.domain.StaffRole;

/**
 * 权限信息缓存服务
 * 
 * @author caiwb
 */
public interface PermissionCacheService {
	    
	public int sizeOfRole();
	
	public Date updatedAtOfRole();
	
	public int sizeOfPermission();
	
	public Date updatedAtOfPermission();
	
	public int sizeOfRolePermission();
	
	public Date updatedAtOfRolePermission();
	
	public void reload();
	
	public void login(Integer staffId, List<StaffRole> staffRoles);
	
	public Set<Integer> getDataAreas(Integer staffId, String permissioCode);
}
