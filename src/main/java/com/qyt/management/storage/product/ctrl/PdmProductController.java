package com.qyt.management.storage.product.ctrl;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.helper.ParameterHelper;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.util.StringUtils;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.product.domain.PdmProduct;
import com.qyt.management.storage.product.service.PdmProductsService;
import com.qyt.management.uc.user.domain.User;
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

/**
 * @author Wangyiqun
 * @date 2015-01-08
 */
@Controller
@RequestMapping(value="pdm/products")
public class PdmProductController {

    private static final Logger logger = LoggerFactory.getLogger(PdmProductController.class);


    @Autowired
    private PdmProductsService pdmProductsService;



    /**
     * 用户管理页面url
     */
    private static final String PRODUCTS_PAGE_INDEX = "management/storage/product/index_products";


    /**
     * 首页
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "index",method = RequestMethod.GET)
    @Secured({"ROLE_UC_PRODUCT_SELECT"})
    public String index(HttpServletRequest request ) throws Exception {
        return PRODUCTS_PAGE_INDEX;
    }


    /**
     * 分页查询
     * @param pb
     * @param pdmProduct
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "",method = RequestMethod.GET)
    @ResponseBody
    @Secured({"ROLE_UC_PRODUCT_SELECT"})
    public PagingBean<PdmProduct> selectEntities(PagingBean<PdmProduct> pb , PdmProduct pdmProduct ) throws Exception {

        ParameterHelper.trimToNullAndEncodeStringFields(pdmProduct,true);

        pb.setCondition(pdmProduct);
        pdmProductsService.selectEntities(pb);
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
    public PdmProduct selectEntityById(@PathVariable Integer id) throws Exception {
        PdmProduct pdmProduct = pdmProductsService.selectEntityById(id);
        return pdmProduct;
    }




    /**
     * 新增
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add",method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_PRODUCT_EDIT"})
    public PdmProduct insertEntity(@Valid PdmProduct pdmProduct, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);

        this.exist(pdmProduct.getName());

        //  获取当前登录用户设置为创建人
        User currUser = User.getCurrentUser();
        pdmProduct.setCreatedBy(currUser.getId());
        pdmProductsService.insertEntity(pdmProduct);
        return pdmProduct;
    }


    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update",method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_PRODUCT_EDIT"})
    public void updateEntity(@Valid PdmProduct pdmProduct, BindingResult result) throws Exception {

        ValidatorHelper.validate(result);
        pdmProductsService.updateEntity(pdmProduct);
    }

    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delete/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_PRODUCT_DELETE"})
    public void deleteEntity(@PathVariable Integer id) throws Exception {
        pdmProductsService.deleteEntity(id);
    }

    /**
     * 是否存在
     * @return
     * @throws BusinessException
     */
    public void exist(String name) throws BusinessException {

        if(StringUtils.isNotEmptyByTrim(name)){
            PagingBean<PdmProduct> pb = new PagingBean<>();
            PdmProduct product = new PdmProduct();
            product.setName(name.trim());
            pb.setCondition(product);
            pdmProductsService.selectEntities(pb);
            if(pb.getResults() > 0){
                throw new BusinessException("该产品已经存在");
            }
        }

    }





}
