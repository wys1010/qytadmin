package com.qyt.management.cache.listener;

import java.util.List;

import com.qyt.management.cache.domain.BaseIdentity;

/**
 * 数据变更监听者
 * 
 * @author caiwb
 */
public interface CurdListener<DOMAIN extends BaseIdentity<PK>, PK> {

	public void onInsert(DOMAIN domain);
	
	public void onInsert(List<DOMAIN> list);
	
	public void onDelete(DOMAIN domain);
	
	public void onDelete(PK id);
	
	public void onDelete(List<DOMAIN> list);
	
	public void onUpdate(DOMAIN domain);
	
	public void onUpdate(List<DOMAIN> list);
}
