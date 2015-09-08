/**
 * 
 */
package com.qyt.management.platform.interceptor;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.qyt.management.uc.user.domain.User;

/**
 * 日志记录
 * 
 * @author caiwb
 */
public class LoggerInterceptorAdapter extends HandlerInterceptorAdapter {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoggerInterceptorAdapter.class);
	private static final String s = "-----------------------------------------------------------------------";
	private static final String CLIENT_INFO = "_ClientInfo";
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		final Date requestTime = new Date();
		final String url = request.getRequestURL().toString();
		final String sessionId = request.getSession().getId();
		final String ip = getClientIPAddress(request);
		final String userName = User.getCurrentUser() != null ? User.getCurrentUser().getLoginName() : "-";

		final ClientInfo clientInfo = new ClientInfo();
		clientInfo.setIp(ip);
		clientInfo.setRequestTime(requestTime);
		clientInfo.setUrl(url);
		request.setAttribute(CLIENT_INFO, clientInfo);
		
		try {
			return super.preHandle(request, response, handler);
		} finally {
			StringBuffer requestLog = new StringBuffer("\n[" + sessionId +"]请求包：")
				.append("\n").append(s)
				.append("\n 请求地址：").append(ip)
				.append("\n 会话编号：").append(request.getSession() != null ? request.getSession().getId() : "")
				.append("\n 服务接口：").append(url)
				.append("\n 请求时间：").append(toFormatTime(requestTime))
				.append("\n 会员名称：").append(userName)
				.append("\n 浏览器名：").append(request.getHeader("User-Agent"))
				.append("\n").append(s)
				;
			LOGGER.info(requestLog.toString());
		}
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		try {
			super.afterCompletion(request, response, handler, ex);
		} finally {
			if(ex != null)
				LOGGER.error(ex.getMessage(), ex);
			
			final String userName = User.getCurrentUser() != null ? User.getCurrentUser().getLoginName() : "-";
			final ClientInfo clientInfo = (ClientInfo) request.getAttribute(CLIENT_INFO);
			
			String sessinoId = request.getSession() != null ? request.getSession().getId() : "-";
			StringBuffer responseLog = new StringBuffer("\n[" + sessinoId +"]返回包：")
				.append("\n").append(s)
				.append("\n 请求地址：").append(clientInfo != null ? clientInfo.getIp() : "-")
				.append("\n 会话编号：").append(sessinoId)
				.append("\n 服务接口：").append(clientInfo != null ? clientInfo.getUrl() : "-")
				.append("\n 会员名称：").append(userName)
				.append("\n 是否异常：").append(ex == null ? "-" : "Yes")
				.append("\n 服务耗时：").append(spendTime(clientInfo !=null ? clientInfo.getRequestTime() : null) + "毫秒")
				.append("\n 返回时间：").append(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss S").format(new Date()))
				.append("\n").append(s)
				;
			LOGGER.info(responseLog.toString());
		}
	}
	
	protected long spendTime(final Date requestTime) {
		if(requestTime == null)
			return -1;
		
		return System.currentTimeMillis() - requestTime.getTime();
	}

	protected String toFormatTime(final Date requestTime) {
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss S").format(requestTime);
	}
	
	protected static String getClientIPAddress(HttpServletRequest request) {
		String ip = request.getHeader("X-Real-IP"); 
		if(StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("x-forwarded-for"); 
		} 
	    if(StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) { 
	        ip = request.getHeader("Proxy-Client-IP"); 
	    } 
	    if(StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) { 
	        ip = request.getHeader("WL-Proxy-Client-IP"); 
	    } 
	    if(StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) { 
	        ip = request.getRemoteAddr(); 
	    } 
	    return ip;  
	}
	
	static class ClientInfo {
		Date requestTime = new Date();
		String ip = "";
		String url = "";

		public Date getRequestTime() {
			return requestTime;
		}

		public void setRequestTime(Date requestTime) {
			this.requestTime = requestTime;
		}

		public String getIp() {
			return ip;
		}

		public void setIp(String ip) {
			this.ip = ip;
		}

		public String getUrl() {
			return url;
		}

		public void setUrl(String url) {
			this.url = url;
		}
	}
}
