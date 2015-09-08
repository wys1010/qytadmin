<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" src="${basePath}/management/parameters/assets/js/edit_parameters.js?version=${version}"></script>
</head>
<body>
<!-- ******产品属性类型管理页面的edit页面******** -->
<div id="editPage" class="hidden">
    <div id="parametersEditModule">
        <%--from--%>
        <div style="position: relative">
            <form id="formEdit" class="form-horizontal " method="POST">

                <%-- 操作人时间等--%>
                <div class="uc-only-update" id="operatorBar">
                </div>

                <input type="hidden" name="id" id="id" class="control-text"/>



                <%--最大交易--%>
                <div class="span16 ">
                    <div class="control-group span8">
                        <label class="control-label">名称<s>*</s></label>

                        <div class="controls">
                            <input type="text" name="name" id="name" class="control-text input-normal"
                                   data-rules="{required : true}" />
                        </div>
                    </div>
                    <div class="control-group span8">
                        <label class="control-label ">值<s>*</s></label>

                        <div class="controls">
                            <input type="text" name="value" id="value" class="control-text input-normal"
                                   data-rules="{required : true}"/>
                        </div>
                    </div>
                </div>


                <%--备注--%>
                <div class="span16 ">
                    <div class="control-group span8">
                        <label class="control-label ">备注</label>

                        <div class="controls">
                            <input type="text" name="remark" id="remark"
                                   class="control-text input-normal"/>
                        </div>
                    </div>
                    
                    
                    <div class="control-group span8">
                        <label class="control-label ">状态</label>

                        <div class="controls">
                            <div id="statusWrap"></div>
                        </div>
                    </div>                    
                </div>

            </form>
        </div>
    </div>
</div>
</body>
</html>