package com.qyt.management.storage.stock.dao;

import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.platform.web.dao.EnableMapper;
import com.qyt.management.storage.stock.domain.Stock;

import java.util.List;
import java.util.Map;

public interface StockMapper extends BaseCurdMapper<Stock, Stock, Integer>, EnableMapper<Integer> {

    Stock findOnByParam(Map<String,Object> params);

    List<Stock> selectAllEntities();

}