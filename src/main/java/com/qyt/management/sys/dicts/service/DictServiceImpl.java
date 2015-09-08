package com.qyt.management.sys.dicts.service;

import com.qyt.management.sys.dicts.dao.DictMapper;
import com.qyt.management.sys.dicts.domain.Dict;
import com.qyt.management.sys.dicts.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qyt.management.cache.service.StaffCacheService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.uc.user.domain.User;

import java.util.List;

/**
 * @author Wangyiqun
 * @date 2013-12-03
 */
@Transactional
@Service
public class DictServiceImpl  implements com.qyt.management.sys.dicts.service.DictService {


	@Autowired
	private DictMapper dictMapper;

	@Autowired
    private StaffCacheService staffCacheService;
	
    @Override
    public Dict selectEntityById(String id) {
        Dict dict = this.dictMapper.selectEntityById(id);
        if(null != dict){
            dict.setOperatorName(staffCacheService.getName(dict.getOperatorId()));
        }
        return dict;
    }


    @Override
    public void selectEntities(PagingBean<Dict> pb) {
        List<Dict> dicts = dictMapper.selectEntities(pb);
        int count = dictMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(dicts);
    }


    @Override
    public void updateEntity(Dict dto) throws BusinessException {
        this.dictMapper.updateEntity(dto);
    }

    @Override
    public void insertEntity(Dict dto) throws BusinessException {
        dto.setOperatorId(User.getCurrentUser().getId());
        this.dictMapper.insertEntity(dto);
    }

    @Override
    public void deleteEntity(String id) {
        this.dictMapper.deleteEntity(id);
    }

    @Override
    public List<Dict> selectAllEntities() {

        return this.dictMapper.selectAllEntities();
    }
}
