package com.qyt.management.platform.web.base;

import com.qyt.management.platform.exception.BusinessException;

/**
 * @author Wangyiqun
 * @date 2014-04-29
 */
public interface EnableInterface<PK> {

    /**
     * 启用数据
     */
    public void enableEntity(PK id);

    /**
     * 禁用数据
     */
    public void disableEntity(PK id) throws BusinessException;


}
