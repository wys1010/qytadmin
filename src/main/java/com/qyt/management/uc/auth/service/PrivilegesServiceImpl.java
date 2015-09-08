package com.qyt.management.uc.auth.service;

import com.qyt.management.uc.auth.domain.*;
import com.qyt.management.uc.auth.dao.OrganizationMapper;

import com.qyt.management.uc.auth.service.*;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qyt.management.cache.service.impl.PermissionCurdNotifyServiceImpl;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.exception.NotLoginException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.uc.auth.dao.PrivilegesMapper;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.domain.Staff;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 权限服务
 * 
 * @author caiwb
 */
@Transactional
@Service
public class PrivilegesServiceImpl extends PermissionCurdNotifyServiceImpl implements com.qyt.management.uc.auth.service.PrivilegesService {

    @Autowired
    private PrivilegesMapper privilegesMapper;

    @Autowired
    private OrganizationMapper organizationMapper;


    @Override
    public List<Role> selectRoles() {
        return privilegesMapper.selectRoles();
    }

    @Override
    public Role selectRoleById(Integer roleId) {
        return privilegesMapper.selectRoleById(roleId);
    }

    private void beforeSaveRole(Role role) {
    	role.setName(StringUtils.trimToEmpty(role.getName()));
    	role.setRemark(StringUtils.trimToEmpty(role.getRemark()));
        role.setCode(StringUtils.trimToEmpty(role.getCode()));
    }

    @Override
    @Transactional(noRollbackForClassName = "com.kuaisu.platform.exception.BusinessException")
    public void updateRole(Role role) throws BusinessException {
        beforeSaveRole(role);

        Role conflictRole = this.privilegesMapper.selectRoleByName(role.getName());
        if(null != conflictRole
                && conflictRole.getName().equals(role.getName())
                && !conflictRole.getId().equals(role.getId())){
            throw new BusinessException("角色名重复！");
        }

        role.setUpdatedBy(User.getCurrentUser().getId());
        privilegesMapper.updateRole(role);
        
        notifyUpdate(fromRole(role));
    }

    @Override
    public void deleteRole(Integer id) {
        privilegesMapper.deleteAllPermissionsOfRole(id);
        privilegesMapper.deleteAllStaffsOfRole(id);
        privilegesMapper.deleteRole(id);
        
        notifyDelete(fromRole(id));
    }

    @Override
    @Transactional(noRollbackForClassName = "com.kuaisu.platform.exception.BusinessException")
    public void insertRole(Role group) throws BusinessException {
        Role role = this.privilegesMapper.selectRoleByName(group.getName());
        if(null != role){
            throw new BusinessException("角色名重复！");
        }

        group.setCreatedBy(User.getCurrentUser().getId());
        group.setUpdatedBy(User.getCurrentUser().getId());
        privilegesMapper.insertRole(group);
        
        notifyInsert(fromRole(group));
    }

    @Override
    public void batchInsertStaffsOfRole(List<Integer> staffIds, Integer roleId) {
        privilegesMapper.batchInsertStaffsOfRole(staffIds, roleId);
    }

    @Override
    public void batchDeleteStaffsOfRole(List<Integer> staffIds, Integer roleId) {
        privilegesMapper.batchDeleteStaffsOfRole(staffIds, roleId);
    }

    @Override
    public void selectStaffsOfRole(PagingBean<Staff> pb, Integer roleId) {
        List<Staff> staffs = privilegesMapper.selectStaffsOfRole(pb.getCondition(), roleId, pb.getStart(), pb.getLimit());
        int count = privilegesMapper.selectStaffsCountOfRole(pb.getCondition(), roleId);
        
        pb.setResults(count);
        pb.setRows(staffs);
    }

    private boolean isSubOrg(Integer targetId,Organization subOrg,Map<Integer,Organization> maps){
        boolean result = false;
        Integer pId = subOrg.getParentId();
        if(null == pId){
            return false;
        }else if(targetId.equals(pId)){
            return true;
        }
        return isSubOrg(targetId,maps.get(pId),maps);
    }

