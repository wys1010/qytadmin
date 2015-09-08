package com.qyt.management.uc.user.service;

import java.util.List;

import com.qyt.management.cache.service.CurdCacheService;
import com.qyt.management.cache.service.CurdNotifyService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.uc.user.domain.Staff;
import com.qyt.management.uc.user.domain.StaffIdentity;

/**
 * Created by Xandy on 2015/2/27.
 */
public interface StaffService extends BaseCurdService<Staff,Staff,Integer>, CurdCacheService<StaffIdentity, Integer>, CurdNotifyService<StaffIdentity, Integer> {
    List<Staff> selectAllEntities();

    List<Staff> picker();

    void selectEntitiesEx(PagingBean<Staff> pb);

    Staff selectEntityByIdEx(int id);

    public Staff selectByLoginName(String loginName);

    void resetPassword(Staff staff);

    void transferCustomer(Integer oldStaffId, Integer transferStaffId);    

    void batchUpdateEntites(List<Staff> staffs) throws BusinessException;

    public void deleteStaffInOrgs(String id);

    void updatePassword(Staff staff) throws BusinessException;
}
