package com.qyt.management.storage.stock.ctrl;


import com.qyt.management.parameters.domain.Parameter;
import com.qyt.management.parameters.service.ParameterService;
import com.qyt.management.platform.helper.ParameterHelper;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.stock.domain.Stock;
import com.qyt.management.storage.stock.service.StockService;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.service.UserService;
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

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;

/**
 * @author wangys
 * @description
 * @date 2015-01-12
 */
@Controller
@RequestMapping(value="pdm/stock")
public class StockController {

    private static final Logger logger = LoggerFactory.getLogger(StockController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private StockService stockService;

    @Autowired
    private ParameterService parameterService;


    /**
     * 用户管理页面url
     */
    private static final String WAREHOUSES_PAGE_INDEX = "management/storage/stock/index_stock";


    /**
     * 首页
     * @param request
     * @return
     * @throws Exception
     */
    @Secured({"ROLE_UC_STOCK_SELECT"})
    @RequestMapping(value = "index",method = RequestMethod.GET)
    public String index(HttpServletRequest request ) throws Exception {
        return WAREHOUSES_PAGE_INDEX;
    }

    /**
     * 分页查询
     * @param pb
     * @param stock
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "",method = RequestMethod.GET)
    @ResponseBody
    @Secured({"ROLE_UC_STOCK_SELECT"})
    public PagingBean<Stock> selectEntities(PagingBean<Stock> pb , Stock stock) throws Exception {
        ParameterHelper.trimToNullAndEncodeStringFields(stock, true);

        if (stock.getCreatedAtBegin() != 0){
            stock.setCreatedAtBeginDate(new Date(stock.getCreatedAtBegin()));
        }

        if(stock.getCreatedAtEnd() != 0){
            stock.setCreatedAtEndDate(new Date(stock.getCreatedAtEnd() + (24*3600*1000-1000)));
        }
        
        pb.setCondition(stock);
        stockService.selectEntities(pb);
        return pb;
    }
 

    
    /**
     * 通过id获取单条记录
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "{id}",method = RequestMethod.GET)
    @ResponseBody
    public Stock selectEntityById(@PathVariable Integer id) throws Exception {
        Stock stock = stockService.selectEntityById(id);
        return stock;
    }

    /**
     * 新增
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add",method = RequestMethod.POST)
    @ResponseBody
    public Stock insertEntity(@Valid Stock stock, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        //  获取当前登录用户设置为创建人
        User currUser = User.getCurrentUser();
        stock.setCreatedBy(currUser.getId());
        stock.setCreatedAt(new Date());
        logger.info("insert Stock");
        stockService.insertEntity(stock);
        return stock;
    }


    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update",method = RequestMethod.PUT)
    @ResponseBody
    public void updateEntity(@Valid Stock stock, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        stockService.updateEntity(stock);
    }

    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delete/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteEntity(@PathVariable Integer id) throws Exception {
        stockService.deleteEntity(id);
    }

    /**
     * 分页查询
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "selectAllEntities",method = RequestMethod.GET)
    @ResponseBody
    @Secured({"ROLE_UC_STOCK_SELECT"})
    public List<Stock> selectAllEntities() throws Exception {
        return stockService.selectAllEntities();
    }

}