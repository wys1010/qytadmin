package com.qyt.management.platform.init;/**
 * Created by sprite on 10/28/14.
 */

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * @author wangyiqun
 * @date 10/28/14
 */
public class LogPropertiesHolder extends PropertyPlaceholderConfigurer {

    private static Map<String, String> logProperties;

    @Override
    protected void processProperties(
            ConfigurableListableBeanFactory beanFactoryToProcess,
            Properties props) throws BeansException {
        super.processProperties(beanFactoryToProcess, props);
        logProperties = new HashMap<String, String>();
        for (Object key : props.keySet()) {


            String keyStr = key.toString();
            String value = props.getProperty(keyStr);
            logProperties.put(keyStr, value);


//            String keyStr = key.toString();
//            String ctrlName = "";
//            String methodName = "";
//            int lastIndexOfDot = keyStr.lastIndexOf(".");
//            if(lastIndexOfDot > 0){
//                ctrlName = keyStr.substring(0, lastIndexOfDot);
//                methodName = keyStr.substring(lastIndexOfDot + 1, keyStr.length());
//                String value = props.getProperty(keyStr);
//
//                if(!logProperties.containsKey(ctrlName)){
//                    logProperties.put(ctrlName, new HashMap<String, String>());
//                }
//                Map<String, String> ctrlMap = logProperties.get(ctrlName);
//                ctrlMap.put(methodName,value);
//            }
        }
    }

    public static Map<String, String> getLogProperties() {
        return logProperties;
    }
}
