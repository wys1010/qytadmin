<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" src="${basePath}/platform/dicts/assets/js/edit_dict_items.js?version=${version}"></script>
</head>
<body>
<!-- ******产品属性类型管理页面的edit页面******** -->
<div id="editDictItemPage" class="hidden">
    <div id="dictItemEditModule" >
        <%--from--%>
        <div style="position: relative">
            <form id="formEditDictItem" class="form-horizontal " method="POST">

                <%-- 操作人时间等--%>
                <div class="uc-only-update" id="operatorBarDictItem">
                </div>

                    <input type="hidden"  id="id" />
                    <%--登录名--%>
                    <div class="span12">
                        <div class="control-group span12">
                            <label class="control-label">字典项名称<s>*</s></label>

                            <div class="controls">
                                <input type="text" name="name" id="name" class="control-text input-normal" />
                            </div>
                        </div>
                    </div>

                <%--字典名称--%>
                <div class="span12">
                    <div class="control-group span12">
                        <label class="control-label ">字典项值<s>*</s></label>

                        <div class="controls">
                            <input type="text" name="value" id="value" class="control-text input-normal" />
                        </div>
                    </div>
                </div>




                <%--姓名--%>
                <div class="span12">
                    <div class="control-group span12">
                        <label class="control-label ">备注</label>

                        <div class="controls">
                            <input type="text" name="remark" id="remark" class="control-text input-normal"/>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</div>
</body>
</html>
