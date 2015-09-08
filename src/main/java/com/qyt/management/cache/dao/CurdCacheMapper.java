package com.qyt.management.cache.dao;

import java.util.List;

import com.qyt.management.cache.domain.BaseIdentity;

/**
 * 数据缓存
 * 
 * @author caiwb
 */
public interface CurdCacheMapper<DOMAIN extends BaseIdentity<PK>, PK> {

	public DOMAIN selectIdentityById(PK id);
    
    public List<DOMAIN> selectIdentities();
}
