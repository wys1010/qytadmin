package com.qyt.management.parameters.ctrl;

import com.qyt.management.parameters.domain.Parameter;
import com.qyt.management.parameters.service.ParameterService;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
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
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * 
 * @author zheng.sk
 * @date 2014年9月29日
 * @version 1.0
 */
@Controller
@RequestMapping(value = "management/parameters")
public class ParametersController {

    private static final Logger logger = LoggerFactory.getLogger(ParametersController.class);


    @Autowired
    private ParameterService parameterService;
    
    @Autowired
    private UserService userService;


    /**
     * 系统参数管理页面url
     */
    private static final String SUPPLIERS_PAGE_INDEX = "management/parameters/index_parameters";

    /**
     * 首页
     *
     * @param request	
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "index", method = RequestMethod.GET)
    @Secured({"ROLE_UC_PARAMETERS_SELECT","ROLE_UC_PARAMETERS_UPDATE"})
    public String index(HttpServletRequest request) throws Exception {
        return SUPPLIERS_PAGE_INDEX;
    }


    /**
     * 分页查询  
     *
     * @param pb
     * @param customerPrivilege
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public PagingBean selectEntities(PagingBean pb, Parameter parameter) throws Exception {
    	logger.info("-------------query parameter begin----------");
    	beforeQuery(parameter);
        pb.setCondition(parameter);
        parameterService.selectEntities(pb);
        logger.info("-------------query parameter end---------");
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
    public Parameter selectEntityById(@PathVariable Integer id) throws Exception {
    	Parameter parameter = parameterService.selectEntityById(id);
    	parameter.setOperatorName(userService.selectUserNameById(parameter.getOperatorId()));
        return parameter;
    }
    
    
    /**
     * 新增
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add",method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_PARAMETERS_UPDATE"})
    public Parameter insertEntity(@Valid Parameter parameter, BindingResult result) throws Exception {
    	beforeSave(parameter);
    	ValidatorHelper.validate(result);
        //  获取当前登录用户设置为创建人
        User currUser = User.getCurrentUser();
        parameter.setOperatorId(currUser.getId());
        parameterService.insertEntity(parameter);
        return parameter;
    }
    
    
    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update",method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_PARAMETERS_UPDATE"})
    public void updateEntity(@Valid Parameter parameter, BindingResult result) throws Exception {

        ValidatorHelper.validate(result);
        //  获取当前登录用户设置为创建人
        User currUser = User.getCurrentUser();
        parameter.setOperatorId(currUser.getId());
        parameterService.updateEntity(parameter);
    }
    
    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delete",method = RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_PARAMETERS_UPDATE"})
    public void deleteEntity(Integer id) throws Exception {

    	parameterService.deleteEntity(id);
    }

    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "selectByName",method = RequestMethod.GET)
    @ResponseBody
    public Parameter selectEntityByName(String name) throws Exception {
    	return parameterService.selectEntityByName(name);
    }

    /**
     *      启用
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "enable", method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_PARAMETERS_UPDATE"})
    public void enableEntity(Integer id) throws Exception {

    	parameterService.enableEntity(id);
    }
    /**
     *      禁用
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "disable", method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_PARAMETERS_UPDATE"})
    public void disableEntity(Integer id) throws Exception {

    	parameterService.disableEntity(id);
    }    
    
    /**
     * 查询前数据处理
     *
     * @param parameter
     * @throws UnsupportedEncodingException
     */
    private void beforeQuery(Parameter parameter) throws UnsupportedEncodingException {
        if (null != parameter.getName()) {
        	parameter.setName(URLDecoder.decode(parameter.getName(), "utf8"));
        }
        if (-1 == parameter.getStatus()) {
        	parameter.setStatus(null);
        }
    }
    
    
    /**
     * 保存前数据处理
     *
     * @param parameter
     * @throws UnsupportedEncodingException
     */
    private void beforeSave(Parameter parameter) throws UnsupportedEncodingException {
    }

}