package com.qyt.management.storage.warehouse.dao;

import java.util.List;

import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.platform.web.dao.EnableMapper;
import com.qyt.management.storage.warehouse.domain.Warehouse;


/**
 * Created by Xandy on 2015/8/11.
 */
public interface WarehouseMapper extends BaseCurdMapper<Warehouse, Warehouse, Integer>, EnableMapper<Integer> {

    List<Warehouse> selectAllEntities();

    List<Warehouse> selectEntitiesBySellerID(Integer sellerId);

    int isExist(Warehouse Warehouse);

    Warehouse selectEntitiesByName(String name);
}