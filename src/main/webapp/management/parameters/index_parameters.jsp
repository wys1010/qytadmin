<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="../../platform/resource/resource.jsp"></jsp:include>
    <script type="text/javascript" src="${basePath}/management/parameters/assets/js/index_parameters.js?version=${version}"></script>
    <link rel="stylesheet" type="text/css" href="${basePath}/management/parameters/assets/css/index_parameters.css?version=${version}"/>

</head>
<body>
<div id="parametersIndexModule">
    <!-- ******index页面******** -->
    <div class="row" style='padding-top:15px;' id="queryParameters">
        <form class="form-horizontal" id="qForm">

            <%--第一行--%>
            <div class="row">
                <%--名称--%>
                <div class="control-group span6">
                    <label class="control-label">名称：</label>

                    <div class="controls">
                        <input type="text" name="name" id="q_name" class="control-text"/>
                    </div>
                </div>
                
                <div class="control-group span8">
                    <label class="control-label">状态：</label>

                    <div class="controls" style="width: 180px">
                        <div id="qStatusWrap" style="width: 180px">
                            <input type="hidden" id="q_status" value="1" name="q_status"/>
                        </div>
                    </div>
                </div>
                
			    <%--查询按钮--%>
                <div class="control-group">
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
        <label class="grid-title">系统参数列表</label>

         <div class="uc-grid-header-tool-wrap">
            <button class="button button-small " id="btnInsert">
                <span class="icon-plus"></span>新增
            </button>
        </div>
    </div>

    <div id="parametersGrid"></div>
</div>
<jsp:include page="edit_parameters.jsp"></jsp:include>
</body>
</html>