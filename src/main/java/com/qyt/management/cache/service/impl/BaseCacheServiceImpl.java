package com.qyt.management.cache.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.qyt.management.cache.domain.BaseIdentity;
import com.qyt.management.cache.listener.CurdListener;
import com.qyt.management.cache.service.CacheService;
import com.qyt.management.cache.service.CurdCacheService;
import com.qyt.management.cache.service.CurdNotifyService;

/**
 * 缓存服务基类
 * 
 * @author caiwb
 */
public abstract class BaseCacheServiceImpl<DOMAIN extends BaseIdentity<PK>, PK> implements CacheService<DOMAIN, PK>, CurdListener<DOMAIN, PK> {
		
	private Date updatedAt;
	
	private boolean loaded = false;
	
	@Override
	public int size() {
		return caches().size();
	}

	@Override
	public Date updatedAt() {
		return updatedAt;
	}
	
	@Override
	public void reload() {
		if (!loaded) {
			loaded = true;

			if (curdNotifyService() != null)
				curdNotifyService().registerCurdListener(this);			
		}
		
		List<DOMAIN> list = curdCacheService().selectIdentities();
		
//		if (list != null && list.size() > 0) {
//			Map<PK, DOMAIN> newCaches = newCaches();
//			
//			for (DOMAIN domain : list) {
//				newCaches.put(domain.getId(), domain);
//			}
//			
//			Map<PK, DOMAIN> caches = caches();
//			caches = newCaches;
//						
//			updatedAt = new Date();
//		}
		
		if (list != null && list.size() > 0) {
			Map<PK, DOMAIN> caches = caches();
			caches.clear();
			
			for (DOMAIN domain : list) {
				caches.put(domain.getId(), domain);
			}
									
			updatedAt = new Date();
		}
		
		onReload(list);
	}

	protected void onReload(List<DOMAIN> list) {}
	
	@Override
	public DOMAIN getIdentity(PK id) {
		if (id == null)
			return null;
		
		if (caches().containsKey(id))
			return caches().get(id);
		
		DOMAIN domain = curdCacheService().selectIdentityById(id);
		
		if (domain != null) {
			caches().put(domain.getId(), domain);
			
			updatedAt = new Date();
			
			return domain;
		}
		
		return null;
	}

	@Override
	public void onInsert(DOMAIN domain) {
		if (domain != null) {
			caches().put(domain.getId(), domain);
			
			onChange();
		}
	}

	@Override
	public void onInsert(List<DOMAIN> list) {
		if (list != null) {
			Map<PK, DOMAIN> caches = caches();
			
			for (DOMAIN domain : list) {
				caches.put(domain.getId(), domain);
			}
			
			onChange();
		}
	}
	
	@Override
	public void onDelete(DOMAIN domain) {
		if (domain != null) {
			caches().remove(domain.getId());
			
			onChange();
		}
	}
	
	@Override
	public void onDelete(PK id) {
		if (id != null) {
			caches().remove(id);
			
			onChange();
		}
	}

	@Override
	public void onDelete(List<DOMAIN> list) {
		if (list != null) {
			Map<PK, DOMAIN> caches = caches();
			
			for (DOMAIN domain : list) {
				caches.remove(domain.getId());
			}
			
			onChange();
		}
	}
	
	@Override
	public void onUpdate(DOMAIN domain) {
		if (domain != null) {
			caches().put(domain.getId(), domain);
			
			onChange();
		}
	}
	
	@Override
	public void onUpdate(List<DOMAIN> list) {
		if (list != null) {
			Map<PK, DOMAIN> caches = caches();
			
			for (DOMAIN domain : list) {
				caches.put(domain.getId(), domain);
			}
			
			onChange();
		}
	}
	
	protected void onChange() {
		updatedAt = new Date();
	}
	
	protected abstract CurdCacheService<DOMAIN, PK> curdCacheService();
	
	protected abstract CurdNotifyService<DOMAIN, PK> curdNotifyService();

	protected abstract Map<PK, DOMAIN> caches();
	
	protected abstract Map<PK, DOMAIN> newCaches();

}
