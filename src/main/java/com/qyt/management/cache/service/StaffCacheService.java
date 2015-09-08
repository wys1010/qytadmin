package com.qyt.management.cache.service;

import java.util.Set;

import com.qyt.management.uc.user.domain.StaffIdentity;

/**
 * 员工信息缓存服务
 * 
 * @author caiwb
 */
public interface StaffCacheService extends CacheService<StaffIdentity, Integer> {
	
	public StaffIdentity getIdentity(String name);
    
	public String getName(Integer id);
	
    public String getNames(String ids);
    
    /**
	 * 取部门直属员工
	 * */
	public Set<Integer> getStaffs(Integer organizationId);
	
	/**
	 * 取下属所辖的所有员工
	 * */
	public Set<Integer> getDescendantStaffs(Integer organizationId);
	
	/**
	 * 取部门直属员工负责的区域并集
	 * */
	public Set<String> getStaffDistricts(Integer organizationId);
	
	/**
	 * 取下属所辖的所有员工负责的区域并集
	 * */
	public Set<String> getDescendantStaffDistricts(Integer organizationId);
	
	/**
	 * 取部门直属员工负责的采购产品线并集
	 * */
	public Set<String> getStaffPurchaseCategoryGroups(Integer organizationId);
	
	/**
	 * 取下属所辖的所有员工负责的采购产品线并集
	 * */
	public Set<String> getDescendantStaffPurchaseCategoryGroups(Integer organizationId);
	
	/**
	 * 取部门直属员工负责的销售产品线并集
	 * */
	public Set<String> getStaffSellCategoryGroups(Integer organizationId);
	
	/**
	 * 取下属所辖的所有员工负责的销售产品线并集
	 * */
	public Set<String> getDescendantStaffSellCategoryGroups(Integer organizationId);
}
