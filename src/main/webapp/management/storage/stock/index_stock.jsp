<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="${basePath}/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/management/storage/stock/assets/css/index_stock.css?version=${version}"/>

    <script type="text/javascript" src="${basePath}/management/storage/stock/assets/js/app.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/management/storage/stock/assets/js/index.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/management/storage/stock/assets/js/edit.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/management/storage/stock/assets/js/record.js?version=${version}"></script>

    <script>
        var stockMin = '${stockMin}';
        window.stokMin = stockMin;
        k.getApp("stockApp").init()
    </script>

</head>
<body>

<%--app--%>
<div id="warehouseIndexModule" ng-app="stockApp">
    <div ui-view></div>
</div>
</body>
</html>
