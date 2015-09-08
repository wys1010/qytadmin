package com.qyt.management.platform.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qyt.management.platform.helper.RequestHelper;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.service.UserService;

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
@Transactional
@Service
public class DeftAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException,
			ServletException {
        userService.updateUserLoginTime(User.getCurrentLoginUser().getUserId());
        if(RequestHelper.isAjaxRequest(request)){

            String jsonObject = "{\"message\":\"\","+
                    "\"success\":true}";
            String contentType = "application/json";
            response.setContentType(contentType);
            PrintWriter out = response.getWriter();
            out.print(jsonObject);
            out.flush();
            out.close();
            return;
        }
		response.sendRedirect(request.getContextPath()+"/index.do");
	}

}