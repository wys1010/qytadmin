<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="../../platform/resource/resource.jsp"></jsp:include>
    <script type="text/javascript" src="${basePath}/platform/dicts/assets/js/index_dicts.js?version=${version}"></script>
    <script type="text/javascript" src="${basePath}/platform/dicts/assets/js/index_dict_items.js?version=${version}"></script>
</head>
<body>
<div id="dictIndexModule">
    <!-- ******产品属性类型管理页面的index页面******** -->
    <div class="row" style='padding-top:15px;' id="queryArea">
        <form class="form-horizontal" id="qForm">

            <%--第一行--%>
            <div class="row">

                <div class="control-group span7">
                    <label class="control-label">名称：</label>

                    <div class="controls">
                        <div>
                            <input type="text" name="name" id="q_name" class="control-text"/>
                        </div>
                    </div>
                </div>

                <div class="control-group span7">
                    <label class="control-label">编码：</label>

                    <div class="controls">
                        <div>
                            <input type="text" name="id" id="q_id" class="control-text"/>
                        </div>
                    </div>
                </div>
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

    <table  width="100%" style="table-layout: fixed;border: 1">
        <tr>
            <td width="50%"  valign="top">
                <div class="grid-header" id="gridHeader">
                    <label class="grid-title">字典列表</label>
                    <div class="uc-grid-header-tool-wrap">
                        <button class="button button-small  button-success" id="btnInsert">
                            <span class="icon-plus"></span>新增
                        </button>
                    </div>
                </div>
                <div id="mainGrid"></div>

                </td>
            <td width="50%" valign="top">

                <div class="grid-header"  >
                    <label class="grid-title">字典项列表</label>

                    <div class="uc-grid-header-tool-wrap">
                        <button class="button button-small button-success " id="btnInsertSub" >
                            <span class="icon-plus"></span>新增
                        </button>
                    </div>
                </div>
                <div id="subGrid"></div>
            </td>
        </tr>
    </table>


</div>

<jsp:include page="edit_dicts.jsp"></jsp:include>
<jsp:include page="edit_dict_items.jsp"></jsp:include>
</body>
</html>
