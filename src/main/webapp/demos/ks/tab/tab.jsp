<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="${basePath}/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/demos/ks/tab/assets/css/tab.css?version=${version}"/>
    <script type="text/javascript" src="${basePath}/demos/ks/tab/assets/js/tab.js?version=${version}"></script>
</head>
<body>

<%--app--%>
<div ng-app="DemoApp">
    <div ng-controller="CommonController as ctrl">
        <ks-tabs>
            <ks-tab-pane title="Hello"  >
                <h4>Hello</h4>
                <p>Lorem ipsum dolor sit amet</p>
            </ks-tab-pane>
            <ks-tab-pane title="World" selected="true">
                <h4>World</h4>
                <em>Mauris elementum elementum enim at suscipit.</em>
                <p><a href ng-click="i = i + 1">counter: {{i || 0}}</a></p>
            </ks-tab-pane>
        </ks-tabs>
    </div>
</div>
</body>
</html>
