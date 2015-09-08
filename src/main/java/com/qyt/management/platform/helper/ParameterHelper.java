package com.qyt.management.platform.helper;

import com.qyt.management.platform.exception.FormatException;

import com.qyt.management.platform.helper.*;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.net.URLDecoder;

/**
 * 参数帮助类
 *  @author  Wangyiqun
 *  @date 2015-01-22
 */
public class ParameterHelper {


    /**
     * 检测对象中的字符串字段，执行trimToNull 与 URLDecoder.decode 操作
     * @param obj
     * @throws NoSuchMethodException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws FormatException
     * @throws UnsupportedEncodingException
     */
    public static void trimToNullAndEncodeStringFields(Object obj) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, FormatException, UnsupportedEncodingException {
        trimToNullAndEncodeStringFields(obj, false);
    }


    /**
     *  处理参数中的null和空格，trimToEmpty
     * @param obj
     * @throws NoSuchMethodException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws FormatException
     * @throws UnsupportedEncodingException
     */
    public static void trimToEmpty4StringFields(Object obj) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, FormatException, UnsupportedEncodingException{
        String[] fields = com.qyt.management.platform.helper.PropertyHelper.getPropertys(obj);
        for(String field : fields){
            Object value = com.qyt.management.platform.helper.PropertyHelper.getSimpleProperty(obj, field);
            if(com.qyt.management.platform.helper.PropertyHelper.getPropertyClass(obj, field).getSimpleName().equals("String")){
                String strVal = (String)value;
                strVal = StringUtils.trimToEmpty(strVal);
                PropertyUtils.setProperty(obj,field,strVal);
            }
        }
    }


    /**
     * 可以根据编码方式执行不同的编码方法
     * @param obj
     * @param fromISO2utf8
     * @throws NoSuchMethodException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws FormatException
     * @throws UnsupportedEncodingException
     */
    public static void trimToNullAndEncodeStringFields(Object obj,boolean fromISO2utf8) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, FormatException, UnsupportedEncodingException{
        String[] fields = com.qyt.management.platform.helper.PropertyHelper.getPropertys(obj);
        for(String field : fields){
            Object value = com.qyt.management.platform.helper.PropertyHelper.getSimpleProperty(obj, field);
            if(value instanceof String){
                String strVal = (String)value;
                strVal = StringUtils.trimToNull(strVal);
                if(null != strVal){
                    if (fromISO2utf8){
                        strVal = new String(strVal.getBytes("ISO-8859-1"),"UTF-8");
                    }else{
                        strVal = URLDecoder.decode(strVal,"utf8");
                    }
                }
                PropertyUtils.setProperty(obj,field,strVal);
            }
        }
    }

}
