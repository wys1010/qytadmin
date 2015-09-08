package com.qyt.management.sys.dicts.dao;

import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.sys.dicts.domain.DictItem;

import java.util.List;

public interface DictItemMapper extends BaseCurdMapper<DictItem, DictItem , Integer> {

    public List<DictItem> selectItemsByDictId(String dictId);

    public List<DictItem> selectAllEntities();
}
