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
      <script type="text/javascript" src="${basePath}/platform/privileges/assets/js/index_roles.js?version=${version}"></script>
  </head>
  <body style="overflow-y:auto">
    <div id="rolesIndexModule" class="hidden">
        <div class="grid-header" >
            <div class="uc-grid-header-tool-wrap">
                <button class="button button-small " id="btnRolesSave">
                    保存
                </button>
            </div>
        </div>
        <div id="rolesWrap">
            <div id="rolesTree"></div>
        </div>
    </div>
  </body>
</html>
