<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%--
  ~ Copyright (c) 2014. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  ~ Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
  ~ Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
  ~ Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
  ~ Vestibulum commodo. Ut rhoncus gravida arcu.
  --%>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
    request.setAttribute("basePath", basePath);
    request.setAttribute("DEFAULT_TITLE", "清颜堂仓库管理平台");
//
%>
<script>
    if(window.attachEvent){
        window.console={
            log:function(){

            }
        }
    }

    window.basePath = "${basePath}";
</script>
<link rel="icon" href="<%=request.getContextPath()%>/favicon.ico" mce_href="<%=request.getContextPath()%>/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/favicon.ico" mce_href="<%=request.getContextPath()%>/favicon.ico" type="image/x-icon">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript" src="<%=request.getContextPath() %>/platform/resource/jquery/jquery-1.8.1.min.js?version=${version}"></script>
<title>${DEFAULT_TITLE}</title>

