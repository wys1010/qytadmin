package com.qyt.management.cache.ctrl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qyt.management.cache.domain.CacheEntity;
import com.qyt.management.cache.service.CacheService;
import com.qyt.management.cache.service.PermissionCacheService;
import com.qyt.management.platform.web.KsPagingBean;
import com.qyt.management.uc.user.domain.User;

/**
 * 缓存管理
 * 
 * @author caiwb
 */
@Controller
@RequestMapping(value = "cache/manage")
@SuppressWarnings("rawtypes")
public class CacheManageController {

    private static final Logger logger = LoggerFactory.getLogger(CacheManageController.class);
    
    private static Map<String, CacheService> cacheServices = new HashMap<String, CacheService>();
    private static PermissionCacheService permissionCacheService;

    private static final String INDEX_PAGE = "cache/manage/index_cache_manage";

    @Secured({"ROLE_UC_CACHE_MANAGE_SELECT"})
    @RequestMapping(value = "index",method = RequestMethod.GET)
    public String index(HttpServletRequest request ) throws Exception {
        return INDEX_PAGE;
    }

	@Secured({"ROLE_UC_CACHE_MANAGE_SELECT"})
    @RequestMapping(value = "",method = RequestMethod.GET)
    @ResponseBody
    public KsPagingBean<CacheEntity, CacheEntity> selectEntities(KsPagingBean<CacheEntity, CacheEntity> pb) throws Exception {
        
    	List<CacheEntity> list = new ArrayList<CacheEntity>();
    	
    	for (String code : cacheServices.keySet()) {
    		CacheService cacheService = cacheServices.get(code);
    		
    		CacheEntity entity = new CacheEntity();
    		
    		entity.setCode(code);
    		entity.setSize(cacheService.size());
    		entity.setUpdatedAt(cacheService.updatedAt());
    		
    		list.add(entity);
		}
		
		list.add(getCacheRoleEntity());
		list.add(getCachePermissionEntity());
		list.add(getCacheRolePermissionEntity());
    	
        pb.setRows(list);
        pb.setResults(list.size());
        
        return pb;
    }
	
	private CacheEntity getCacheRoleEntity() {
		CacheEntity entity = new CacheEntity();
		
		entity.setCode("Role");
		entity.setSize(permissionCacheService.sizeOfRole());
		entity.setUpdatedAt(permissionCacheService.updatedAtOfRole());
		
		return entity;
	}
	
	private CacheEntity getCachePermissionEntity() {
		CacheEntity entity = new CacheEntity();
		
		entity.setCode("Permission");
		entity.setSize(permissionCacheService.sizeOfPermission());
		entity.setUpdatedAt(permissionCacheService.updatedAtOfPermission());
		
		return entity;
	}
	
	private CacheEntity getCacheRolePermissionEntity() {
		CacheEntity entity = new CacheEntity();
		
		entity.setCode("RolePermission");
		entity.setSize(permissionCacheService.sizeOfRolePermission());
		entity.setUpdatedAt(permissionCacheService.updatedAtOfRolePermission());
		
		return entity;
	}

    @Secured({"ROLE_UC_CACHE_MANAGE_REFRESH"})
    @RequestMapping(value = "refresh",method = RequestMethod.POST)
    @ResponseBody
    public void refresh(String code) throws Exception {
    	logger.info("刷新缓存：" + code + "，操作人：" + User.getCurrentUser().getLoginName());
    	
    	if (cacheServices.containsKey(code)) {
    		cacheServices.get(code).reload();
    	} else {
    		if (code.equals("Role") || code.equals("Permission") || code.equals("RolePermission")) {
    			permissionCacheService.reload();
    		}
    	} 
    }
    
    public static void registerCacheService(String code, CacheService cacheService) {
    	cacheServices.put(code, cacheService);
    }
    
    public static void registerPermissionCacheService(PermissionCacheService cacheService) {
    	permissionCacheService = cacheService;
    }
}
