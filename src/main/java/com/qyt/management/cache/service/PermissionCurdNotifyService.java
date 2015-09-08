package com.qyt.management.cache.service;

import java.util.List;

import com.qyt.management.cache.listener.PermissionCurdListener;
import com.qyt.management.uc.auth.domain.PermissionIdentity;
import com.qyt.management.uc.auth.domain.RoleIdentity;
import com.qyt.management.uc.auth.domain.RolePermission;

/**
 * 权限信息数据变更通知者
 * 
 * @author caiwb
 */
public interface PermissionCurdNotifyService {

	public void registerCurdListener(PermissionCurdListener listener);
	
	public void notifyInsert(RoleIdentity domain);
		
	public void notifyDelete(RoleIdentity domain);
			
	public void notifyUpdate(RoleIdentity domain);

	public void notifyInsert(PermissionIdentity domain);
	
	public void notifyDelete(PermissionIdentity domain);
			
	public void notifyUpdate(PermissionIdentity domain);
	
	public void notifyInsert(RolePermission domain);
	
	public void notifyInsert(List<RolePermission> list);
	
	public void notifyDelete(RolePermission domain);
			
	public void notifyDelete(List<RolePermission> list);
		
	public void notifyClearRolePermission(Integer roleId);
}
