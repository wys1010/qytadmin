package com.qyt.management.uc.user.service;

import com.qyt.management.cache.service.impl.BaseCurdNotifyServiceImpl;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.helper.MD5Helper;
import com.qyt.management.platform.util.StringUtils;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.uc.auth.dao.PrivilegesMapper;
import com.qyt.management.uc.user.domain.Staff;
import com.qyt.management.uc.user.dao.StaffMapper;
import com.qyt.management.uc.user.domain.StaffIdentity;
import com.qyt.management.uc.user.domain.User;

import com.qyt.management.uc.user.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Xandy on 2015/2/27.
 */
@Service
@Transactional
public class StaffServiceImpl extends BaseCurdNotifyServiceImpl<StaffIdentity, Integer> implements com.qyt.management.uc.user.service.StaffService {

    @Autowired
    StaffMapper staffMapper;

    @Autowired
    PrivilegesMapper privilegesMapper;

    private final static String DefaultPassword = "123456";
    
    private final static String other = "other";
    private final static String Other = "Other";

    @Override
    public void updateEntity(Staff dto) throws BusinessException {
    	dto.setUpdatedBy(User.getCurrentUser().getId());
    	
        staffMapper.updateEntity(dto);
        privilegesMapper.deleteRolesOfStaff(dto.getId());
        saveStaffRoleInfo(dto);
        notifyUpdate(fromStaff(dto));
    }

    @Override
    public void insertEntity(Staff dto) throws BusinessException {
        dto.setCreatedBy(User.getCurrentLoginUser().getUserId());
        dto.setUpdatedBy(User.getCurrentLoginUser().getUserId());

        if (dto.getEnglishName() == null)
            dto.setEnglishName("");

        if (dto.getEmail() == null)
            dto.setEmail("");

        if (dto.getPhone() == null)
            dto.setPhone("");

        if (dto.getWechat() == null)
            dto.setWechat("");

        if (dto.getEmail() == null)
            dto.setEmail("");

        if (dto.getQq() == null)
            dto.setQq("");

        if (dto.getDistricts() == null)
            dto.setDistricts("");

        if (dto.getRemark() == null)
            dto.setRemark("");

        if (dto.getPurchaseCategoryGroups() == null)
            dto.setPurchaseCategoryGroups("");

        if (dto.getSellCategoryGroups() == null)
            dto.setSellCategoryGroups("");

        dto.setPassword(MD5Helper.encode(DefaultPassword));

        staffMapper.insertEntity(dto);

        saveStaffRoleInfo(dto);


        notifyInsert(fromStaff(dto));
    }

    private void saveStaffRoleInfo(Staff dto) {
        String roleIds = dto.getRoleIds();
        if(StringUtils.isNotEmptyByTrim(roleIds)){
            List<Integer> roleIdList = new ArrayList<Integer>();
            if(roleIds.contains(",")){
                for (String roleId : roleIds.split(",")) {
                    roleIdList.add(Integer.valueOf(roleId));
                }
            }else {
                roleIdList.add(Integer.valueOf(roleIds));
            }
            privilegesMapper.insertStaffMultiRoles(dto.getId(),roleIdList);
        }
    }

    @Override
    public void deleteEntity(Integer id) {
    	notifyDelete(id);
    }

    @Override
    public void selectEntities(PagingBean<Staff> pb) {
        List<Staff> staffs = staffMapper.selectEntities(pb);
        int count = staffMapper.selectEntitiesCount(pb);

        pb.setResults(count);
        pb.setRows(staffs);
    }

    @Override
    public Staff selectEntityById(Integer id) {
        return staffMapper.selectEntityById(id);
    }

    @Override
    public List<Staff> selectAllEntities() {
        return staffMapper.selectAllEntities();
    }

    @Override
    public List<Staff> picker() {
        return staffMapper.picker();
    }

    @Override
    public void selectEntitiesEx(PagingBean<Staff> pb) {
        List<Staff> staffs = staffMapper.selectEntitiesEx(pb);
        int count = staffMapper.selectEntitiesCount(pb);

        pb.setResults(count);
        pb.setRows(staffs);
    }

    @Override
    public Staff selectEntityByIdEx(int id) {
        return staffMapper.selectEntityByIdEx(id);
    }

