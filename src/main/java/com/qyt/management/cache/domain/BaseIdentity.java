package com.qyt.management.cache.domain;

/**
 * 数据缓存基础类
 * 
 * @author caiwb
 */
public class BaseIdentity<PK> {

	protected PK id;
	
	public PK getId() {
		return id;
	}

	public void setId(PK id) {
		this.id = id;
	}	
}
