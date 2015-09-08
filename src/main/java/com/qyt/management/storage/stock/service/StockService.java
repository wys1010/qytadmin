package com.qyt.management.storage.stock.service;

import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.storage.stock.domain.Stock;

import java.util.List;

/**
 * Created by wys on 2015/9/3.
 */
public interface StockService extends BaseCurdService<Stock, Stock, Integer> {

    List<Stock> selectAllEntities();

}
