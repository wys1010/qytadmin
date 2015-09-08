

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="../../platform/resource/resource.jsp"></jsp:include>
    <script type="text/javascript" src="${basePath}/platform/logs/assets/js/index_logs.js?version=${version}"></script>
</head>
<body>
<div id="logsIndexModule">
    <!-- ******index页面******** -->
    <div class="row" style='padding-top:15px;' id="queryArea">
        <form class="form-horizontal" id="qForm">

            <%--第一行--%>
            <div class="row">



                 <%--状态--%>
                <div class="control-group span10">
                    <label class="control-label">日志级别：</label>

                    <div class="controls">
                        <div id="qStatusWrap" style="width: 220px">
                            <input type="hidden" id="q_status" value="-1" name="status"/>
                        </div>
                    </div>
                </div>
            
                <%--查询按钮--%>
                <div class="control-group span7">
                    <button id="btnSearch" type="submit" class="button button-small "><span class=" icon-search"></span>查询
                    </button>
                    <button id="btnReset" type="reset" class="button button-small "><span class=" icon-refresh"></span>重置
                    </button>
                </div>
            </div>
        </form>
    </div>

    <%--表头--%>
    <div class="grid-header" id="gridHeader">
        <label class="grid-title">日志列表</label>

    </div>

    <div id="logsGrid"></div>
</div>
<jsp:include page="edit_logs.jsp"></jsp:include>
</body>
</html>
