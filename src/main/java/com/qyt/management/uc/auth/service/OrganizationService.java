/**
 * 
 */
package com.qyt.management.uc.auth.service;

import java.util.List;

import com.qyt.management.cache.service.CurdCacheService;
import com.qyt.management.cache.service.CurdNotifyService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.uc.auth.domain.Organization;
import com.qyt.management.uc.auth.domain.OrganizationIdentity;

/**
 * 组织机构服务
 * 
 * @author craneding
 * @date 2015年3月1日 下午7:38:53
 * @description Copyright (c) 2015, isuwang.com All Rights Reserved.
 */
public interface OrganizationService extends CurdCacheService<OrganizationIdentity, Integer>, CurdNotifyService<OrganizationIdentity, Integer> {

	/**
	 * 获取所有的组织机构信息
	 * 
	 * @return 所有的组织机构信息
	 */
	List<Organization> getAllOrganizations();

	/**
	 * 获取所有的组织机构信息，供组件使用
	 */
	List<Organization> picker();
	
	void saveOrganization(Organization organization) throws BusinessException;
	
	void updateOrganization(Organization organization) throws BusinessException;

	void deleteOrganization(Integer id);

}
