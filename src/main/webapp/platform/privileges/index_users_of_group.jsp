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
      <script type="text/javascript" src="${basePath}/platform/privileges/assets/js/index_users_of_group.js?version=${version}"></script>
  </head>
  <body>
    <div id="usersOfGroupIndexModule" >
        <div class="grid-header" id="usersGridHeader">
            <label class="grid-title">用户列表</label>
            <div class="uc-grid-header-tool-wrap">
                <button class="button button-small " id="btnBatchDeleteUsers">
                    <span class="icon-minus"></span>批量移除
                </button>
                <button class="button button-small " id="userBtnAdd">
                    <span class="icon-plus"></span>新增
                </button>
            </div>
        </div>
        <div id="usersGrid" ></div>
    </div>
  </body>
</html>
