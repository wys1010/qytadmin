<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/demos/ks/role/assets/css/index_roles.css?version=${version}"/>
    <script type="text/javascript" src="${basePath}/demos/ks/progress_bar/assets/js/app.js?version=${version}"></script>
</head>
<body ng-app="MyApp" ks-view-port>
    <div ui-view=""></div>
</body>
</html>
