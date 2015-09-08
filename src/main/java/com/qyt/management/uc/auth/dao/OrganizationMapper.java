
package com.qyt.management.uc.auth.dao;

import java.util.List;

import com.qyt.management.cache.dao.CurdCacheMapper;
import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.uc.auth.domain.Organization;
import com.qyt.management.uc.auth.domain.OrganizationIdentity;

/**
 * 组织机构
 * 
 * @author caiwb
 */
public interface OrganizationMapper extends BaseCurdMapper<Organization, Organization , Integer>, CurdCacheMapper<OrganizationIdentity, Integer> {

    public List<Organization> selectAllEntities();

    public List<Organization> picker();
    
}
