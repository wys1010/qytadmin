package com.qyt.management.platform.helper;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Wangyiqun
 * @date 13-9-29
 */
public class RequestHelper {

    /**
     *  //@todo 使用angularjs之后 判断ajax请求的方法不再正确，需要改进
     * 判断是否为Ajax请求
     * @param request   HttpServletRequest
     * @return  是true, 否false
     */
    public static boolean isAjaxRequest(HttpServletRequest request) {
        String requestType = request.getHeader("X-Requested-With");
        if (requestType != null && requestType.equals("XMLHttpRequest")) {
            return true;
        } else {
            return false;
        }
    }
}
