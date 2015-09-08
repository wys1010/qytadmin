<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="${basePath}/platform/resource/ksresource.jsp"></jsp:include>
    <%--<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-auto-complete-kw.js?version=${version}"></script>--%>
    <script type="text/javascript"
            src="${basePath}/demos/ks/autoComplete/assets/js/autoComplate.js?version=${version}"></script>
    <script type="text/javascript"
            src="${basePath}/platform/resource/ks/pickers/ks-company-kw-picker.js?version=${version}"></script>
</head>
<body>

<%--app--%>
<div ng-app="DemoApp">
    <div ng-controller="AutoCompleteController as ctrl" style="display: inline-block">


        <form>

            <%--<ks-company-kw-picker ng-model="ctrl.selectedValue" type="2"></ks-company-kw-picker>--%>

            <%--<ks-staff-kw-picker ng-model="ctrl.selectedValue" is-qry-all="false"></ks-staff-kw-picker>--%>

            <%--<ks-orderno-picker ng-model="ctrl.selectedValue"></ks-orderno-picker>--%>
            <%--<ks-purchase-order-picker ng-model="ctrl.selectedValue"></ks-purchase-order-picker>--%>

            <%--<ks-city-kw-picker ng-model="ctrl.selectedValue"></ks-city-kw-picker>--%>

            <%--<ks-product-kw-picker ng-model="ctrl.selectedValue" ></ks-product-kw-picker>--%>
            <%--<ks-category-kw-picker ng-model="ctrl.selectedValue" ></ks-category-kw-picker>--%>

            <%--<ks-designation-kw-picker ng-model="ctrl.selectedValue"--%>
                                      <%--display-field="designation|category"--%>
                                      <%--value-field="designation|category"--%>
                                      <%--placeholder="牌号|分类"--%>
                                      <%--business-code="designation-category"></ks-designation-kw-picker>--%>


            <%--<ks-designation-kw-picker ng-model="ctrl.selectedValue1"--%>
                                      <%--display-field="designation"--%>
                                      <%--value-field="designation"--%>
                                      <%--placeholder="牌号"--%>
                                      <%--business-code="designation"></ks-designation-kw-picker>--%>

                <ks-product-picker ng-model="ctrl.selectedValue"></ks-product-picker>

            {{ctrl.selectedValue}}

            {{ctrl.selectedValue1}}

            <input type="submit">
            <button ng-click="ctrl.reset()">重置</button>
        </form>

    </div>
</div>
</body>
</html>