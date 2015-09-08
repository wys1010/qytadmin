package com.qyt.management.sys.dicts.service;


import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.sys.dicts.domain.Dict;

import java.util.List;

/**
 * @author Wangyiqun
 * @date 2013-12-03
 */
public interface DictService extends BaseCurdService<Dict, Dict, String> {

    public List<Dict> selectAllEntities();
}
