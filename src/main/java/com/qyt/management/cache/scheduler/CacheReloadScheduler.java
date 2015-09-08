package com.qyt.management.cache.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.qyt.management.cache.ctrl.CacheManageController;
import com.qyt.management.cache.service.OrganizationCacheService;
import com.qyt.management.cache.service.PermissionCacheService;
import com.qyt.management.cache.service.StaffCacheService;

/**
 * 缓存加载定时任务
 * 
 * @author caiwb
 */
public class CacheReloadScheduler {

	private static final Logger logger = LoggerFactory.getLogger(CacheReloadScheduler.class);
	

	@Autowired
	private OrganizationCacheService organizationCacheService;
	
	@Autowired
	private StaffCacheService staffCacheService;
	


	@Autowired
	private PermissionCacheService permissionCacheService;
	
	private boolean loading = false;
	
	public void init() {
		try {
			CacheManageController.registerCacheService("Organization", organizationCacheService);
			CacheManageController.registerCacheService("Staff", staffCacheService);
			CacheManageController.registerPermissionCacheService(permissionCacheService);
			
			new Thread("CacheReload") {
				@Override
				public void run() {
					reload();
				}
			}.start();
			
		} catch (Exception e) {
			logger.error("[Cache] " + e.getMessage(), e);
		}
	}
	
	public void reload() {
		try {
			if (loading) {
	    		logger.error("[Cache] 正在执行加载");
				return;
	    	}
			
			loading = true;
			

			logger.info("[Cache] [Organization] 加载开始");
			organizationCacheService.reload();
			logger.info("[Cache] [Organization] 加载结束");
			
			logger.info("[Cache] [Staff] 加载开始");
			staffCacheService.reload();
			logger.info("[Cache] [Staff] 加载结束");
			
			logger.info("[Cache] [Permission] 加载开始");
			permissionCacheService.reload();
			logger.info("[Cache] [Permission] 加载结束");
		} catch (Exception e) {
			logger.error("[Cache] " + e.getMessage(), e);
		} finally {
			loading = false;
		}
	}
}
