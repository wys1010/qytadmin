package com.qyt.management.storage.warehouse.service;

import java.util.List;

import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.storage.warehouse.domain.Warehouse;


public interface WarehouseService extends BaseCurdService<Warehouse, Warehouse, Integer> {
	List<Warehouse> selectAllEntities();

	List<Warehouse> selectEntitiesBySellerID(Integer sellerId);

	int isExist(Warehouse Warehouse);

	Warehouse selectEntitiesByName(String name);
}