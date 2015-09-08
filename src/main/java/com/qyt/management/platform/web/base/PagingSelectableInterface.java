package com.qyt.management.platform.web.base;

import com.qyt.management.platform.web.PagingBean;

import java.util.List;

/**
 * @author Wangyiqun
 * @date 2014-04-29
 * @param <CONDITION> 查询条件类，根据实际情况，可以是domain，也可以是自定义的类
 * @param <DOMAIN>  实体类型,selectEntityById结果返回类型
 * @param <PK> 查询结果集主键类型
 */
public interface PagingSelectableInterface<CONDITION , DOMAIN , PK>  extends com.qyt.management.platform.web.base.SelectableInterface<CONDITION , DOMAIN , PK> {

    /**
     * 分页查询列表
     * @param pb
     */
    public List<DOMAIN> selectEntities(PagingBean<CONDITION> pb);


    /**
     * 条件分页查询记录数
     * @param pb
     * @return
     */
    public int selectEntitiesCount(PagingBean<CONDITION> pb);

}
