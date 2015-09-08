package com.qyt.management.platform.web.base;

import java.util.List;

/**
 * @author Wangyiqun
 * @date 2014-04-29
 * @param <CONDITION> 分页查询查询条件类，根据实际情况，可以是domain，也可以是自定义的类
 * @param <DOMAIN>  实体类型,selectEntityById结果返回类型
 * @param <PK> 查询结果集主键类型
 */
public interface SelectableInterface<CONDITION , DOMAIN , PK>  {


    /**
     * 根据id查询
     * @param id 查询表的主键，根据接口泛型参数PK确定类型
     * @return DOMAIN 返回实体，根据接口泛型参数DOMAIN确定
     */
    public DOMAIN selectEntityById(PK id);


}
