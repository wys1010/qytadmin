<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
      <link type="text/javascript" src="${basePath}/platform/privileges/assets/css/index_groups.css?version=${version}" />
      <script type="text/javascript" src="${basePath}/platform/privileges/assets/js/index_groups.js?version=${version}"></script>
  </head>
  <body>
    <div id="groupsIndexModule" >
        <div class="grid-header" id="groupsGridHeader">
            <label class="grid-title">角色列表</label>
            <div class="uc-grid-header-tool-wrap">
                <button class="button button-small " id="groupBtnAdd">
                    <span class="icon-plus"></span>新增
                </button>
            </div>
        </div>
        <div id="groupsGrid"></div>
    </div>
    <jsp:include page="edit_groups.jsp"></jsp:include>
  </body>
</html>
