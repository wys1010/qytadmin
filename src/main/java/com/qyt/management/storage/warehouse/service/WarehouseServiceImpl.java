package com.qyt.management.storage.warehouse.service;

import com.qyt.management.cache.service.StaffCacheService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.AuthorityService;
import com.qyt.management.storage.stock.domain.Stock;
import com.qyt.management.storage.warehouse.dao.WarehouseMapper;
import com.qyt.management.storage.warehouse.domain.Warehouse;
import com.qyt.management.uc.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;


/**
 * @author houxy
 * @date 2014-07-12
 */
@Transactional
@Service
public class WarehouseServiceImpl  extends AuthorityService<Warehouse> implements WarehouseService {

	@Autowired
	private WarehouseMapper warehouseMapper;

	@Autowired
    private StaffCacheService staffCacheService;
	
	public List<Warehouse> selectAllEntities() {
		return this.warehouseMapper.selectAllEntities();
	}
	
	
	public List<Warehouse> selectEntitiesBySellerID(Integer sellerID) {
		return this.warehouseMapper.selectEntitiesBySellerID(sellerID);
	}

	@Override
	public int isExist(Warehouse Warehouse) {
		return warehouseMapper.isExist(Warehouse);
	}


	@Override
	public void selectEntities(PagingBean<Warehouse> pb) {

		this.auth(pb,Warehouse.class);

		List<Warehouse> Warehouses = warehouseMapper.selectEntities(pb);
		int count = warehouseMapper.selectEntitiesCount(pb);
		pb.setResults(count);
		pb.setRows(Warehouses);

	}
	/**
	    * 查询单条记录
	    * @param id 查询表的主键，根据接口泛型参数PK确定类型
	    * @return
	    */

	@Override
	public Warehouse selectEntityById(Integer id) {
		Warehouse Warehouse = this.warehouseMapper.selectEntityById(id);
        return Warehouse;
	}

	@Override
	public void updateEntity(Warehouse dto) throws BusinessException {
		check(dto);
		dto.initChangeLog(false);
        this.warehouseMapper.updateEntity(dto);
	}

	@Override
	public void insertEntity(Warehouse dto) throws BusinessException {
		check(dto);
		dto.initChangeLog(true);
		this.warehouseMapper.insertEntity(dto);


	}

	private void check(Warehouse dto) throws BusinessException {
		if(dto.getType() == 1){
			PagingBean<Warehouse> pb = new PagingBean<>();
			Warehouse warehouse = new Warehouse();
			warehouse.setType(dto.getType());
			pb.setCondition(warehouse);
			List<Warehouse> warehouses = warehouseMapper.selectEntities(pb);
			if (warehouses != null && warehouses.size() > 0){
				for (Warehouse warehouse1 : warehouses) {
					if(!Objects.equals(warehouse1.getId(), dto.getId())){
						throw new BusinessException("只能存在一个总仓库");
					}
				}
			}
		}

		Warehouse warehouse = this.selectEntitiesByName(dto.getName());
		if(warehouse != null && !Objects.equals(warehouse.getId(), dto.getId()))throw new BusinessException("仓库已经存在");
	}

	@Override
	public void deleteEntity(Integer id) {
		this.warehouseMapper.deleteEntity(id);
	}


	public Warehouse selectEntitiesByName(String name) {
		return warehouseMapper.selectEntitiesByName(name);
	}

	
}