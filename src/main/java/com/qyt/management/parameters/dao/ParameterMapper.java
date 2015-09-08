package com.qyt.management.parameters.dao;

import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.platform.web.dao.EnableMapper;
import com.qyt.management.parameters.domain.Parameter;


public interface ParameterMapper extends BaseCurdMapper<Parameter, Parameter, Integer>,EnableMapper<Integer>{

	Parameter selectEntityByName(String name);

}