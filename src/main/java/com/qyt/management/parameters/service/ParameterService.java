package com.qyt.management.parameters.service;

import com.qyt.management.parameters.domain.Parameter;
import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.platform.web.service.EnableService;

/**
 * 
 * @author zheng.sk
 * @date 2014年9月26日
 * @version 1.0
 */
public interface ParameterService extends BaseCurdService<Parameter,Parameter, Integer>, EnableService<Integer> {

	Parameter selectEntityByName(String name);
}	