package com.qyt.management.cache.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.qyt.management.cache.listener.PermissionCurdListener;
import com.qyt.management.cache.service.PermissionCurdNotifyService;
import com.qyt.management.uc.auth.domain.PermissionIdentity;
import com.qyt.management.uc.auth.domain.RoleIdentity;
import com.qyt.management.uc.auth.domain.RolePermission;

/**
 * 权限信息数据库变更通知者基类
 * 
 * @author caiwb
 */
public class PermissionCurdNotifyServiceImpl implements PermissionCurdNotifyService {

	private List<PermissionCurdListener> listeners = new ArrayList<PermissionCurdListener>();
	
	@Override
	public void registerCurdListener(PermissionCurdListener listener) {
		listeners.add(listener);
	}

	@Override
	public void notifyInsert(RoleIdentity domain) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onInsert(domain);
		}
	}

	@Override
	public void notifyDelete(RoleIdentity domain) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onDelete(domain);
		}
	}

	@Override
	public void notifyUpdate(RoleIdentity domain) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onUpdate(domain);
		}
	}

	@Override
	public void notifyInsert(PermissionIdentity domain) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onInsert(domain);
		}
	}

	@Override
	public void notifyDelete(PermissionIdentity domain) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onDelete(domain);
		}
	}

	@Override
	public void notifyUpdate(PermissionIdentity domain) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onUpdate(domain);
		}
	}

	@Override
	public void notifyInsert(RolePermission domain) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onInsert(domain);
		}
	}

	@Override
	public void notifyInsert(List<RolePermission> list) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onInsert(list);
		}
	}

	@Override
	public void notifyDelete(RolePermission domain) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onDelete(domain);
		}
	}

	@Override
	public void notifyDelete(List<RolePermission> list) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onDelete(list);
		}
	}

	@Override
	public void notifyClearRolePermission(Integer roleId) {
		for (PermissionCurdListener curdListener : listeners) {
			curdListener.onClearRolePermission(roleId);
		}
	}
	
}
