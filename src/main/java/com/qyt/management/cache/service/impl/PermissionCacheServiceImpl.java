package com.qyt.management.cache.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qyt.management.cache.listener.PermissionCurdListener;
import com.qyt.management.cache.service.PermissionCacheService;
import com.qyt.management.platform.util.StringUtils;
import com.qyt.management.uc.auth.domain.PermissionIdentity;
import com.qyt.management.uc.auth.domain.RoleIdentity;
import com.qyt.management.uc.auth.domain.RolePermission;
import com.qyt.management.uc.auth.domain.StaffRole;
import com.qyt.management.uc.auth.service.PrivilegesService;

/**
 * 权限信息缓存服务
 * 
 * @author caiwb
 */
@Service
public class PermissionCacheServiceImpl implements PermissionCacheService, PermissionCurdListener {

	@Autowired
	private PrivilegesService privilegesService;
	
	private static Map<Integer, RoleIdentity> cachesRole = new HashMap<Integer, RoleIdentity>();
	private static Map<Integer, PermissionIdentity> cachesPermission = new HashMap<Integer, PermissionIdentity>();
	
	/**
	 * <PermissionCode, <RoleId>>
	 * */
	private static Map<String, Set<Integer>> cachesPermissionRole = new HashMap<String, Set<Integer>>();
	
	/**
	 * <RoleId, <PermissionId>>
	 * */
	private static Map<Integer, Set<Integer>> cachesRolePermission = new HashMap<Integer, Set<Integer>>();
	
	/**
	 * <StaffId, <RoleId, DataAreas>>
	 * */
	private static Map<Integer, Map<Integer, Set<Integer>>> cachesStaffRoleDataAreas = new HashMap<Integer, Map<Integer, Set<Integer>>>();
	
	private Date updatedAtOfRole;
	private Date updatedAtOfPermission;
	private Date updatedAtOfRolePermission;
	
	private boolean loaded = false;
	
	@Override
	public int sizeOfRole() {
		return cachesRole.size();
	}

	@Override
	public Date updatedAtOfRole() {
		return updatedAtOfRole;
	}

	@Override
	public int sizeOfPermission() {
		return cachesPermission.size();
	}

	@Override
	public Date updatedAtOfPermission() {
		return updatedAtOfPermission;
	}

	@Override
	public int sizeOfRolePermission() {
		int size = 0;
		
		for (Integer roleId : cachesRolePermission.keySet()) {
			size += cachesRolePermission.get(roleId).size();
		}
		
		return size;
	}

	@Override
	public Date updatedAtOfRolePermission() {
		return updatedAtOfRolePermission;
	}
	
	@Override
	public void reload() {
		if (!loaded) {
			loaded = true;

			privilegesService.registerCurdListener(this);			
		}
		
		List<RoleIdentity> roleIdentitys = privilegesService.selectRoleIdentities();
		if (roleIdentitys != null && roleIdentitys.size() > 0) {
			cachesRole.clear();
			
			for (RoleIdentity roleIdentity : roleIdentitys) {
				cachesRole.put(roleIdentity.getId(), roleIdentity);
			}
			
			updatedAtOfRole = new Date();
		}
		
		List<PermissionIdentity> permissionIdentitys = privilegesService.selectPermissionIdentities();
		if (permissionIdentitys != null && permissionIdentitys.size() > 0) {
			cachesPermission.clear();
			
			for (PermissionIdentity permissionIdentity : permissionIdentitys) {
				cachesPermission.put(permissionIdentity.getId(), permissionIdentity);
			}
			
			updatedAtOfPermission = new Date();
		}
		
		List<RolePermission> rolePermissions = privilegesService.selectRolePermissionIdentities();
		if (rolePermissions != null && rolePermissions.size() > 0) {
			if (roleIdentitys != null && roleIdentitys.size() > 0) {
				cachesRolePermission.clear();
				
				for (RoleIdentity roleIdentity : roleIdentitys) {					
					cachesRolePermission.put(roleIdentity.getId(), new HashSet<Integer>());
				}
			}
			
			for (RolePermission rolePermission : rolePermissions) {
				Set<Integer> permissions = null;
				
				if (cachesRolePermission.containsKey(rolePermission.getRoleId())) {
					permissions = cachesRolePermission.get(rolePermission.getRoleId());
				} else {
					permissions = new HashSet<Integer>();
					cachesRolePermission.put(rolePermission.getRoleId(), permissions);
				}
				
				permissions.add(rolePermission.getPermissionId());
			}
			
			updatedAtOfRolePermission = new Date();
		}
		
		calPermissionRole();
	}

