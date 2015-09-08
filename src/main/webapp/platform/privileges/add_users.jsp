<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" src="${basePath}/platform/privileges/assets/js/add_users.js?version=${version}"></script>
</head>
<body>
<div id="addUsersPage" class="hidden">
    <div id="usersIndexModule">
        <!-- ******index页面******** -->
        <div class="row" style='padding-top:15px;' id="queryArea">
            <form class="form-horizontal" id="qForm">

                <%--第一行--%>
                <div class="row">

                    <%--名称--%>
                    <div class="control-group span7">
                        <label class="control-label">名称：</label>

                        <div class="controls">
                            <input type="text"  name="name" id="q_name" class="control-text"/>
                        </div>
                    </div>

                    <%--查询按钮--%>
                    <div class="control-group span3" style="padding-left: 0px">
                        <button id="btnSearch" type="button" class="button button-small "><span
                                class=" icon-search"></span>查询
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <%--表头--%>
        <div class="grid-header" id="gridHeader">
            <label class="grid-title">用户列表 <span style="color:#f60">查询结果仅包含不在选中用户组内的用户</span></label>

            <div class="uc-grid-header-tool-wrap">
            </div>
        </div>

        <div id="addUsersGrid"></div>
    </div>
</div>
</body>
</html>
