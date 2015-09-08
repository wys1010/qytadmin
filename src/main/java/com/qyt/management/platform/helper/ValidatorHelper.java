package com.qyt.management.platform.helper;/**
 * Created by sprite on 4/30/14.
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qyt.management.platform.exception.ValidatorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author wangyiqun
 * @date 4/30/14
 */
public class ValidatorHelper {

    private static final Logger logger = LoggerFactory.getLogger(ValidatorHelper.class);


    /**
     * nspaces校验帮助方法，在ctrl中调用，配合hibernate的valid注解，ctrl中需要
     * @param result
     * @throws IOException
     * @throws com.qyt.management.platform.exception.BusinessException
     */
    public static void validate(BindingResult result) throws IOException, ValidatorException {
        if(result.hasErrors()){
            List<FieldError> errors = result.getFieldErrors();
            ObjectMapper objectMapper = new ObjectMapper();

            Map<String , String> validatorMsg = new HashMap<String, String>();
            for (FieldError error : errors) {
                String field = error.getField();

                // 同一字段可能多个约束校验失败，检测是否存在，用逗号连接
                if(validatorMsg.containsKey(field)){
                    validatorMsg.put(field , validatorMsg.get(field) + " , " + error.getDefaultMessage());
                }else{
                    validatorMsg.put(error.getField(), error.getDefaultMessage());
                }
            }

            String msg = objectMapper.writeValueAsString(validatorMsg);
            if(logger.isDebugEnabled()){
                logger.debug("校验失败:" , msg);
            }

            throw new ValidatorException(msg);
        }
    }


    /**
     * nspaces校验帮助方法，在ctrl中调用，配合hibernate的valid注解，ctrl中需要
     * @param result
     * @param ignoreFields  忽略字段列表，逗号分隔
     * @throws IOException
     * @throws com.qyt.management.platform.exception.BusinessException
     */
    public static void validate(BindingResult result , String ignoreFields) throws IOException, ValidatorException {
        if(result.hasErrors()){

            // 忽略列表
            String[] ignoreFieldArr = ignoreFields.split(",");
            Map<String , String> ignoreFieldMap = new HashMap<String, String>();
            for(String field : ignoreFieldArr){
                ignoreFieldMap.put(field,field);
            }
            List<FieldError> errors = result.getFieldErrors();
            ObjectMapper objectMapper = new ObjectMapper();

            Map<String , String> validatorMsg = new HashMap<String, String>();
            for (FieldError error : errors) {
                String field = error.getField();
                if(ignoreFieldMap.containsKey(field)){
                    continue;
                }
                // 同一字段可能多个约束校验失败，检测是否存在，用逗号连接
                if(validatorMsg.containsKey(field)){
                    validatorMsg.put(field , validatorMsg.get(field) + " , " + error.getDefaultMessage());
                }else{
                    validatorMsg.put(error.getField(), error.getDefaultMessage());
                }
            }

            String msg = objectMapper.writeValueAsString(validatorMsg);
            if(logger.isDebugEnabled()){
                logger.debug("校验失败:" , msg);
            }

            /**
             * 为空则表示校验出错的全是例外
             */
            if(!validatorMsg.isEmpty()){
                throw new ValidatorException(msg);
            }


        }
    }

}
