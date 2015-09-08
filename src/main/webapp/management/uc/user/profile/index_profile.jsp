<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="/platform/resource/ksresource.jsp"></jsp:include>
    <script type="text/javascript" src="${basePath}/uc/user/profile/assets/js/index_profile.js?version=${version}"></script>
</head>
<body>
    <div id="profileIndexModule" ng-app="profileIndexApp">
        <div ui-view></div>
    </div>
</body>
</html>
