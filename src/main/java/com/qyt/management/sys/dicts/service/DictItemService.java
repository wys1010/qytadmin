package com.qyt.management.sys.dicts.service;


import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.sys.dicts.domain.DictItem;

import java.util.List;

/**
 * @author Wangyiqun
 * @date 2013-12-03
 */
public interface DictItemService extends BaseCurdService<DictItem, DictItem, Integer> {


    /**
     * 获取字典，如果不存在，则抛出异常
     *
     * @param dictId
     * @return
     */
    public List<DictItem> selectItemsByDictIdSafely(String dictId) throws BusinessException;


    public List<DictItem> selectItemsByDictId(String dictId);


    public List<DictItem> selectAllEntities();

}
