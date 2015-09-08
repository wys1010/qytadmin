<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
    request.setAttribute("basePath", basePath);
    request.setAttribute("DEFAULT_TITLE", "清颜堂仓库管理系统");

    String version = com.qyt.management.platform.ResourceVersion.getVersion();
    request.setAttribute("version", version);
%>
<script>
    if(window.attachEvent){
        window.console={
            log:function(){

            }
        }
    }

    window.basePath = "${basePath}";
    window.version = "${version}";

</script>


<link rel="icon" href="<%=request.getContextPath()%>/favicon.ico" href="<%=request.getContextPath()%>/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/favicon.ico" href="<%=request.getContextPath()%>/favicon.ico" type="image/x-icon">

<%--bui--%>
<link href="${basePath}/platform/resource/bui/css/dpl.css?version=${version}" rel="stylesheet">
<link href="${basePath}/platform/resource/bui/css/bui.css?version=${version}" rel="stylesheet">
<%--字体图标--%>
<link href="${basePath}/platform/resource/fa430/css/font-awesome.min.css?version=${version}" rel="stylesheet">

<%--uc--%>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/uc/uc.css?version=${version}">
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/uc/uc-bui.css?version=${version}">
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/uc/uc-tabbar/css/uc-tabbar.css?version=${version}">

<%--jquery--%>
<script type="text/javascript" src="<%=request.getContextPath() %>/platform/resource/jquery/jquery-1.8.1.min.js?version=${version}"></script>


<script type="text/javascript" src="${basePath}/platform/resource/layer/layer.min.js?version=${version}"></script>

<%--uc组件库--%>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-core.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-tabbar/uc-tabbar.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-operationbar/uc-operationbar.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-radios/uc-statusradios.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-radios/uc-radios.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-module.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-helper.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-enum.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-dict.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-biz.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-autocomplete.js?version=${version}"></script>

<%--uc-bui扩展库--%>
<script type="text/javascript" src="${basePath}/platform/resource/uc/bui-helper/bui-helper.js?version=${version}"></script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

<%--bui脚本--%>
<script src="<%=request.getContextPath()%>/platform/resource/bui/js/bui-min.js?version=${version}"></script>
<script src="<%=request.getContextPath()%>/platform/resource/bui/extensions/search-min.js?version=${version}"></script>
<script src="<%=request.getContextPath()%>/platform/resource/bui/extensions/treegrid-min.js?version=${version}"></script>
<script src="<%=request.getContextPath()%>/platform/resource/bui/extensions/multiselect-min.js?version=${version}"></script>
<script src="<%=request.getContextPath()%>/platform/resource/bui/extensions/treepicker-min.js?version=${version}"></script>
<script src="<%=request.getContextPath()%>/platform/resource/bui/js/bui-min.js?version=${version}"></script>
<title>${DEFAULT_TITLE}</title>
