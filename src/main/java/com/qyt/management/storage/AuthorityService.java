package com.qyt.management.storage;

import com.qyt.management.base.BaseEntity;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.order.domain.Order;
import com.qyt.management.uc.user.domain.User;

/**
 * Created by wqs10 on 2015-10-17.
 */
public abstract class AuthorityService<DOMAIN extends BaseEntity> {

    protected void auth(PagingBean<DOMAIN> pb,Class<DOMAIN> tClass){
        Integer manager = User.getCurrentUser().getManager();
        if(manager == 0){
            if(pb.getCondition() == null){
                try {
                    DOMAIN domain = tClass.newInstance();
                    domain.setStaffId(User.getCurrentUser().getId());
                    pb.setCondition(domain);
                } catch (InstantiationException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }else{
                pb.getCondition().setStaffId(User.getCurrentUser().getId());
            }
        }
    }


}
