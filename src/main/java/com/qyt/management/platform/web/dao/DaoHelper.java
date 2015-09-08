package com.qyt.management.platform.web.dao;/**
 * Created by sprite on 4/23/14.
 */

import com.qyt.management.platform.web.PagingBean;

import java.util.HashMap;
import java.util.Map;

/**
 * @author wangyiqun
 * @date 4/23/14
 */
public class DaoHelper {

    /**
     * 根据分页中包含的分页信息和条件参数，构建分页sql需要的参数
     * @param pb
     * @param condition
     * @return
     */
    public static Map<String , Object> buildPagingParamMap(PagingBean pb , Object condition){
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("start", pb.getStart());
        param.put("limit", pb.getLimit());
        param.put("condition", condition);
        return param;
    }

}
