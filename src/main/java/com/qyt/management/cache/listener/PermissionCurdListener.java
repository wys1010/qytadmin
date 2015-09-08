package com.qyt.management.cache.listener;

import java.util.List;

import com.qyt.management.uc.auth.domain.PermissionIdentity;
import com.qyt.management.uc.auth.domain.RoleIdentity;
import com.qyt.management.uc.auth.domain.RolePermission;

/**
 * 权限数据变更监听者
 * 
 * @author caiwb
 */
public interface PermissionCurdListener {

	public void onInsert(RoleIdentity domain);
			
	public void onDelete(RoleIdentity domain);
		
	public void onUpdate(RoleIdentity domain);

	public void onInsert(PermissionIdentity domain);
	
	public void onDelete(PermissionIdentity domain);
			
	public void onUpdate(PermissionIdentity domain);
	
	public void onInsert(RolePermission domain);
	
	public void onInsert(List<RolePermission> list);

	public void onDelete(RolePermission domain);
			
	public void onDelete(List<RolePermission> list);
		
	public void onClearRolePermission(Integer roleId);
}
