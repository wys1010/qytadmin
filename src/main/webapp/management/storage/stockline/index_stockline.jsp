<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="${basePath}/platform/resource/ksresource.jsp"></jsp:include>

    <link rel="stylesheet" type="text/css" href="${basePath}/management/storage/stockline/assets/css/index_stockline.css?version=${version}"/>

    <script type="text/javascript" src="${basePath}/management/storage/stockline/assets/js/app.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/management/storage/stockline/assets/js/index.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/management/storage/stockline/assets/js/edit.js?version=${version}"></script>

    <script>
        var type = '<%=request.getAttribute("type")%>'
        window.$type = type || 1
        k.getApp("stocklineApp").init()
    </script>

</head>
<body>


<%--app--%>
<div id="stocklineIndexModule" ng-app="stocklineApp">
    <div ui-view></div>
</div>
</body>
</html>
