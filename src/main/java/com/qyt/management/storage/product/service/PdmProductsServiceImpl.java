
package com.qyt.management.storage.product.service;

import com.qyt.management.cache.service.StaffCacheService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.product.dao.PdmProductsMapper;
import com.qyt.management.storage.product.domain.PdmProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Wangyiqun
 * @date 2015-01-12
 */
@Service
@Transactional
public class PdmProductsServiceImpl implements PdmProductsService {

    @Autowired
    private PdmProductsMapper pdmProductsMapper;

    @Autowired
    private StaffCacheService staffCacheService;


    
    /**
     * 查询单条记录
     *
     * @param id 查询表的主键，根据接口泛型参数PK确定类型
     * @return
     */
    @Override
    public PdmProduct selectEntityById(Integer id) {
        PdmProduct pdmProduct = this.pdmProductsMapper.selectEntityById(id);
        return pdmProduct;
    }

    /**
     * 分页查询
     *
     * @param pb
     */
    @Override
    public void selectEntities(PagingBean<PdmProduct> pb) {
        List<PdmProduct> pdmProducts = pdmProductsMapper.selectEntities(pb);
        int count = pdmProductsMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(pdmProducts);
    }

    public List<PdmProduct> selectAllEntities() {
        return null;
    }


    /**
     * 更新
     *
     * @param dto
     * @throws BusinessException
     */
    @Override
    public void updateEntity(PdmProduct dto) throws BusinessException {
        this.pdmProductsMapper.updateEntity(dto);
    }


    /**
     * 插入数据
     *
     * @param dto
     * @throws BusinessException
     */
    @Override
    public void insertEntity(PdmProduct dto) throws BusinessException {
        this.pdmProductsMapper.insertEntity(dto);
    }


    /**
     * 删除数据
     *
     * @param id
     */
    @Override
    public void deleteEntity(Integer id) {
        this.pdmProductsMapper.deleteEntity(id);
    }

    @Override
    public void enableEntity(Integer id) {

    }

    @Override
    public void disableEntity(Integer id) throws BusinessException {

    }


}
