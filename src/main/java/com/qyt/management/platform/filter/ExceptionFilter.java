package com.qyt.management.platform.filter;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.exception.NotLoginException;
import com.qyt.management.platform.exception.ValidatorException;
import com.qyt.management.platform.init.LogPropertiesHolder;
import org.apache.log4j.MDC;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;

import com.qyt.management.uc.user.domain.User;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.OutputStream;

/**
 * @author WangYiqun
 * @date 2014-03-12
 */
public class ExceptionFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionFilter.class);
    /**
     * Default constructor.
     */
    public ExceptionFilter() {
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
	}


    /**
     * 输出日志
     * @param isLog
     * @param e
     */
    public static void logError(boolean isLog , Exception e){
        if(isLog) {
            MDC.put("log_level", "ERROR");
            StackTraceElement target = e.getCause().getStackTrace()[0];
            MDC.put("className", target.getClassName());
            MDC.put("method", target.getMethodName());
            MDC.put("result", "ERROR");
            MDC.put("line", MDC.get("className") + "." + MDC.get("method") + "(" + target.getFileName() + ":" + target.getLineNumber() + ")");
            StringBuffer sbf = new StringBuffer();
            StackTraceElement[] stackTraceElements = e.getCause().getStackTrace();
            sbf.append(e.getCause().getClass().getName()).append("\n\r");
            for (int i = 0; i < stackTraceElements.length; i++) {
                StackTraceElement stackTraceElement = stackTraceElements[i];
                sbf.append(stackTraceElement.getClassName());
                sbf.append(".").append(stackTraceElement.getMethodName());
                sbf.append("(").append(stackTraceElement.getFileName()).append(":").append(stackTraceElement.getLineNumber()).append(")\n\r");
            }
            logger.error(sbf.toString());
        }
    }

	/**
     * 日志记录：仅IOException，ServletException，BusinessException，500错误才记录到数据库中
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,ServletException{


        boolean isSuccess = true;
        boolean isLog = false;
        Exception exception = null;
        String msg = "";

        String serverPath = ((HttpServletRequest)request).getServletPath();
        int lastIndexOfDot = serverPath.lastIndexOf(".");
        if(lastIndexOfDot >= 0){
            serverPath =  serverPath.substring(0 , lastIndexOfDot);
        }
        if(LogPropertiesHolder.getLogProperties().containsKey(serverPath)){
            isLog = true;
        }
        String action = LogPropertiesHolder.getLogProperties().get(serverPath);
        action = action == null ? "":action;

        if(isLog) {
            MDC.put("path", serverPath);

            if (User.getCurrentUser() != null) {
                MDC.put("curr_user_id", User.getCurrentUser().getId());
                MDC.put("curr_user_passport", User.getCurrentUser().getLoginName());
            }

            MDC.put("request_type", ((HttpServletRequest) request).getMethod());
            MDC.put("action", action);
            MDC.put("ip", request.getRemoteAddr());
        }

		HttpServletResponse resp = (HttpServletResponse)response;
		try {
			chain.doFilter(request, response);
            if(isLog) {
                MDC.put("log_level", "INFO");
                MDC.put("result", "SUCCESS");
                logger.error(action);
            }
		}catch (Exception e) {
            isSuccess = false;
            exception = e;
			e.printStackTrace();

			Throwable throwable = e.getCause();
			if(throwable instanceof IOException){
                logError(isLog, e);
				throw (IOException)e;
			}
			else if(throwable instanceof ServletException){
                logError(isLog, e);
				throw (ServletException)e;
			}
			else{
				OutputStream out = resp.getOutputStream();
				String outString = "";
                // ValidatorException 继承自 BusinessException,要先判断
                if(throwable instanceof ValidatorException){
                    resp.setStatus(632);
                    ValidatorException be = (ValidatorException)throwable;
                    outString = be.getMsg();
                }
				else if(throwable instanceof BusinessException){
                    logError(isLog, e);
					resp.setStatus(631);
					BusinessException be = (BusinessException)throwable;
					outString = be.getMessage();
				}
				else if(throwable instanceof NotLoginException){

					resp.setStatus(401);
					NotLoginException be = (NotLoginException)throwable;
					outString = be.getMessage()==null?"":be.getMessage();
				}
				else if(throwable instanceof AccessDeniedException){
					resp.setStatus(403);
				}
				else{
                        logError(isLog, e);
                        resp.setStatus(500);
                        StringBuffer sbf = new StringBuffer();
                        sbf.append("{\"success\" : false , \"error\" : \"");
                        sbf.append("抱歉，服务器出错");
                        sbf.append("\"}");
                        outString = sbf.toString();
				}
                //@todo 使用angularjs之后 判断ajax请求的方法不再正确，需要改进
                out.write(outString.getBytes("UTF-8"));
//                if(RequestHelper.isAjaxRequest(((HttpServletRequest)request))){
//                    out.write(outString.getBytes("UTF-8"));
//                }

			}
		}



    }

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
