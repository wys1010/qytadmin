package com.qyt.management.uc.auth.domain;

import java.io.Serializable;

/**
 * 角色权限
 * 
 * @author caiwb
 */
public class RolePermission implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -1044749273609434523L;

	private Integer roleId;

    private Integer permissionId;

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Integer getPermissionId() {
		return permissionId;
	}

	public void setPermissionId(Integer permissionId) {
		this.permissionId = permissionId;
	}

}
