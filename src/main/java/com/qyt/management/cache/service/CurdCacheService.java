package com.qyt.management.cache.service;

import java.util.List;

import com.qyt.management.cache.domain.BaseIdentity;

/**
 * 数据库变更的缓存服务
 * 
 * @author caiwb
 */
public interface CurdCacheService<DOMAIN extends BaseIdentity<PK>, PK> {
	
	public DOMAIN selectIdentityById(PK id);
    
    public List<DOMAIN> selectIdentities();
}
