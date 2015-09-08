package com.qyt.management.permission.service;

import com.qyt.management.permission.domain.BaseDataPermission;

/**
 * 基础数据权限计算服务
 * 
 * @author caiwb
 */
public interface CalDataPermissionService {
	
	BaseDataPermission cal(Integer staffId, String permissioCode);
	
	BaseDataPermission cal(Integer staffId, String permissioCode, boolean unionStaff, boolean unionOrganization, boolean unionDataAreas);
}
