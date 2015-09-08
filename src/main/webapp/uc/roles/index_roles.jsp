<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/uc/roles/assets/css/index_roles.css?version=${version}"/>

    <%--domains--%>
    <script type="text/javascript" src="${basePath}/uc/domains/uc-domains.js?version=${version}"></script>

    <%--总控制器--%>
    <script type="text/javascript" src="${basePath}/uc/roles/assets/js/index_roles.js?version=${version}"></script>

    <%-- 功能权限--%>
    <script type="text/javascript" src="${basePath}/uc/roles/assets/js/permission/permission_manager.js?version=${version}"></script>

    <%--角色--%>
    <script type="text/javascript" src="${basePath}/uc/roles/assets/js/role/role_select.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/uc/roles/assets/js/role/role_edit.js?version=${version}"></script>

    <%--员工--%>
    <script type="text/javascript" src="${basePath}/uc/roles/assets/js/staff/staff_select.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/uc/roles/assets/js/staff/staff_add.js?version=${version}"></script>
</head>
<body>

<div ng-app="RoleIndexApp">
    <div ui-view></div>
</div>
</body>
</html>