    @Override
    public Staff selectByLoginName(String loginName) {
        return staffMapper.selectByLoginName(loginName);
    }

    @Override
    public void resetPassword(Staff staff) {
        staff.setPassword(MD5Helper.encode(DefaultPassword));

        staffMapper.resetPassword(staff);
    }

    @Override
    public void transferCustomer(Integer oldStaffId, Integer transferStaffId) {
        //staffMapper.transferCustomer(oldStaffId, transferStaffId);
    }

	@Override
	public StaffIdentity selectIdentityById(Integer id) {
		StaffIdentity staffIdentity = staffMapper.selectIdentityById(id);
		
		return filter(staffIdentity);
	}

	@Override
	public List<StaffIdentity> selectIdentities() {
		List<StaffIdentity> list =  staffMapper.selectIdentities();
		
		if (list != null && list.size() > 0) {
			for (StaffIdentity staffIdentity : list) {
				filter(staffIdentity);
			}
		}
		
		return list;
	}

	private StaffIdentity filter(StaffIdentity staffIdentity) {
		if (staffIdentity != null) {
			staffIdentity.setDistrictSet(StringUtils.splitStrs2Set(staffIdentity.getDistricts()));
			staffIdentity.setPurchaseCategoryGroupSet(StringUtils.splitStrs2Set(staffIdentity.getPurchaseCategoryGroups()));
			staffIdentity.setSellCategoryGroupSet(StringUtils.splitStrs2Set(staffIdentity.getSellCategoryGroups()));
		
			if (staffIdentity.getPurchaseCategoryGroupSet().contains(other)) {
				staffIdentity.getPurchaseCategoryGroupSet().remove(other);
				staffIdentity.getPurchaseCategoryGroupSet().add(Other);
			}
			
			if (staffIdentity.getSellCategoryGroupSet().contains(other)) {
				staffIdentity.getSellCategoryGroupSet().remove(other);
				staffIdentity.getSellCategoryGroupSet().add(Other);
			}
		}
			
		return staffIdentity;
	}
	
    @Override
    public void batchUpdateEntites(List<Staff> staffs) throws BusinessException {
        for (Staff staff : staffs) {
        	staff.setUpdatedBy(User.getCurrentUser().getId());
        	
            staffMapper.updateEntity(staff);
            privilegesMapper.deleteRolesOfStaff(staff.getId());
            saveStaffRoleInfo(staff);
        }
    }

    public void deleteStaffInOrgs(String ids){
        List<String> idList = new ArrayList<>();
        if (StringUtils.isNotEmptyByTrim(ids)){
            if(ids.contains(",")){
                idList = Arrays.asList(ids.split(","));
            }else {
                idList.add(ids);
            }
            staffMapper.deleteStaffInOrgs(idList);
        }
    }

    @Override
    public void updatePassword(Staff staff) throws BusinessException {
    	staff.setUpdatedBy(User.getCurrentUser().getId());
    	
        staffMapper.updateEntity(staff);
    }

    private StaffIdentity fromStaff(Staff dto) {
    	StaffIdentity identity = new StaffIdentity();
    	
    	identity.setId(dto.getId());
    	identity.setName(dto.getName());
    	identity.setOrgId(dto.getOrgId());
    	identity.setManager(dto.getManager() == 1);
    	identity.setDistricts(dto.getDistricts());
    	identity.setDistrictSet(StringUtils.splitStrs2Set(dto.getDistricts()));
    	identity.setPurchaseCategoryGroups(dto.getPurchaseCategoryGroups());
    	identity.setPurchaseCategoryGroupSet(StringUtils.splitStrs2Set(dto.getPurchaseCategoryGroups()));
    	identity.setSellCategoryGroups(dto.getSellCategoryGroups());
    	identity.setSellCategoryGroupSet(StringUtils.splitStrs2Set(dto.getSellCategoryGroups()));
    	
    	if (identity.getPurchaseCategoryGroupSet().contains(other)) {
    		identity.getPurchaseCategoryGroupSet().remove(other);
    		identity.getPurchaseCategoryGroupSet().add(Other);
		}
		
		if (identity.getSellCategoryGroupSet().contains(other)) {
			identity.getSellCategoryGroupSet().remove(other);
			identity.getSellCategoryGroupSet().add(Other);
		}
		
    	return identity;
    }
    
}
