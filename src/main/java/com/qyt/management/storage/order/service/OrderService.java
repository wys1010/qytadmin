package com.qyt.management.storage.order.service;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.storage.order.domain.Order;
import com.qyt.management.storage.stock.domain.StockLine;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Created by wys on 2015/9/3.
 */
public interface OrderService extends BaseCurdService<Order, Order, Integer> {
    public void delivery(Order order) throws BusinessException;
    public void confirmReceipt(int id) throws BusinessException;
}
