<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <jsp:include page="../../platform/resource/resource.jsp"></jsp:include>

      <%--<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ztree/zTreeStyle.css?version=${version}">--%>
      <%--<script type="text/javascript" src="${basePath}/platform/resource/ztree/jquery.ztree.all-3.5.min.js?version=${version}"></script>--%>

      <%--<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ns/ns-tabbar/css/uc-tabbar.css?version=${version}">--%>
      <%--<script type="text/javascript" src="${basePath}/platform/resource/ns/uc-core.js?version=${version}"></script>--%>
      <%--<script type="text/javascript" src="${basePath}/platform/resource/ns/ns-tabbar/uc-tabbar.js?version=${version}"></script>--%>

      <link rel="stylesheet" type="text/css" href="${basePath}/platform/index/assets/css/index.css?version=${version}">
      <script type="text/javascript" src="${basePath}/platform/index/assets/js/index.js?version=${version}"></script>
      <script type="text/javascript" src="${basePath}/platform/index/assets/js/dicts_loading.js?version=${version}"></script>
    <title>清颜堂仓库管理系统</title>
  </head>
  <body>
  <div id="">
  <jsp:include page="header.jsp"></jsp:include>
  </div>

  <div class="block-wrap clearfix">
      <jsp:include page="menu.jsp"></jsp:include>
      <div class="workspace-wrap">
          <div class="workspace">
              <jsp:include page="sys_nav.jsp"></jsp:include>
              <div id="tabContainer"></div>
          </div>
      </div>
  </div>

  </body>
</html>