    @Override
    public void selectStaffsNotInRole(PagingBean<Staff> pb, Integer roleId){

        Integer orgId = null;
        List<Organization> orgs = null;
        Map<Integer,Organization> maps = new HashMap<>();
        List<Integer> subIds = new ArrayList<>();

        if(null != pb.getCondition()){
            orgId = pb.getCondition().getOrgId();
        }

        /**
         * 组织机构为空，查询所有
         */
        if(null == orgId){
            List<Staff> staffs = privilegesMapper.selectStaffsNotInRole4Root(pb.getCondition(), roleId, pb.getStart(), pb.getLimit());
            int count = privilegesMapper.selectStaffsCountNotInRole4Root(pb.getCondition(), roleId);

            pb.setResults(count);
            pb.setRows(staffs);
            return;
        }

        orgs = organizationMapper.selectAllEntities();


        if(null != orgs && orgs.size() > 0){

            if(orgId != null) {
                for (int i = 0; i < orgs.size(); i++) {
                    Organization org = orgs.get(i);
                    maps.put(org.getId(), org);
                }
                for (int i = 0; i < orgs.size(); i++) {
                    Organization org = orgs.get(i);
                    if (isSubOrg(orgId, org, maps)) {
                        subIds.add(org.getId());
                    }
                }
            }else{
                for (int i = 0; i < orgs.size(); i++) {
                    Organization org = orgs.get(i);
                    subIds.add(org.getId());
                }
            }
        }

        /**
         * 组织机构为叶子节点
         */
        if(subIds.size() < 1){
            List<Staff> staffs = privilegesMapper.selectStaffsNotInRole4Leaf(pb.getCondition(), roleId, pb.getStart(), orgId, pb.getLimit());
            int count = privilegesMapper.selectStaffsCountNotInRole4Leaf(pb.getCondition(), orgId, roleId);

            pb.setResults(count);
            pb.setRows(staffs);
            return;
        }


        List<Staff> staffs = privilegesMapper.selectStaffsNotInRole(pb.getCondition(), roleId, pb.getStart(), subIds, pb.getLimit());
        int count = privilegesMapper.selectStaffsCountNotInRole(pb.getCondition(),subIds, roleId);

        pb.setResults(count);
        pb.setRows(staffs);
    }


    @Override
    public void batchUpdateRolePermissions(String permissions, Integer roleId) {
        privilegesMapper.deleteAllPermissionsOfRole(roleId);
        
        notifyClearRolePermission(roleId);
        
        List<RolePermission> list = new ArrayList<RolePermission>();
        permissions = StringUtils.trimToNull(permissions);
        
        if (null == permissions) {
            return;
        }
        
        String[] permissionArr = permissions.split(",");
        
        for(String permission : permissionArr){
            RolePermission rolePermission = new RolePermission();
            rolePermission.setRoleId(roleId);
            rolePermission.setPermissionId(Integer.valueOf(permission));
            list.add(rolePermission);
        }
        
        privilegesMapper.batchInsertRolePermissions(list);
        
        notifyInsert(list);
    }

    @Override
    public List<Permission> selectAllPermissions() {
        return privilegesMapper.selectAllPermissions();
    }

    @Override
    public List<Integer> selectPermissionOfRole(Integer groupId) {
        return this.privilegesMapper.selectPermissionsOfRole(groupId);
    }

    @Override
    public List<Menu> selectMenusOfCurrStaff() throws NotLoginException, BusinessException {
        User user = User.getCurrentUser();
        if (user == null) {
            throw new NotLoginException();
        }
        
        return this.privilegesMapper.selectAllMenusOfStaff(user.getId());
    }

    @Override
    public List<Permission> selectAllPermissionsOfCurrStaff() throws NotLoginException, BusinessException {
        User user = User.getCurrentUser();
        if (user == null) {
            throw  new NotLoginException();
        }
        
        return this.privilegesMapper.selectAllPermissionsOfStaff(user.getId());
    }
	
	private RoleIdentity fromRole(Role dto) {
		RoleIdentity identity = new RoleIdentity();
    	
    	identity.setId(dto.getId());
    	identity.setName(dto.getName());
    	identity.setCode(dto.getCode());
    	identity.setDataAreas(dto.getDataAreas());
    	
    	return identity;
    }
	
	private RoleIdentity fromRole(Integer id) {
		RoleIdentity identity = new RoleIdentity();
    	
    	identity.setId(id);

    	return identity;
    }
	
	private PermissionIdentity fromPermission(Permission dto) {
		PermissionIdentity identity = new PermissionIdentity();
    	
    	identity.setId(dto.getId());
    	identity.setName(dto.getName());
    	identity.setCode(dto.getCode());
    	
    	return identity;
    }

	@Override
	public RoleIdentity selectRoleIdentityById(Integer roleId) {
		return privilegesMapper.selectRoleIdentityById(roleId);
	}

	@Override
	public List<RoleIdentity> selectRoleIdentities() {
		return privilegesMapper.selectRoleIdentities();
	}

	@Override
	public PermissionIdentity selectPermissionIdentityById(Integer permissionId) {
		return privilegesMapper.selectPermissionIdentityById(permissionId);
	}

	@Override
	public List<PermissionIdentity> selectPermissionIdentities() {
		return privilegesMapper.selectPermissionIdentities();
	}

	@Override
	public List<RolePermission> selectRolePermissionIdentityById(Integer roleId) {
		return privilegesMapper.selectRolePermissionIdentityById(roleId);
	}

	@Override
	public List<RolePermission> selectRolePermissionIdentities() {
		return privilegesMapper.selectRolePermissionIdentities();
	}


    @Override
    public List<Role> pickerRoles() {

        return null;
    }

}
