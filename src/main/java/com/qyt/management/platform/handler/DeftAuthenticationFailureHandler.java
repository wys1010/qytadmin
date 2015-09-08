package com.qyt.management.platform.handler;

import com.qyt.management.platform.helper.RequestHelper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;


/**
 * @author WangYiqun
 * @date 2014-03-12
 *
 */
public class DeftAuthenticationFailureHandler implements
        AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException exception)
			throws IOException, ServletException {

        if(RequestHelper.isAjaxRequest(request)){
            String jsonObject = "{\"message\":\"用户名或密码错误.\","+
                          "\"success\":false}";
            String contentType = "application/json";
            response.setContentType(contentType);
            PrintWriter out = response.getWriter();
            out.print(jsonObject);
            out.flush();
            out.close();
            return;
        }
		
		if(exception instanceof BadCredentialsException){
			String message = exception.getMessage();
			//用户名未填写
			if("USERNAME_IS_REQUIRED".equals(message)){
				request.getRequestDispatcher(request.getContextPath()+"/passport/login.do?errorCode=1").forward(request,response);
			}
			//用户不存在
			else if("USER_IS_NOT_EXIST".equals(message)){
                request.getRequestDispatcher(request.getContextPath()+"/passport/login.do?errorCode=2").forward(request,response);
			}
		}
		//用户被禁用或未启用
		else if(exception instanceof DisabledException){
            request.getRequestDispatcher(request.getContextPath()+"/passport/login.do?errorCode=3").forward(request,response);
		}
		//其他异常导致了登录验证不成功
		else{
            request.getRequestDispatcher(request.getContextPath()+"/passport/login.do?errorCode=4").forward(request,response);
		}
	}

}
