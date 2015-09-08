<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="${basePath}/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/management/storage/warehouses/assets/css/index_warehouses.css?version=${version}"/>

    <script type="text/javascript" src="${basePath}/management/storage/warehouses/assets/js/app.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/management/storage/warehouses/assets/js/index.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/management/storage/warehouses/assets/js/edit.js?version=${version}"></script>

    <script>
        k.getApp("warehouseApp").init()
    </script>

</head>
<body>

<%--app--%>
<div id="warehouseIndexModule" ng-app="warehouseApp">
    <div ui-view></div>
</div>
</body>
</html>
