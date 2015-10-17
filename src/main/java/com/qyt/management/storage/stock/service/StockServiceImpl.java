package com.qyt.management.storage.stock.service;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.AuthorityService;
import com.qyt.management.storage.stock.dao.StockMapper;
import com.qyt.management.storage.stock.domain.Stock;
import com.qyt.management.uc.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by wys on 2015/9/3.
 */

@Transactional
@Service
public class StockServiceImpl extends AuthorityService<Stock> implements StockService {

    @Autowired
    StockMapper stockMapper;

    @Override
    public void updateEntity(Stock dto) throws BusinessException {
        stockMapper.updateEntity(dto);
    }

    @Override
    public void insertEntity(Stock dto) throws BusinessException {
        stockMapper.insertEntity(dto);
    }

    @Override
    public void deleteEntity(Integer id) {
        stockMapper.deleteEntity(id);
    }

    @Override
    public void selectEntities(PagingBean<Stock> pb) {

        this.auth(pb,Stock.class);

        List<Stock> stocks = stockMapper.selectEntities(pb);
        int count = stockMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(stocks);
    }

    @Override
    public Stock selectEntityById(Integer id) {
        return stockMapper.selectEntityById(id);
    }

    @Override
    public List<Stock> selectAllEntities() {
        return stockMapper.selectAllEntities();
    }
}
