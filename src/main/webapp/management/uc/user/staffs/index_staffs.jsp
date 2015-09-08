<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/management/uc/user/staffs/assets/css/index_staff.css?version=${version}"/>
    <script type="text/javascript" src="${basePath}/management/uc/user/staffs/assets/js/staff.js?version=${version}"></script>
</head>
<body>

<div id="staffIndexModule" ng-app="staffIndexApp">
    <div ui-view></div>
</div>

</body>
</html>
