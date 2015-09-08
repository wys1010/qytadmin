<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" src="${basePath}/platform/privileges/assets/js/edit_groups.js?version=${version}"></script>
</head>
<body>
<!-- ******产品属性类型管理页面的edit页面******** -->
<div id="groupsEditPage" class="hidden">
    <div id="groupsEditModule">
        <%--from--%>
        <div style="position: relative">
            <form id="formGroupEdit" class="form-horizontal " method="POST">

                <%-- 操作人时间等--%>
                <div class="uc-only-update" id="operatorBarGroup">
                </div>

                <input type="hidden" name="groupId" id="groupId" class="control-text"/>


                <%--登录名--%>
                <div class="span16">
                    <div class="control-group span16">
                        <label class="control-label">名称<s>*</s>：</label>

                        <div class="controls">
                            <input type="text" name="groupName" id="groupName" class="control-text input-normal"
                                   data-rules="{required : true}"/>
                        </div>
                    </div>
                </div>


                    <div class="span16">
                        <div class="control-group span16">
                            <label class="control-label">备注</label>

                            <div class="controls">
                                <input type="text" name="groupRemark" id="groupRemark" class="control-text input-normal"  />
                            </div>
                        </div>
                    </div>

            </form>
        </div>
    </div>
</div>
</body>
</html>
