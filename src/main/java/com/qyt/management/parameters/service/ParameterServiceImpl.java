package com.qyt.management.parameters.service;

import com.qyt.management.parameters.dao.ParameterMapper;
import com.qyt.management.parameters.domain.Parameter;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.PagingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 
 * @author zheng.sk
 * @date 2014年9月29日
 * @version 1.0
 */
@Transactional
@Service	
public class ParameterServiceImpl implements ParameterService {

    @Autowired
    private ParameterMapper parameterMapper;



	@Override
	public void selectEntities(PagingBean<Parameter> pb) {
        List<Parameter> parameter = parameterMapper.selectEntities(pb);
        int count = parameterMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(parameter);
	}


	@Override
	public Parameter selectEntityById(Integer id) {
		return this.parameterMapper.selectEntityById(id);
	}

	
	@Override
	public void deleteEntity(Integer id) {
		this.parameterMapper.deleteEntity(id);
		
	}


	@Override
	public void insertEntity(Parameter dto) throws BusinessException {
		Parameter parameter =  parameterMapper.selectEntityByName(dto.getName());
		if(null!=parameter){
			throw new BusinessException("该名字已经存在");
		}
		this.parameterMapper.insertEntity(dto);
	}

	@Override
	public void updateEntity(Parameter dto) throws BusinessException {
		this.parameterMapper.updateEntity(dto);
	}
	
    @Override
    public void enableEntity(Integer id) {
        this.parameterMapper.enableEntity(id);
    }
    @Override
    public void disableEntity(Integer id) {
        try {
            this.parameterMapper.disableEntity(id);
        } catch (BusinessException e) {
            e.printStackTrace();
        }
    }


	@Override
	public Parameter selectEntityByName(String name) {
		return parameterMapper.selectEntityByName(name);
	}    
	
}