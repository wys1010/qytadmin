package com.qyt.management.cache.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.qyt.management.cache.domain.BaseIdentity;
import com.qyt.management.cache.listener.CurdListener;
import com.qyt.management.cache.service.CurdNotifyService;

/**
 * 数据库变更通知者基类
 * 
 * @author caiwb
 */
public class BaseCurdNotifyServiceImpl<DOMAIN extends BaseIdentity<PK>, PK> implements CurdNotifyService<DOMAIN, PK> {

	private List<CurdListener<DOMAIN, PK>> listeners = new ArrayList<CurdListener<DOMAIN, PK>>();
	
	@Override
	public void registerCurdListener(CurdListener<DOMAIN, PK> listener) {
		listeners.add(listener);
	}
	
	@Override
	public void notifyInsert(DOMAIN domain) {
		for (CurdListener<DOMAIN, PK> curdListener : listeners) {
			curdListener.onInsert(domain);
		}
	}

	@Override
	public void notifyInsert(List<DOMAIN> list) {
		for (CurdListener<DOMAIN, PK> curdListener : listeners) {
			curdListener.onInsert(list);
		}
	}
	
	@Override
	public void notifyDelete(DOMAIN domain) {
		for (CurdListener<DOMAIN, PK> curdListener : listeners) {
			curdListener.onDelete(domain);
		}
	}

	@Override
	public void notifyDelete(PK id) {
		for (CurdListener<DOMAIN, PK> curdListener : listeners) {
			curdListener.onDelete(id);
		}
	}
	
	@Override
	public void notifyDelete(List<DOMAIN> list) {
		for (CurdListener<DOMAIN, PK> curdListener : listeners) {
			curdListener.onDelete(list);
		}
	}
	
	@Override
	public void notifyUpdate(DOMAIN domain) {
		for (CurdListener<DOMAIN, PK> curdListener : listeners) {
			curdListener.onUpdate(domain);
		}
	}
	
	@Override
	public void notifyUpdate(List<DOMAIN> list) {
		for (CurdListener<DOMAIN, PK> curdListener : listeners) {
			curdListener.onUpdate(list);
		}
	}
}
