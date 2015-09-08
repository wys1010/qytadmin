package com.qyt.management.platform.web.base;


import com.qyt.management.platform.exception.BusinessException;

/**
 * @author Wangyiqun
 * @date 2014-04-29
 * @param <DOMAIN>  实体类型,selectEntityById结果返回类型
 * @param <PK> 查询结果集主键类型
 */
public interface EditableInterface<DOMAIN , PK>  {


    /**
     * 修改数据
     * @param dto
     * @return
     */
    public void updateEntity(DOMAIN dto) throws BusinessException;

    /**
     * 新增数据
     * @param dto
     * @return
     */
    public void insertEntity(DOMAIN dto) throws BusinessException;


    /**
     * 删除数据
     * @param id
     */
    public void deleteEntity(PK id) ;



}
