package com.qyt.management.platform.web.service;


import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.platform.web.base.SelectableInterface;

/**
 * @author Wangyiqun
 * @date 2014-04-29
 * @param <CONDITION> 分页查询查询条件类，根据实际情况，可以是domain，也可以是自定义的类
 */
public interface PagingSelectableService<CONDITION , DOMAIN , PK> extends SelectableInterface<CONDITION , DOMAIN , PK> {

    /**
     * 分页查询列表
     * @param pb
     */
    public void selectEntities(PagingBean<CONDITION> pb);

}
