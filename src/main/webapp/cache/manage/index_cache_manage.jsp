<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="/platform/resource/ksresource.jsp"></jsp:include>
    <script type="text/javascript" src="${basePath}/cache/manage/assets/js/cachemanage.js?version=${version}"></script>
</head>
<body>
<div id="cacheManageIndexModule" ng-app="cacheManageIndexApp">
    <div ui-view></div>
</div>
</body>
</html>
