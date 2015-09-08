/**
 * 
 */
package com.qyt.management.uc.auth.service;

import java.util.List;

import com.qyt.management.uc.auth.dao.OrganizationMapper;
import com.qyt.management.uc.auth.domain.Organization;
import com.qyt.management.uc.auth.domain.OrganizationIdentity;
import com.qyt.management.uc.auth.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qyt.management.cache.service.impl.BaseCurdNotifyServiceImpl;
import com.qyt.management.platform.exception.BusinessException;

/**
 * 组织机构服务实现
 * 
 * @author craneding
 * @date 2015年3月1日 下午7:40:47
 * @description Copyright (c) 2015, isuwang.com All Rights Reserved.
 */
@Service
@Transactional
public class OrganizationServiceImpl extends BaseCurdNotifyServiceImpl<OrganizationIdentity, Integer> implements com.qyt.management.uc.auth.service.OrganizationService {

	@Autowired
	private OrganizationMapper organizationMapper;

	@Override
	public List<Organization> getAllOrganizations() {
		return organizationMapper.selectAllEntities();
	}

	@Override
	public List<Organization> picker() {
		return organizationMapper.picker();
	}

	@Override
	public void saveOrganization(Organization organization) throws BusinessException {
		organizationMapper.insertEntity(organization);
		
		notifyInsert(fromOrganization(organization));
	}

	@Override
	public void updateOrganization(Organization organization) throws BusinessException {
		organizationMapper.updateEntity(organization);
		
		notifyUpdate(fromOrganization(organization));
	}

	@Override
	public void deleteOrganization(Integer id) {
		organizationMapper.deleteEntity(id);
		
		notifyDelete(id);
	}

	@Override
	public OrganizationIdentity selectIdentityById(Integer id) {
		return organizationMapper.selectIdentityById(id);
	}

	@Override
	public List<OrganizationIdentity> selectIdentities() {
		return organizationMapper.selectIdentities();
	}
	
	private OrganizationIdentity fromOrganization(Organization dto) {
		OrganizationIdentity identity = new OrganizationIdentity();
    	
    	identity.setId(dto.getId());
    	identity.setParentId(dto.getParentId());
    	identity.setName(dto.getName());
    	
    	return identity;
    }
}
