package com.qyt.management.cache.service;

import java.util.List;

import com.qyt.management.cache.domain.BaseIdentity;
import com.qyt.management.cache.listener.CurdListener;

/**
 * 数据变更通知者
 * 
 * @author caiwb
 */
public interface CurdNotifyService<DOMAIN extends BaseIdentity<PK>, PK> {

	public void registerCurdListener(CurdListener<DOMAIN, PK> listener);
	
	public void notifyInsert(DOMAIN domain);
	
	public void notifyInsert(List<DOMAIN> list);
	
	public void notifyDelete(DOMAIN domain);
	
	public void notifyDelete(PK id);
	
	public void notifyDelete(List<DOMAIN> list);
	
	public void notifyUpdate(DOMAIN domain);
	
	public void notifyUpdate(List<DOMAIN> list);
}
