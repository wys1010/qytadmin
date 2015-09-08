package com.qyt.management.platform.handler;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author WangYiqun
 * @date 2014-03-12
 *
 */
public class LoginUrlEntryPoint implements AuthenticationEntryPoint {
	public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
      String targetUrl = null;
      String url = request.getRequestURI();

      if(url.indexOf("management") != -1){
          //未登录而访问后台受控资源时，跳转到后台登录页面
          targetUrl = "/passport/login.do";
      }else{
          //未登录而访问前台受控资源时，跳转到前台登录页面
          targetUrl = "/";
      }
 
      targetUrl = request.getContextPath() + targetUrl;
      response.sendRedirect(targetUrl);
  }
}
