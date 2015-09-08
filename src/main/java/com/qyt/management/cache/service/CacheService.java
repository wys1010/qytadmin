package com.qyt.management.cache.service;

import java.util.Date;

import com.qyt.management.cache.domain.BaseIdentity;

/**
 * 缓存服务接口
 * 
 * @author caiwb
 */
public interface CacheService<DOMAIN extends BaseIdentity<PK>, PK> {

	public int size();
	
	public Date updatedAt();
	
	public void reload();
	
	public DOMAIN getIdentity(PK id);
}
