<%@ page import="com.qyt.management.uc.user.domain.User" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/index/assets/css/header.css?version=${version}">

<div class="header clearfix">
    <a class="logo" href="javascript:void(0)"></a>
    <h1 class="logo-title" >清颜堂-仓库管理系统</h1>

    <div class="global-toolbar">
        <span style="color:#4d4d4d">欢迎您：</span>
        <span class="fa fa-user" style="font-size: 14px;"></span>
        <a class="login-name" href="javascript:jumpToProfile()" title="个人资料修改" style="color:#0273D4">【<%=User.getCurrentUser() == null ? "" : User.getCurrentUser().getName() %>】</a> &nbsp;&nbsp;|
        <a href="${basePath}/j_spring_security_logout">退出</a>
    </div>
</div>