package com.qyt.management.sys.dicts.ctrl;

import com.qyt.management.sys.dicts.domain.DictItem;
import com.qyt.management.sys.dicts.service.DictItemService;
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

import javax.validation.Valid;

import java.io.IOException;
import java.util.List;

/**
 * @author Wangyiqun
 * @date 2013-12-03
 */
@Controller
@RequestMapping(value = "platform/dict_items")
public class DictItemController {

	@Autowired
	private DictItemService dictItemService;



    private String restBaseUrl = "platform/dict_items/";


    /**
     * 根据id获取字典项
     * @param id
     * @return
     */
    @RequestMapping(value="/dict/{id}" , method = RequestMethod.GET)
    @ResponseBody
    public List<DictItem> selectItemsByDictId(@PathVariable String id){
        List<DictItem> dictItems= this.dictItemService.selectItemsByDictId(id);
        return dictItems;
    }


    /**
     * 根据id获取字典项
     * @param id
     * @return
     */
    @RequestMapping(value="/{id}" , method = RequestMethod.GET)
    @ResponseBody
    public DictItem selectEntityById(@PathVariable Integer id){
        System.out.println(id);
        DictItem dto = this.dictItemService.selectEntityById(id);
        return dto;
    }

    /**
     * 分页查询
     * @param condition
     * @return
     */
    @RequestMapping(value="" , method = RequestMethod.GET)
    @ResponseBody
    public PagingBean selectEntities(PagingBean<DictItem> pb ,DictItem condition) {
        pb.setCondition(condition);
        this.dictItemService.selectEntities(pb);
        return pb;
    }


    /**
     * 查询所有字典项
     * @return
     */
    @RequestMapping(value="all" , method = RequestMethod.GET)
    @ResponseBody
    public List<DictItem> selectAllEntities() {
        return this.dictItemService.selectAllEntities();
    }
    /**
     * 更新
     */
    @RequestMapping(value="/update" , method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_DICTS_UPDATE"})
    public void update(@Valid DictItem dto  , BindingResult result) throws IOException, ValidatorException, BusinessException {
        ValidatorHelper.validate(result);
        this.dictItemService.updateEntity(dto);
//        DictHelper.refresh();
    }

    /**
     * 保存
     */
    @RequestMapping(value="/add" , method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_DICTS_UPDATE"})
    public void insert(@Valid DictItem dto  , BindingResult result) throws IOException, ValidatorException, BusinessException {
        ValidatorHelper.validate(result);
        this.dictItemService.insertEntity(dto);
//        DictHelper.refresh();
    }

    /**
     * 删除
     */
    @RequestMapping(value="/delete", method= RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_DICTS_UPDATE"})
    public void delete(Integer id) {
        this.dictItemService.deleteEntity(id);
//        DictHelper.refresh();
    }

}
