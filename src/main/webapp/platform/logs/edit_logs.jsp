

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" src="${basePath}/platform/logs/assets/js/edit_logs.js?version=${version}"></script>
</head>
<body>
<!-- ******产品属性类型管理页面的edit页面******** -->
<div id="editPage" class="hidden">
    <div id="logsEditModule">
        <%--from--%>
        <div style="position: relative">
            <form id="formEdit" class="form-horizontal " method="POST">

                <%-- 操作人时间等--%>
                <div class="uc-only-update" id="operatorBar">
                </div>

                <input type="hidden" name="id" id="id" class="control-text"/>

                    <%--名称--%>
                    <%--岗位id--%>
                    <div class="control-group span7">
                        <label class="control-label">日志级别：</label>

                        <div class="controls">
                            <div id="q_logLevelWrap" style="width: 150px">
                                <input type="hidden" id="q_logLevel" value="-1" />
                            </div>
                        </div>
                    </div>


            </form>
        </div>
    </div>
</div>
</body>
</html>
