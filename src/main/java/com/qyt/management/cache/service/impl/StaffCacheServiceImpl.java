package com.qyt.management.cache.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qyt.management.cache.service.CurdCacheService;
import com.qyt.management.cache.service.CurdNotifyService;
import com.qyt.management.cache.service.OrganizationCacheService;
import com.qyt.management.cache.service.StaffCacheService;
import com.qyt.management.platform.util.StringUtils;
import com.qyt.management.uc.user.domain.StaffIdentity;
import com.qyt.management.uc.user.service.StaffService;

/**
 * 员工信息缓存服务
 * 
 * @author caiwb
 */
@Service
public class StaffCacheServiceImpl extends BaseCacheServiceImpl<StaffIdentity, Integer> implements StaffCacheService {

	@Autowired
	private StaffService staffService;
	
	@Autowired
	private OrganizationCacheService organizationCacheService;
	
	private static Map<Integer, StaffIdentity> caches = new HashMap<Integer, StaffIdentity>();
	private static Map<String, StaffIdentity> cachesByName = new HashMap<String, StaffIdentity>();
	
	/**
	 * <OrganizationId, <StaffId>>
	 * */
	private static Map<Integer, Set<Integer>> cachesStaffs = new HashMap<Integer, Set<Integer>>();
	
	/**
	 * <OrganizationId, <DescendantStaffId>>
	 * */
	private static Map<Integer, Set<Integer>> cachesDescendantStaffs = new HashMap<Integer, Set<Integer>>();
	
	/**
	 * <OrganizationId, <StaffDistrict>>
	 * */
	private static Map<Integer, Set<String>> cachesStaffDistricts = new HashMap<Integer, Set<String>>();
	
	/**
	 * <OrganizationId, <DescendantStaffDistrict>>
	 * */
	private static Map<Integer, Set<String>> cachesDescendantStaffDistricts = new HashMap<Integer, Set<String>>();
	
	/**
	 * <OrganizationId, <StaffPurchaseCategoryGroup>>
	 * */
	private static Map<Integer, Set<String>> cachesStaffPurchaseCategoryGroups = new HashMap<Integer, Set<String>>();
	
	/**
	 * <OrganizationId, <DescendantStaffPurchaseCategoryGroup>>
	 * */
	private static Map<Integer, Set<String>> cachesDescendantStaffPurchaseCategoryGroups = new HashMap<Integer, Set<String>>();
	
	/**
	 * <OrganizationId, <StaffSellCategoryGroup>>
	 * */
	private static Map<Integer, Set<String>> cachesStaffSellCategoryGroups = new HashMap<Integer, Set<String>>();
	
	/**
	 * <OrganizationId, <DescendantStaffSellCategoryGroup>>
	 * */
	private static Map<Integer, Set<String>> cachesDescendantStaffSellCategoryGroups = new HashMap<Integer, Set<String>>();
	
	@Override
	protected void onReload(List<StaffIdentity> list) {
		super.onReload(list);
		
		if (list != null && list.size() > 0) {					
			for (StaffIdentity staffIdentity : list) {				
				cachesByName.put(staffIdentity.getName(), staffIdentity);
			}						
		}
		
		calCaches(list);
	}

	@Override
	protected void onChange() {
		super.onChange();
		
		List<StaffIdentity> list = new ArrayList<StaffIdentity>();
		list.addAll(caches.values());
		
		onReload(list);
	}
	
	@Override
	public String getNames(String ids) {
		if (StringUtils.isEmptyByTrim(ids))
			return "";
		
		String[] idArray = ids.split(",");
		
		StringBuffer buffer = new StringBuffer();
		for (String id : idArray) {
			if (buffer.length() > 0)
				buffer.append(",").append(getName(Integer.parseInt(id)));
			else
				buffer.append(getName(Integer.parseInt(id)));
		}
		
		return buffer.toString();
	}

	@Override
	public String getName(Integer id) {
		StaffIdentity identity = getIdentity(id);
		
		if (identity != null)
			return identity.getName();
		
		return null;
	}

	@Override
	public StaffIdentity getIdentity(String name) {
		return cachesByName.get(name);
	}
	
	@Override
	protected CurdCacheService<StaffIdentity, Integer> curdCacheService() {
		return staffService;
	}

	@Override
	protected CurdNotifyService<StaffIdentity, Integer> curdNotifyService() {
		return staffService;
	}

	@Override
	protected Map<Integer, StaffIdentity> caches() {
		return caches;
	}

	@Override
	protected Map<Integer, StaffIdentity> newCaches() {
		return new HashMap<Integer, StaffIdentity>();
	}
	
	private void calCaches(List<StaffIdentity> list) {
		if (list != null && list.size() > 0) {
			initCaches();

			initCachesStaffs(list);
			
			initCachesDescendantStaffs();
			
			calStaffCaches();
			
			calDescendantStaffCaches();
		}
	}
	
