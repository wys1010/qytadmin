package com.qyt.management.uc.user.dao;

import com.qyt.management.cache.dao.CurdCacheMapper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.uc.user.domain.Staff;
import com.qyt.management.uc.user.domain.StaffIdentity;

import java.util.List;

/**
 * Created by Xandy on 2015/2/27.
 */
public interface StaffMapper extends BaseCurdMapper<Staff,Staff,Integer>, CurdCacheMapper<StaffIdentity, Integer> {
    List<Staff> selectAllEntities();

    List<Staff> picker();

    List<Staff> selectEntitiesEx(PagingBean<Staff> pb);

    Staff selectEntityByIdEx(int id);

    Staff selectByLoginName(String loginName);

    void resetPassword(Staff staff);

    void transferCustomer(Integer oldStaffId, Integer transferStaffId);    
    
    public Staff selectEntityByName(String name);
    
    public String selectNamesByIds(String ids);

    void deleteStaffInOrgs(List<String> ids);

}
