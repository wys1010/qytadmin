package com.qyt.management.platform.helper;/**
 * Created by sprite on 6/16/14.
 */


import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Map;

/**
 * @author wangyiqun
 * @date 6/16/14
 */
public class JsonHelper {

    public static String toString(Map<String , Object> obj) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return  objectMapper.writeValueAsString(obj);
    }

    public static String singleKey2String(String key , String value){
        StringBuffer sbf = new StringBuffer("{");
        sbf.append("\"");
        sbf.append(key).append("\":\"").append(value).append("\"}");
        return sbf.toString();
    }

}
