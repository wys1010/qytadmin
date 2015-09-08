package com.qyt.management.storage.warehouse.ctrl;


import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qyt.management.parameters.service.ParameterService;
import com.qyt.management.platform.helper.ParameterHelper;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.warehouse.domain.Warehouse;
import com.qyt.management.storage.warehouse.service.WarehouseService;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.service.UserService;

/**
 * @author wangys
 * @description
 * @date 2015-01-12
 */
@Controller
@RequestMapping(value="pdm/warehouses")
public class WarehousesController {

    private static final Logger logger = LoggerFactory.getLogger(WarehousesController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private WarehouseService WarehouseService;

    @Autowired
    private ParameterService parameterService;


    /**
     * 用户管理页面url
     */
    private static final String WAREHOUSES_PAGE_INDEX = "management/storage/warehouses/index_warehouses";


    /**
     * 首页
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "index",method = RequestMethod.GET)
    @Secured({"ROLE_UC_WAREHOUSES_SELECT"})
    public String index(HttpServletRequest request ) throws Exception {
        return WAREHOUSES_PAGE_INDEX;
    }

    /**
     * 分页查询
     * @param pb
     * @param warehouse
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "",method = RequestMethod.GET)
    @ResponseBody
    public PagingBean<Warehouse> selectEntities(PagingBean<Warehouse> pb , Warehouse warehouse) throws Exception {
        ParameterHelper.trimToNullAndEncodeStringFields(warehouse, true);

        pb.setCondition(warehouse);
        WarehouseService.selectEntities(pb);
        return pb;
    }
 
    /**
     * 查询所有仓库
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "all",method = RequestMethod.GET)
    @ResponseBody
    public List<Warehouse> selectAllEntities() throws Exception {
        return  WarehouseService.selectAllEntities();
    }
    
    
    /**
     * 查询对应供应商的仓库
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "warehouseBySeller",method = RequestMethod.GET)
    @ResponseBody
    public List<Warehouse> selectEntitiesBySellerID(Integer sellerId) throws Exception {
    	return  WarehouseService.selectEntitiesBySellerID(sellerId);
    } 
    /**
     * 通过id获取单条记录
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "{id}",method = RequestMethod.GET)
    @ResponseBody
    public Warehouse selectEntityById(@PathVariable Integer id) throws Exception {
        Warehouse Warehouse = WarehouseService.selectEntityById(id);
        return Warehouse;
    }

    /**
     * 新增
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add",method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_WAREHOUSES_EDIT"})
    public Warehouse insertEntity(@Valid Warehouse warehouse, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        //  获取当前登录用户设置为创建人
        User currUser = User.getCurrentUser();
        warehouse.setCreatedBy(currUser.getId());
        warehouse.setCreatedAt(new Date());
        logger.info("insert warehouse");
        WarehouseService.insertEntity(warehouse);
        return warehouse;
    }


    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update",method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_WAREHOUSES_EDIT"})
    public void updateEntity(@Valid Warehouse warehouse, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        WarehouseService.updateEntity(warehouse);
    }

    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delete/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_WAREHOUSES_DELETE"})
    public void deleteEntity(@PathVariable Integer id) throws Exception {
        WarehouseService.deleteEntity(id);
    }



    @ResponseBody
    @RequestMapping(value = "isExist",method = RequestMethod.POST)
    public boolean isExist(Warehouse Warehouse) {
        int exist = WarehouseService.isExist(Warehouse);
        return exist > 0 ? true : false;
    }




    
}