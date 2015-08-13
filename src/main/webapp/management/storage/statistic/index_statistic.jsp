<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css"
          href="${basePath}/management/storage/statistic/assets/css/index_statistic.css?version=${version}"/>

    <script type="text/javascript"
            src="${basePath}/management/storage/statistic/assets/js/app.js?version=${version}"></script>
    <script type="text/javascript"
            src="${basePath}/management/storage/statistic/assets/js/index.js?version=${version}"></script>

    <script>
        k.getApp("statisticApp").init()
    </script>
</head>
<body>

<%--app--%>
<div id="statisticIndexModule" ng-app="statisticApp">
    <div ui-view></div>
</div>
</body>
</html>
