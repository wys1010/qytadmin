<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="${basePath}/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/uc/orgs/assets/css/orgs.css?version=${version}"/>

    <script type="text/javascript" src="${basePath}/uc/domains/uc-domains.js?version=${version}"></script>

    <script type="text/javascript" src="${basePath}/uc/orgs/assets/js/app.js?version=${version}"></script>

</head>
<body ks-view-port ng-app="OrganizationIndexApp">
    <div ui-view style="height:100%"></div>
</body>
</html>
