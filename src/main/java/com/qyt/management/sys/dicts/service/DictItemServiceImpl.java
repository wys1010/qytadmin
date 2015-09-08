package com.qyt.management.sys.dicts.service;

import com.qyt.management.sys.dicts.dao.DictMapper;
import com.qyt.management.sys.dicts.domain.Dict;
import com.qyt.management.sys.dicts.domain.DictItem;
import com.qyt.management.sys.dicts.service.*;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qyt.management.cache.service.StaffCacheService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.sys.dicts.dao.DictItemMapper;

import java.util.List;

/**
 * @author Wangyiqun
 * @date 2013-12-03
 */
@Transactional
@Service
public class DictItemServiceImpl implements com.qyt.management.sys.dicts.service.DictItemService {


	@Autowired
	private DictItemMapper dictItemMapper;

    @Autowired
    private DictMapper dictMapper;

    @Autowired
    private StaffCacheService staffCacheService;

    @Override
    public DictItem selectEntityById(Integer id) {
        DictItem dictItem = this.dictItemMapper.selectEntityById(id);
        if(null != dictItem){
            dictItem.setOperatorName(staffCacheService.getName(dictItem.getOperatorId()));
        }
        return dictItem;
    }


    @Override
    public void selectEntities(PagingBean<DictItem> pb) {
        List<DictItem> dictItems = dictItemMapper.selectEntities(pb);
        int count = dictItemMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(dictItems);
    }


    @Override
    public void updateEntity(DictItem dto) throws BusinessException {
        this.dictItemMapper.updateEntity(dto);
    }

    @Override
    public void insertEntity(DictItem dto) throws BusinessException {
        String dictId = dto.getDictId();
        if(!StringUtils.isNotBlank(dictId)){
            throw new BusinessException("字典不能为空");
        }
        Dict dict = dictMapper.selectEntityById(dictId);
        if(dict == null){
            throw new BusinessException("字典不存在");
        }
        this.dictItemMapper.insertEntity(dto);
    }

    @Override
    public void deleteEntity(Integer id) {
        this.dictItemMapper.deleteEntity(id);
    }



    @Override
    public List<DictItem> selectItemsByDictIdSafely(String dictId) throws BusinessException {

        return this.dictItemMapper.selectItemsByDictId(dictId);
    }

    @Override
    public List<DictItem> selectItemsByDictId(String dictId) {

        return this.dictItemMapper.selectItemsByDictId(dictId);
    }

    @Override
    public List<DictItem> selectAllEntities() {

        return this.dictItemMapper.selectAllEntities();
    }
}
