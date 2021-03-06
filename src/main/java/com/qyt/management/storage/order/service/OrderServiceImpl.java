package com.qyt.management.storage.order.service;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.AuthorityService;
import com.qyt.management.storage.order.dao.OrderMapper;
import com.qyt.management.storage.order.domain.Order;
import com.qyt.management.storage.order.domain.OrderStatus;
import com.qyt.management.storage.product.dao.PdmProductsMapper;
import com.qyt.management.storage.product.domain.PdmProduct;
import com.qyt.management.storage.stock.dao.StockLineMapper;
import com.qyt.management.storage.stock.dao.StockMapper;
import com.qyt.management.storage.stock.domain.Stock;
import com.qyt.management.storage.stock.domain.StockLine;
import com.qyt.management.storage.warehouse.dao.WarehouseMapper;
import com.qyt.management.storage.warehouse.domain.Warehouse;
import com.qyt.management.uc.user.domain.User;
import org.apache.http.client.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wys on 2015/9/3.
 */
@Transactional
@Service
public class OrderServiceImpl extends AuthorityService<Order> implements OrderService {

    @Autowired
    OrderMapper orderMapper;
    
    @Autowired
    PdmProductsMapper productsMapper;

    @Autowired
    StockMapper stockMapper;

    @Autowired
    StockLineMapper stockLineMapper;

    @Autowired
    WarehouseMapper warehouseMapper;

    @Override
    public void updateEntity(Order dto) throws BusinessException {
        dto.initChangeLog(false);
        orderMapper.updateEntity(dto);
    }

    @Override
    public void insertEntity(Order dto) throws BusinessException {
        Warehouse warehouse = warehouseMapper.selectEntityById(dto.getWarehouseId());
        if (warehouse.getType() == 1){
            throw new BusinessException("不能选择总仓库");
        }
        dto.initChangeLog(true);
        String orderNo = DateUtils.formatDate(new Date(), "yyyyMMddHHmmsss");
        dto.setOrderNo(orderNo);
        orderMapper.insertEntity(dto);


        Map<String, Object> param = new HashMap<>();
        param.put("productId",dto.getProductId());
        param.put("warehouseType",1);
        Stock stock = stockMapper.findOnByParam(param);
        if(dto.getNum() > stock.getNum()){
            throw new BusinessException("库存数量不足,无法下单");
        }
        stock.setNum(stock.getNum() - dto.getNum());
        stockMapper.updateEntity(stock);


    }

    @Override
    public void deleteEntity(Integer id) {
        orderMapper.deleteEntity(id);
    }

    @Override
    public void selectEntities(PagingBean<Order> pb) {

        this.auth(pb,Order.class);

        List<Order> orders = orderMapper.selectEntities(pb);
        int count = orderMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(orders);
    }

    @Override
    public Order selectEntityById(Integer id) {
        Order order = orderMapper.selectEntityById(id);
        Warehouse warehouse = warehouseMapper.selectEntityById(order.getWarehouseId());
        if (warehouse != null){
            order.setWarehouseName(warehouse.getName());
        }

        return order;
    }

    @Override
    public void delivery(Order order) throws BusinessException {
        order.setStatus(OrderStatus.yifahuo.getValue());
        Stock stock = stockMapper.selectEntityById(order.getStockId());
        int stockNum = stock.getNum() - order.getActualDeliverNum();
        if(stockNum < 0){
            throw new BusinessException("库存数量不足");
        }

        stock.setNum(stock.getNum() + order.getNum() - order.getActualDeliverNum());
        stockMapper.updateEntity(stock);

//        //查询出这个产品为【确认收货】的总数量
//        PagingBean<Order> pb = new PagingBean<>();
//        Order param = new Order();
//        param.setProductId(order.getProductId());
//        param.setStatus(OrderStatus.querenshouhuo.getValue());
//        pb.setCondition(param);
//        orderMapper.selectEntities(pb);
//        List<Order> orders = pb.getRows();
//
//        //订单中产品实际发货数量之和
//        int totalActualDeliverNum = 0;
//        for (Order o : orders) {
//            totalActualDeliverNum += o.getActualDeliverNum();
//        }
//
//        //订单中已有产品数量 + 此单实际发货数量 不能大于库存数量
//        if(totalActualDeliverNum + order.getActualDeliverNum() > stock.getNum()){
//            throw new BusinessException("库存数量不足");
//        }

        orderMapper.updateEntity(order);
    }

    @Override
    public void confirmReceipt(int id) throws BusinessException {
        Order order = orderMapper.selectEntityById(id);
        order.setStatus(OrderStatus.querenshouhuo.getValue());

        //原库存 -
        Stock stock = stockMapper.selectEntityById(order.getStockId());
        int stockNum = stock.getNum() - order.getActualDeliverNum();
        if(stockNum < 0){
            throw new BusinessException("库存数量不足");
        }
//        stock.setNum(stockNum);
//        stock.initChangeLog(false);
//        stockMapper.updateEntity(stock);

        //原库存增加一条出库记录
        StockLine sl = new StockLine();
        sl.setNum(order.getActualDeliverNum());
        sl.setType(2);
        sl.setProductId(stock.getProductId());
        sl.setOrderId(id);
        sl.setStockId(stock.getId());
        sl.initChangeLog(true);
        stockLineMapper.insertEntity(sl);


        //目标库存 +
        Map<String,Object> param = new HashMap<>();
        param.put("productId",order.getProductId());
        param.put("warehouseId",order.getWarehouseId());
        Stock targetStock = stockMapper.findOnByParam(param);
        if(targetStock != null){
            targetStock.setNum(targetStock.getNum() + order.getActualDeliverNum());
            targetStock.initChangeLog(false);
            stockMapper.updateEntity(targetStock);
        }else{
            targetStock = new Stock();
            targetStock.initChangeLog(true);
            targetStock.setProductId(order.getProductId());
            targetStock.setWarehouseId(order.getWarehouseId());
            targetStock.setNum(order.getActualDeliverNum());

            PdmProduct pdmProduct = productsMapper.selectEntityById(order.getProductId());
            if(pdmProduct != null){
                targetStock.setProductName(pdmProduct.getName());
                targetStock.setProductCategory(pdmProduct.getCategory());
            }
            stockMapper.insertEntity(targetStock);
        }


        //目标库存增加一条入库记录
        sl.setStockId(targetStock.getId());
        sl.setType(1);
        sl.initChangeLog(true);
        stockLineMapper.insertEntity(sl);


        orderMapper.updateEntity(order);

    }

    @Override
    public void cancelOrder(Integer id) throws BusinessException {
        Order order = orderMapper.selectEntityById(id);
        int deliverNum = order.getActualDeliverNum();
        if(order == null) throw new BusinessException("该订单不存在");

        if(order.getStatus() == OrderStatus.querenshouhuo.getValue()){
            throw new BusinessException("确认收货状态不能取消订单");
        }

        if(deliverNum == 0){
            deliverNum = order.getNum();
        }

        Map<String, Object> param = new HashMap<>();
        param.put("productId",order.getProductId());
        param.put("warehouseType", 1);
        Stock stock = stockMapper.findOnByParam(param);
        stock.setNum(stock.getNum() + deliverNum);
        stockMapper.updateEntity(stock);

        order.setStatus(OrderStatus.yiquxiao.getValue());
        orderMapper.updateEntity(order);
    }
}