	private void initCaches() {
		cachesStaffs.clear();
		cachesDescendantStaffs.clear();
		
		cachesStaffDistricts.clear();
		cachesDescendantStaffDistricts.clear();
		
		cachesStaffPurchaseCategoryGroups.clear();
		cachesDescendantStaffPurchaseCategoryGroups.clear();
		
		cachesStaffSellCategoryGroups.clear();
		cachesDescendantStaffSellCategoryGroups.clear();
		
		for (Integer organizationId : organizationCacheService.getOrganizations()) {
			cachesStaffs.put(organizationId, new HashSet<Integer>());
			cachesDescendantStaffs.put(organizationId, new HashSet<Integer>());
			
			cachesStaffDistricts.put(organizationId, new HashSet<String>());
			cachesDescendantStaffDistricts.put(organizationId, new HashSet<String>());
			
			cachesStaffPurchaseCategoryGroups.put(organizationId, new HashSet<String>());
			cachesDescendantStaffPurchaseCategoryGroups.put(organizationId, new HashSet<String>());
			
			cachesStaffSellCategoryGroups.put(organizationId, new HashSet<String>());
			cachesDescendantStaffSellCategoryGroups.put(organizationId, new HashSet<String>());
		}
	}
	
	private void initCachesStaffs(List<StaffIdentity> list) {
		for (StaffIdentity identity : list) {
			if (identity.getOrgId() != null) {
				Set<Integer> staffs = null;
				
				if (cachesStaffs.containsKey(identity.getOrgId())) {
					staffs = cachesStaffs.get(identity.getOrgId());
				} else {
					staffs = new HashSet<Integer>();
					cachesStaffs.put(identity.getOrgId(), staffs);
				}
				
				staffs.add(identity.getId());
			}
		}
	}
	
	private void initCachesDescendantStaffs() {
		for (Integer organizationId : organizationCacheService.getOrganizations()) {
			Set<Integer> staffs = null;
			
			if (cachesDescendantStaffs.containsKey(organizationId)) {
				staffs = cachesDescendantStaffs.get(organizationId);
			} else {
				staffs = new HashSet<Integer>();
				cachesDescendantStaffs.put(organizationId, staffs);
			}
			
			staffs.addAll(cachesStaffs.get(organizationId));
			
			Set<Integer> sonOrganizations = organizationCacheService.getDescendantOrganizations(organizationId);
			for (Integer sonOrganizationId : sonOrganizations) {
				staffs.addAll(cachesStaffs.get(sonOrganizationId));
			}
		}
	}
	
	private void calStaffCaches() {
		for (Integer organizationId : cachesStaffs.keySet()) {
			for (Integer staffId : cachesStaffs.get(organizationId)) {
				StaffIdentity staffIdentity = getIdentity(staffId);
				
				cachesStaffDistricts.get(organizationId).addAll(staffIdentity.getDistrictSet());
				cachesStaffPurchaseCategoryGroups.get(organizationId).addAll(staffIdentity.getPurchaseCategoryGroupSet());
				cachesStaffSellCategoryGroups.get(organizationId).addAll(staffIdentity.getSellCategoryGroupSet());
			}
		}
	}
	
	private void calDescendantStaffCaches() {
		for (Integer organizationId : cachesDescendantStaffs.keySet()) {
			for (Integer staffId : cachesDescendantStaffs.get(organizationId)) {
				StaffIdentity staffIdentity = getIdentity(staffId);
				
				cachesDescendantStaffDistricts.get(organizationId).addAll(staffIdentity.getDistrictSet());
				cachesDescendantStaffPurchaseCategoryGroups.get(organizationId).addAll(staffIdentity.getPurchaseCategoryGroupSet());
				cachesDescendantStaffSellCategoryGroups.get(organizationId).addAll(staffIdentity.getSellCategoryGroupSet());
			}
		}
	}
	
	@Override
	public Set<Integer> getStaffs(Integer organizationId) {
		return cachesStaffs.get(organizationId);
	}
	
	@Override
	public Set<Integer> getDescendantStaffs(Integer organizationId) {
		return cachesDescendantStaffs.get(organizationId);
	}
	
	@Override
	public Set<String> getStaffDistricts(Integer organizationId) {
		return cachesStaffDistricts.get(organizationId);
	}

	@Override
	public Set<String> getDescendantStaffDistricts(Integer organizationId) {
		return cachesDescendantStaffDistricts.get(organizationId);
	}

	@Override
	public Set<String> getStaffPurchaseCategoryGroups(Integer organizationId) {
		return cachesStaffPurchaseCategoryGroups.get(organizationId);
	}

	@Override
	public Set<String> getDescendantStaffPurchaseCategoryGroups(
			Integer organizationId) {
		return cachesDescendantStaffPurchaseCategoryGroups.get(organizationId);
	}

	@Override
	public Set<String> getStaffSellCategoryGroups(Integer organizationId) {
		return cachesStaffSellCategoryGroups.get(organizationId);
	}

	@Override
	public Set<String> getDescendantStaffSellCategoryGroups(
			Integer organizationId) {
		return cachesDescendantStaffSellCategoryGroups.get(organizationId);
	}
}
