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
import com.qyt.management.uc.auth.domain.OrganizationIdentity;
import com.qyt.management.uc.auth.service.OrganizationService;

/**
 * 组织机构信息缓存服务
 * 
 * @author caiwb
 */
@Service
public class OrganizationCacheServiceImpl extends BaseCacheServiceImpl<OrganizationIdentity, Integer> implements OrganizationCacheService {

	@Autowired
	private OrganizationService organizationService;
	
	private static Map<Integer, OrganizationIdentity> caches = new HashMap<Integer, OrganizationIdentity>();
	
	/**
	 * <FatherOrganizationId, <SonOrganizationId>>
	 * */
	private static Map<Integer, Set<Integer>> cachesSonOrganizations = new HashMap<Integer, Set<Integer>>();
	
	/**
	 * <FatherOrganizationId, <DescendantOrganizationId>>
	 * */
	private static Map<Integer, Set<Integer>> cachesDescendantOrganizations = new HashMap<Integer, Set<Integer>>();
	
	@Override
	protected void onReload(List<OrganizationIdentity> list) {
		super.onReload(list);
		
		if (list != null && list.size() > 0) {
			cachesSonOrganizations.clear();
			
			for (OrganizationIdentity identity : list) {		
				if (!cachesSonOrganizations.containsKey(identity.getId())) {
					Set<Integer> sonSet = new HashSet<Integer>();
					cachesSonOrganizations.put(identity.getId(), sonSet);
				}
				
				if (!cachesDescendantOrganizations.containsKey(identity.getId())) {
					Set<Integer> descendantSet = new HashSet<Integer>();
					cachesDescendantOrganizations.put(identity.getId(), descendantSet);
				}
				
				if (identity.getParentId() != null) {
					Set<Integer> faterSet = null;
					
					if (cachesSonOrganizations.containsKey(identity.getParentId())) {
						faterSet = cachesSonOrganizations.get(identity.getParentId());
					} else {
						faterSet = new HashSet<Integer>();
						cachesSonOrganizations.put(identity.getParentId(), faterSet);
					}
					
					faterSet.add(identity.getId());
				}
			}
			
			for (Integer key : cachesSonOrganizations.keySet()) {
				Set<Integer> sonOrganizations = cachesSonOrganizations.get(key);
				
				Set<Integer> descendantOrganizations = cachesDescendantOrganizations.get(key);
				descendantOrganizations.addAll(sonOrganizations);
				
				for (Integer sonOrganizationId : sonOrganizations) {
					loopDescendantOrganizations(sonOrganizationId, descendantOrganizations);
				}
			}
		}
	}
	
	private void loopDescendantOrganizations(Integer sonOrganizationId, Set<Integer> descendantOrganizations) {
		Set<Integer> sonSonOrganizations = cachesSonOrganizations.get(sonOrganizationId);
		descendantOrganizations.addAll(sonSonOrganizations);
		
		for (Integer sonSonOrganizationId : sonSonOrganizations) {
			loopDescendantOrganizations(sonSonOrganizationId, descendantOrganizations);
		}
	}
	
	@Override
	protected void onChange() {
		super.onChange();
		
		List<OrganizationIdentity> list = new ArrayList<OrganizationIdentity>();
		list.addAll(caches.values());
		
		onReload(list);
	}
	
	@Override
	public String getName(Integer id) {
		OrganizationIdentity identity = getIdentity(id);
		
		if (identity != null)
			return identity.getName();
		
		return null;
	}

	@Override
	public Set<Integer> getOrganizations() {
		return caches.keySet();
	}
	
	@Override
	public Set<Integer> getSonOrganizations(Integer organizationId) {
		return cachesSonOrganizations.get(organizationId);
	}
	
	@Override
	public Set<Integer> getDescendantOrganizations(Integer organizationId) {
		return cachesDescendantOrganizations.get(organizationId);
	}
	
	@Override
	protected CurdCacheService<OrganizationIdentity, Integer> curdCacheService() {
		return organizationService;
	}

	@Override
	protected CurdNotifyService<OrganizationIdentity, Integer> curdNotifyService() {
		return organizationService;
	}

	@Override
	protected Map<Integer, OrganizationIdentity> caches() {
		return caches;
	}

	@Override
	protected Map<Integer, OrganizationIdentity> newCaches() {
		return new HashMap<Integer, OrganizationIdentity>();
	}

	
	
}
