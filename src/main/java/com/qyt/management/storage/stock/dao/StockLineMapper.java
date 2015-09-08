package com.qyt.management.storage.stock.dao;

import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.platform.web.dao.EnableMapper;
import com.qyt.management.storage.stock.domain.StockLine;

import java.util.List;

public interface StockLineMapper extends BaseCurdMapper<StockLine, StockLine, Integer>, EnableMapper<Integer> {

    List<StockLine> getStockLineByStockId(Integer stockId);

}