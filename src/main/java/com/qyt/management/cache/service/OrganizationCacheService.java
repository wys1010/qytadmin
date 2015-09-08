package com.qyt.management.cache.service;

import java.util.Set;

import com.qyt.management.uc.auth.domain.OrganizationIdentity;

/**
 * 组织机构信息缓存服务
 * 
 * @author caiwb
 */
public interface OrganizationCacheService extends CacheService<OrganizationIdentity, Integer> {
	    
	public String getName(Integer id);
	
	public Set<Integer> getOrganizations();
	
	/**
	 * 取直属的所有部门ID
	 * */
	public Set<Integer> getSonOrganizations(Integer organizationId);
	
	/**
	 * 取下属所辖的所有部门ID
	 * */
	public Set<Integer> getDescendantOrganizations(Integer organizationId);
	
}
