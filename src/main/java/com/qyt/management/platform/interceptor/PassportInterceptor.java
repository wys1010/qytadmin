package com.qyt.management.platform.interceptor;

import com.qyt.management.platform.helper.RequestHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.qyt.management.uc.user.domain.User;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Wangyiqun
 * @date
 */
public class PassportInterceptor extends HandlerInterceptorAdapter implements ServletContextAware {
    private ServletContext context;

    private static final Logger logger = LoggerFactory.getLogger(PassportInterceptor.class);
    
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
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        if(User.getCurrentUser()==null || User.getCurrentUser().getId() == null){
    		if(isNeedLogin(request)){
                if(RequestHelper.isAjaxRequest(request)){
                    response.setStatus(401);
                }else{
                    response.sendRedirect(request.getContextPath() + "/passport/login.do");
                }
    			return false;
    		}
    	}
        
        return super.preHandle(request, response, handler);
    }


    /**
     * 检查访问的路由是否需要登录
     * @param request
     * @return
     */
    public boolean isNeedLogin(HttpServletRequest request){
        String contextPath = request.getContextPath();
        String uri = request.getRequestURI();
        String suffix = uri.substring(contextPath.length() , uri.length());
        if(suffix.equals("/passport/login.do")){
            return false;
        }else if(suffix.startsWith("/public")){
            return false;
        }
        return true;
    }
    @Override
    public void setServletContext(ServletContext context) {
        this.context = context;
    }
}
