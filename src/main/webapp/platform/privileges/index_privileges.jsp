<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="../../platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" href="${basePath}/platform/privileges/assets/css/index_privileges.css?version=${version}"/>
    <script type="text/javascript" src="${basePath}/platform/privileges/assets/js/index_privileges.js?version=${version}"></script>
</head>
<body>
    <div  ng-app="privilegesIndexModule">

    </div>
</body>
</html>
