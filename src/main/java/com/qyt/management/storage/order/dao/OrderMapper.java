package com.qyt.management.storage.order.dao;

import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.platform.web.dao.EnableMapper;
import com.qyt.management.storage.order.domain.Order;

public interface OrderMapper extends BaseCurdMapper<Order, Order, Integer>, EnableMapper<Integer> {
}