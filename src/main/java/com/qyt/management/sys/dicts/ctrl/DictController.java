package com.qyt.management.sys.dicts.ctrl;

import com.qyt.management.sys.dicts.service.DictItemService;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.access.annotation.Secured;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.exception.ValidatorException;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.sys.dicts.domain.Dict;
import com.qyt.management.sys.dicts.service.DictService;

import javax.validation.Valid;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

/**
 * @author Wangyiqun
 * @date 2013-12-03
 */
@Controller
@RequestMapping(value="platform/dicts")
public class DictController {

	@Autowired
	private DictService dictService;



    @Autowired
    private DictItemService dictItemService;

	
	private String restBaseUrl = "platform/dicts/";
	
	/**
	 * 索引界面
	 */
	@RequestMapping(value="/index",method = RequestMethod.GET)
    @Secured({"ROLE_UC_DICTS_SELECT","ROLE_UC_DICTS_UPDATE"})
	public String index(){
		return restBaseUrl+"index_dicts";
	}

    /**
     * 根据id获取字典
     * @param id
     * @return
     */
    @RequestMapping(value="/{id}" , method = RequestMethod.GET)
    @ResponseBody
    public Dict selectEntityById(@PathVariable String id){
        System.out.println(id);
        Dict dict = this.dictService.selectEntityById(id);
        return dict;
    }


    /**
     * 分页查询
     * @param condition
     * @return
     */
    @RequestMapping(value="" , method = RequestMethod.GET)
    @ResponseBody
    public PagingBean selectEntities(PagingBean<Dict> pb ,Dict condition) throws UnsupportedEncodingException{
        String name = StringUtils.trimToNull(condition.getName());
        if(null != name){
            condition.setName(URLDecoder.decode(name, "utf-8"));
        }
        pb.setCondition(condition);
        this.dictService.selectEntities(pb);
        return pb;
    }


    /**
     * 查询所有字典及字典项，供前端字典组件使用
     * @return
     */
    @RequestMapping(value="all" , method = RequestMethod.GET)
    @ResponseBody
    public List<Dict> selectAllEntities() throws UnsupportedEncodingException{
        return this.dictService.selectAllEntities();
    }

    /**
     * 更新
     */
    @RequestMapping(value="/update" , method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_DICTS_UPDATE"})
    public void update(@Valid Dict dict, BindingResult result) throws IOException, ValidatorException, BusinessException {
        ValidatorHelper.validate(result);
        this.dictService.updateEntity(dict);
//        DictHelper.refresh();
    }

    /**
     * 保存
     */
    @RequestMapping(value="/add" , method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_DICTS_UPDATE"})
    public void insert(@Valid Dict dto , BindingResult result) throws IOException, ValidatorException, BusinessException {
        ValidatorHelper.validate(result);
        this.dictService.insertEntity(dto);
    }




    /**
     * 删除
     */
    @RequestMapping(value="/delete", method= RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_DICTS_UPDATE"})
    public void delete(String id){
        this.dictService.deleteEntity(id);
//        DictHelper.refresh();
    }


}