	private void calPermissionRole() {
		for (Integer roleId : cachesRolePermission.keySet()) {
			Set<Integer> permissionIds = cachesRolePermission.get(roleId);
			
			for (Integer permissionId : permissionIds) {
				Set<Integer> roleIds = null;
				
				String permissionCode = cachesPermission.get(permissionId).getCode();
				
				if (cachesPermissionRole.containsKey(permissionCode)) {
					roleIds = cachesPermissionRole.get(permissionCode);
				} else {
					roleIds = new HashSet<Integer>();
					cachesPermissionRole.put(permissionCode, roleIds);
				}
				
				roleIds.add(roleId);
			}
		}
	}
	
	@Override
	public void onInsert(RoleIdentity domain) {
		if (domain != null) {
			cachesRole.put(domain.getId(), domain);
			
			updatedAtOfRole = new Date();
		}
	}

	@Override
	public void onDelete(RoleIdentity domain) {
		if (domain != null) {
			cachesRole.remove(domain.getId());
			
			updatedAtOfRole = new Date();
		}
	}

	@Override
	public void onUpdate(RoleIdentity domain) {
		if (domain != null) {
			cachesRole.put(domain.getId(), domain);
			
			updatedAtOfRole = new Date();
		}
	}

	@Override
	public void onInsert(PermissionIdentity domain) {
		if (domain != null) {
			cachesPermission.put(domain.getId(), domain);
			
			updatedAtOfPermission = new Date();
		}
	}

	@Override
	public void onDelete(PermissionIdentity domain) {
		if (domain != null) {
			cachesPermission.remove(domain.getId());
			
			updatedAtOfPermission = new Date();
		}
	}

	@Override
	public void onUpdate(PermissionIdentity domain) {
		if (domain != null) {
			cachesPermission.put(domain.getId(), domain);
			
			updatedAtOfPermission = new Date();
		}
	}

	@Override
	public void onInsert(RolePermission domain) {
		if (domain != null) {
			getPermissionsOfRole(domain.getRoleId()).add(domain.getPermissionId());
			
			updatedAtOfRolePermission = new Date();
			
			calPermissionRole();
		}
	}

	@Override
	public void onInsert(List<RolePermission> list) {
		if (list != null) {
			for (RolePermission rolePermission : list) {
				getPermissionsOfRole(rolePermission.getRoleId()).add(rolePermission.getPermissionId());
			}
			
			updatedAtOfRolePermission = new Date();
			
			calPermissionRole();
		}
	}

	@Override
	public void onDelete(RolePermission domain) {
		if (domain != null) {
			getPermissionsOfRole(domain.getRoleId()).remove(domain.getPermissionId());
			
			updatedAtOfRolePermission = new Date();
			
			calPermissionRole();
		}
	}

	@Override
	public void onDelete(List<RolePermission> list) {
		if (list != null) {
			for (RolePermission rolePermission : list) {
				getPermissionsOfRole(rolePermission.getRoleId()).remove(rolePermission.getPermissionId());
			}
			
			updatedAtOfRolePermission = new Date();
			
			calPermissionRole();
		}
	}

	@Override
	public void onClearRolePermission(Integer roleId) {
		if (cachesRolePermission.containsKey(roleId)) {
			cachesRolePermission.remove(roleId);
			
			updatedAtOfRolePermission = new Date();
			
			calPermissionRole();
		}
	}

	private Set<Integer> getPermissionsOfRole(Integer roleId) {
		Set<Integer> permissions = null;
		
		if (cachesRolePermission.containsKey(roleId)) {
			permissions = cachesRolePermission.get(roleId);
		} else {
			permissions = new HashSet<Integer>();
			cachesRolePermission.put(roleId, permissions);
		}
		
		return permissions;
	}

	@Override
	public Set<Integer> getDataAreas(Integer staffId, String permissioCode) {
		if (cachesStaffRoleDataAreas.containsKey(staffId) && cachesPermissionRole.containsKey(permissioCode)) {
			Set<Integer> roleIds = cachesPermissionRole.get(permissioCode);
			
			for (Integer roleId : roleIds) {
				if (cachesStaffRoleDataAreas.get(staffId).containsKey(roleId))
					return cachesStaffRoleDataAreas.get(staffId).get(roleId);
			}
		}
		
		return null;
	}

	@Override
	public void login(Integer staffId, List<StaffRole> staffRoles) {
		cachesStaffRoleDataAreas.remove(staffId);
		
		Map<Integer, Set<Integer>> roleDataAreas = new HashMap<Integer, Set<Integer>>();
		
		for (StaffRole staffRole : staffRoles) {
			roleDataAreas.put(staffRole.getRoleId(), StringUtils.splitStrs2IntSet(staffRole.getDataAreas()));
		}
		
		cachesStaffRoleDataAreas.put(staffId, roleDataAreas);
	}
}
