package com.qyt.management.uc.auth.ctrl;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.qyt.management.platform.exception.FormatException;
import com.qyt.management.platform.helper.ParameterHelper;
import com.qyt.management.uc.auth.domain.Organization;
import com.qyt.management.uc.user.domain.Staff;
import com.qyt.management.uc.user.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.uc.auth.service.OrganizationService;
import com.qyt.management.uc.user.domain.User;

/**
 * 组织机构控制器
 * 
 * @author craneding
 * @date 2015年3月1日 下午7:27:35
 * @description Copyright (c) 2015, isuwang.com All Rights Reserved.
 */
@Controller
@RequestMapping(value = {"uc/orgs", "platform/orgs"})
public class OrganizationController {
	@Autowired
	private OrganizationService orgService;
	@Autowired
	private StaffService staffService;

	@RequestMapping(value = "index", method = RequestMethod.GET)
	public String index(HttpServletRequest request) throws Exception {
		return "uc/orgs/index_orgs";
	}

	@RequestMapping(value = "allOrganizations", method = RequestMethod.GET)
    @ResponseBody
    public List<Organization> allOrgs() {
		final List<Organization> organizations = orgService.getAllOrganizations();
		
		for (Organization organization : organizations) {
			if(organization.getCreatedBy() != null) {
				Staff staff = staffService.selectEntityById(organization.getCreatedBy());

				if(staff != null)
					organization.setCreatedByName(staff.getName());
			}

			if(organization.getUpdatedBy() != null) {
				Staff staff = staffService.selectEntityById(organization.getUpdatedBy());

				if(staff != null)
					organization.setCreatedByName(staff.getName());
			}
		}

		return organizations;
	}
	
	@Secured({"ROLE_UC_ORGS_UPDATE"})
	@RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
	public Organization addOrganization(Organization organization) throws BusinessException {
		User currUser = User.getCurrentUser();

		organization.setCreatedBy(currUser.getId());
		organization.setUpdatedBy(currUser.getId());

		orgService.saveOrganization(organization);
		
		return organization;
	}

	@Secured({"ROLE_UC_ORGS_UPDATE"})
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	public Organization updateOrganization(Organization organization) throws BusinessException {
		User currUser = User.getCurrentUser();

		organization.setUpdatedBy(currUser.getId());

		orgService.updateOrganization(organization);

		return organization;
	}

	@Secured({"ROLE_UC_ORGS_UPDATE"})
	@RequestMapping(value = "delete/{id}",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteOrganization(@PathVariable Integer id) throws BusinessException {
		PagingBean<Staff> pb = new PagingBean<>();
		Staff staff = new Staff();
		staff.setOrgId(id);
		pb.setCondition(staff);
		staffService.selectEntitiesEx(pb);
		if(pb.getRows().size() > 0){
			throw new BusinessException("此部门下存在员工,无法删除!");
		}

		List<Organization> organizationList = orgService.getAllOrganizations();
		for (Organization organization : organizationList) {
			if(organization.getParentId() == id){
				throw new BusinessException("此部门下存在子部门,无法删除!");
			}
		}

		orgService.deleteOrganization(id);
	}

	@RequestMapping(value = "queryStaffs",method = RequestMethod.GET)
	@ResponseBody
	public PagingBean<Staff> queryStaffsByOrgId(PagingBean<Staff> pb, Staff staff) throws InvocationTargetException, NoSuchMethodException, FormatException, UnsupportedEncodingException, IllegalAccessException {
		ParameterHelper.trimToNullAndEncodeStringFields(staff,true);
		pb.setCondition(staff);
		
		staffService.selectEntitiesEx(pb);

		return pb;
	}

	@ResponseBody
	@RequestMapping(value="picker", method = RequestMethod.GET)
	public List<Organization> picker(){
		return orgService.picker();
	}
}
