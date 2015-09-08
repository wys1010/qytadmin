package com.qyt.management.storage.stock.ctrl;


import com.qyt.management.parameters.service.ParameterService;
import com.qyt.management.platform.helper.ParameterHelper;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.product.dao.PdmProductsMapper;
import com.qyt.management.storage.product.domain.PdmProduct;
import com.qyt.management.storage.stock.domain.Stock;
import com.qyt.management.storage.stock.domain.StockLine;
import com.qyt.management.storage.stock.service.StockLineService;
import com.qyt.management.storage.stock.service.StockService;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author wangys
 * @description
 * @date 2015-01-12
 */
@Controller
@RequestMapping(value="pdm/stock_line")
public class StockLineController {

    private static final Logger logger = LoggerFactory.getLogger(StockLineController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private StockLineService stockLineService;

    @Autowired
    private StockService stockService;

    @Autowired
    private ParameterService parameterService;


    private static final String WAREHOUSES_PAGE_INDEX = "management/storage/stockline/index_stockline";


    /**
     * 首页
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "index",method = RequestMethod.GET)
    public String index(HttpServletRequest request,int type) throws Exception {
        // 1:入库   2:出库
        request.setAttribute("type",type);
        return WAREHOUSES_PAGE_INDEX;
    }

    /**
     * 分页查询
     * @param pb
     * @param stockLine
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "",method = RequestMethod.GET)
    @ResponseBody
    public PagingBean<StockLine> selectEntities(PagingBean<StockLine> pb , StockLine stockLine) throws Exception {
        ParameterHelper.trimToNullAndEncodeStringFields(stockLine, true);

        if (stockLine.getCreatedAtBegin() != 0){
            stockLine.setCreatedAtBeginDate(new Date(stockLine.getCreatedAtBegin()));
        }

        if(stockLine.getCreatedAtEnd() != 0){
            stockLine.setCreatedAtEndDate(new Date(stockLine.getCreatedAtEnd() + (24*3600*1000-1000)));
        }
        
        pb.setCondition(stockLine);
        stockLineService.selectEntities(pb);
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
    public StockLine selectEntityById(@PathVariable Integer id) throws Exception {
        StockLine stockLine = stockLineService.selectEntityById(id);
        return stockLine;
    }

    /**
     * 通过id获取单条记录
     * @param stockId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "getStockLineByStockId/{stockId}",method = RequestMethod.GET)
    @ResponseBody
    public List<StockLine> getStockLineByStockId(@PathVariable Integer stockId) throws Exception {
        return stockLineService.getStockLineByStockId(stockId);
    }

    /**
     * 新增
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add",method = RequestMethod.POST)
    @ResponseBody
    public StockLine insertEntity(@Valid StockLine stockLine, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        //  获取当前登录用户设置为创建人
        User currUser = User.getCurrentUser();
        stockLine.setCreatedBy(currUser.getId());
        stockLine.setCreatedAt(new Date());
        logger.info("insert stockLine");
        stockLineService.insertEntity(stockLine);
        return stockLine;
    }


    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update",method = RequestMethod.PUT)
    @ResponseBody
    public void updateEntity(@Valid StockLine stockLine, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        stockLineService.updateEntity(stockLine);
    }

    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delete/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteEntity(@PathVariable Integer id) throws Exception {
        stockLineService.deleteEntity(id);
    }


}