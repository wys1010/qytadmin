package com.qyt.management.sys.dicts.dao;


import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.sys.dicts.domain.Dict;

import java.util.List;

public interface DictMapper extends BaseCurdMapper<Dict , Dict , String> {


    public List<Dict> selectAllEntities();
}
