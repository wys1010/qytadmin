package com.qyt.management.storage.order.ctrl;


import com.qyt.management.platform.helper.ParameterHelper;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.order.domain.Order;
import com.qyt.management.storage.order.service.OrderService;
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

/**
 * @author wangys
 * @description
 * @date 2015-01-12
 */
@Controller
@RequestMapping(value="pdm/orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;


    private static final String PAGE_INDEX = "management/storage/order/index_order";


    /**
     * 首页
     * @param request
     * @return
     * @throws Exception
     */
    @Secured({"ROLE_UC_ORDER_SELECT"})
    @RequestMapping(value = "index",method = RequestMethod.GET)
    public String index(HttpServletRequest request ) throws Exception {
        return PAGE_INDEX;
    }

    /**
     * 分页查询
     * @param pb
     * @param order
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "",method = RequestMethod.GET)
    @ResponseBody
    @Secured({"ROLE_UC_ORDER_SELECT"})
    public PagingBean<Order> selectEntities(PagingBean<Order> pb , Order order) throws Exception {
        ParameterHelper.trimToNullAndEncodeStringFields(order, true);


        if (order.getCreatedAtBegin() != 0){
            order.setCreatedAtBeginDate(new Date(order.getCreatedAtBegin()));
        }

        if(order.getCreatedAtEnd() != 0){
            order.setCreatedAtEndDate(new Date(order.getCreatedAtEnd() + (24*3600*1000-1000)));
        }
        
        pb.setCondition(order);
        orderService.selectEntities(pb);
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
    public Order selectEntityById(@PathVariable Integer id) throws Exception {
        return orderService.selectEntityById(id);
    }

    /**
     * 新增
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add",method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_STOCK_ORDER"})
    public Order insertEntity(@Valid Order order, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        //  获取当前登录用户设置为创建人
        logger.info("insert Order");
        orderService.insertEntity(order);
        return order;
    }


    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update",method = RequestMethod.PUT)
    @ResponseBody
    public void updateEntity(@Valid Order order, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        orderService.updateEntity(order);
    }

    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delete/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteEntity(@PathVariable Integer id) throws Exception {
        orderService.deleteEntity(id);
    }

    /**
     * 发货
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delivery",method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_ORDER_DELIVERY"})
    public void delivery(Order order) throws Exception {
        orderService.delivery(order);
    }

    /**
     * 确认收货
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "confirmReceipt/{id}",method = RequestMethod.GET)
    @ResponseBody
    @Secured({"ROLE_UC_ORDER_CONFIRM_RECEIPT"})
    public void confirmReceipt(@PathVariable Integer id) throws Exception {
        orderService.confirmReceipt(id);
    }

    /**
     * 取消订单
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "cancel/{id}",method = RequestMethod.GET)
    @ResponseBody
    @Secured({"ROLE_UC_ORDER_CANCEL"})
    public void cancelOrder(@PathVariable Integer id) throws Exception {
        orderService.cancelOrder(id);
    }

}