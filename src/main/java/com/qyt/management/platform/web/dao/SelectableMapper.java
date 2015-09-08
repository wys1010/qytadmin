package com.qyt.management.platform.web.dao;

import com.qyt.management.platform.web.base.SelectableInterface;

/**
 * @author Wangyiqun
 * @date 2014-04-29
 * @param <CONDITION> 分页查询查询条件类，根据实际情况，可以是domain，也可以是自定义的类
 * @param <DOMAIN>  实体类型,selectEntityById结果返回类型
 * @param <PK> 查询结果集主键类型
 */
public interface SelectableMapper<CONDITION , DOMAIN , PK> extends SelectableInterface<CONDITION , DOMAIN , PK> {


}
