package com.qyt.management.storage.stock.service;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.product.dao.PdmProductsMapper;
import com.qyt.management.storage.product.domain.PdmProduct;
import com.qyt.management.storage.stock.dao.StockLineMapper;
import com.qyt.management.storage.stock.dao.StockMapper;
import com.qyt.management.storage.stock.domain.Stock;
import com.qyt.management.storage.stock.domain.StockLine;
import com.qyt.management.storage.warehouse.dao.WarehouseMapper;
import com.qyt.management.storage.warehouse.domain.Warehouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.ws.wsaddressing.W3CEndpointReference;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wys on 2015/9/3.
 */
@Transactional
@Service
public class StockLineServiceImpl implements StockLineService {
    
    @Autowired
    StockLineMapper stockLineMapper;
    @Autowired
    StockMapper stockMapper;
    @Autowired
    PdmProductsMapper pdmProductsMapper;
    @Autowired
    WarehouseMapper warehouseMapper;

    @Override
    public void updateEntity(StockLine dto) throws BusinessException {
        dto.initChangeLog(false);
        stockLineMapper.updateEntity(dto);
    }

    @Override
    public void insertEntity(StockLine dto) throws BusinessException {
        dto.initChangeLog(true);

        Map<String,Object> param = new HashMap<>();
        param.put("productId",dto.getProductId());
        param.put("warehouseId",dto.getWarehouseId());
        Stock stock = stockMapper.findOnByParam(param);

        if (stock != null){
            stock.initChangeLog(false);
            if(dto.getType() == 2){//出库
                if(dto.getNum() > stock.getNum()){
                    throw new BusinessException("出库数量不能大于库存数量");
                }else{
                    stock.setNum(stock.getNum() - dto.getNum());
                }
            }else{//入库
                stock.setNum(stock.getNum() + dto.getNum());
            }
            stockMapper.updateEntity(stock);
        }else{
            stock = new Stock();
            stock.initChangeLog(true);
            stock.setNum(dto.getNum());;
            stock.setWarehouseId(dto.getWarehouseId());
            stock.setProductId(dto.getProductId());
            PdmProduct product = pdmProductsMapper.selectEntityById(dto.getProductId());
            stock.setProductName(product.getName());
            stock.setProductCategory(product.getCategory());
            stockMapper.insertEntity(stock);
        }
        dto.setStockId(stock.getId());
        dto.setId(null);
        stockLineMapper.insertEntity(dto);

    }

    @Override
    public void deleteEntity(Integer id) {
        stockLineMapper.deleteEntity(id);
    }

    @Override
    public void selectEntities(PagingBean<StockLine> pb) {
        List<StockLine> stocks = stockLineMapper.selectEntities(pb);
        int count = stockLineMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(stocks);
    }

    @Override
    public StockLine selectEntityById(Integer id) {
        StockLine stockLine = stockLineMapper.selectEntityById(id);

        PagingBean<Warehouse> pb = new PagingBean<>();
        Warehouse warehouse = new Warehouse();
        warehouse.setType(1);
        pb.setCondition(warehouse);
        List<Warehouse> warehouses = warehouseMapper.selectEntities(pb);
        if(warehouses != null && warehouses.size() > 0){
            stockLine.setAllWarehouseId(warehouses.get(0).getId());
        }
        return stockLine;
    }

    @Override
    public List<StockLine> getStockLineByStockId(Integer stockId) {
        return stockLineMapper.getStockLineByStockId(stockId);
    }
}
