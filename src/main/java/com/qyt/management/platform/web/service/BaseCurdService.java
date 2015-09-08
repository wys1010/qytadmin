package com.qyt.management.platform.web.service;

/**
 * @author Wangyiqun
 * @date 2014-04-29
 * @param <CONDITION> 分页查询查询条件类，根据实际情况，可以是domain，也可以是自定义的类
 * @param <DOMAIN>  实体类型,selectEntityById结果返回类型
 * @param <PK> 查询结果集主键类型
 */
public interface BaseCurdService<CONDITION ,DOMAIN ,  PK> extends PagingSelectableService<CONDITION ,DOMAIN ,  PK>, EditableService<DOMAIN , PK> {


}
