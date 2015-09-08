package com.qyt.management.platform.interceptor;

import com.qyt.management.platform.annotation.ParameterHandler;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.net.URLDecoder;
import java.util.Map;

/**
 * @author Wangyiqun
 * @date 2015-01-14
 */
public class ParameterHandlerInterceptor  extends HandlerInterceptorAdapter implements ServletContextAware {
    private ServletContext context;

    private static final Logger logger = LoggerFactory.getLogger(ParameterHandlerInterceptor.class);

    /**
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception{

    }

    /**
     * 预处理，设置utf8编码
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if(handler instanceof HandlerMethod){
            HandlerMethod method = (HandlerMethod)handler;
            ParameterHandler parameterHandler = AnnotationUtils.findAnnotation(method.getMethod(), ParameterHandler.class);
            if(null == parameterHandler){
                return super.preHandle(request, response, handler);
            }
            String trimToNullFields = parameterHandler.trimToNullFields();
            String decodeFields = parameterHandler.decodeFields();
            String[] trimFieldsArr = trimToNullFields.equals("") ? null : trimToNullFields.split(",");
            String[] decodeFieldsArr =decodeFields.equals("") ? null : decodeFields.split(",");
            Map<String,String[]> map = request.getParameterMap();

            if(null != trimFieldsArr){
                for (int i = 0; i < trimFieldsArr.length; i++) {
                    String s = trimFieldsArr[i];
                    String[] values = map.get(s);
                    if(null != values && values.length == 1){
                        values[0] = StringUtils.trimToNull(values[0]);
                    }
                }
            }

            if(null != decodeFieldsArr){
                for (int i = 0; i < decodeFieldsArr.length; i++) {
                    String s = decodeFieldsArr[i];
                    String[] values = map.get(s);
                    if(null != values && values.length == 1){
                        if(null != values[0]){
                            values[0] = URLDecoder.decode(values[0],"utf8");
                        }

                    }
                }
            }


        }
        return super.preHandle(request, response, handler);
    }


    @Override
    public void setServletContext(ServletContext context) {
        this.context = context;
    }
}
