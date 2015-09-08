<%@ page contentType="text/html;charset=utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<html>
<head>
    <link rel="icon" href="<%=request.getContextPath()%>/favicon.ico" mce_href="<%=request.getContextPath()%>/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/favicon.ico" mce_href="<%=request.getContextPath()%>/favicon.ico" type="image/x-icon">
    <jsp:include page="resource.jsp"></jsp:include>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>清颜堂</title>
    <link href="${basePath}/platform/passport/assets/css/login.css?version=${version}" rel="stylesheet">
    <script>
        if(window != top){
            top.location =  '<%= request.getContextPath()%>/passport/login.do';
        }
    </script>
    <script type="text/javascript" src="${basePath}/platform/passport/assets/js/login.js?version=${version}"></script>
</head>
<body>
    <div class="fake-body">
        <div class="login-header">
            <%--<img src="${basePath}/platform/passport/assets/img/qyt-logo.png"  style="margin-top:10px "/>--%>
            <b class="welcome-bg">欢迎登录</b>
        </div>
        <div class="form-wrap">
            <div class="form-inner-wrap">
                <div class="login-bg">
                    <div class="big-logo"></div>
                    <h2 class="system-title" >清颜堂仓库管理系统</h2>
                </div>
                <form class="form" action="${basePath}/j_spring_security_check" method="post" style="padding-left:140px;">
                    <p id="errorMsg" style="display:none;">账号或密码错误</p>
                    <p id="exitMsg" style="display:none;color:#DD2233;font-weight: bold;">成功退出</p>
                    <div class="label">账号</div> <input type="text"  id="account" name="j_username" class="text "/>
                    <i class="passport"></i>
                    <div class="label">密码</div> <input type="password"  id="password" name="j_password" class="text"/>

                    <input type="submit" class="btn-login" value="登录" />
                    <i class="password"></i>
                </form>
            </div>
        </div>

        <link rel="stylesheet" type="text/css" href="${basePath}/platform/passport/assets/css/footer.css?version=${version}">
        <div class="footer s-border-top">
            <div class="footer-nav">
                <%--<a href="http://kuaisuwang.com.cn" target="_blank">金蛙网</a>--%>
            </div>
            <div class="cp">
                <%--上海金蛙电子商务有限公司  版权所有©--%>
                <%--<a href="http://www.miibeian.gov.cn" accesskey="">沪备ICP88888888号</a> All Rights Reserved--%>
            </div>
        </div>
    </div>
</body>
</html>
