


package com.qyt.management.storage.product.service;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.platform.web.service.EnableService;
import com.qyt.management.storage.product.domain.PdmProduct;

/**
 * @author Wangyiqun
 * @date 2015-01-12
 */
public interface PdmProductsService extends BaseCurdService<PdmProduct, PdmProduct, Integer> , EnableService<Integer> {
    public PdmProduct selectEntityByName(String name) throws BusinessException;
}
